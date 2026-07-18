using System.Text.Json.Serialization;
using ControleGastos.API.Data;
using ControleGastos.API.DTOs.Common;
using ControleGastos.API.Exceptions;
using ControleGastos.API.Interfaces;
using ControleGastos.API.Repositories;
using ControleGastos.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "AllowFrontend";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "Controle de Gastos API",
        Description = "API para controle de gastos residenciais",
    });
    options.UseInlineDefinitionsForEnums();
});

var allowedOrigins =
    builder.Configuration
        .GetSection("AllowedOrigins")
        .Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .SelectMany(x => x.Value!.Errors.Select(e =>
                    string.IsNullOrWhiteSpace(e.ErrorMessage)
                        ? $"Campo inválido: {x.Key}"
                        : e.ErrorMessage))
                .ToList();

            var response = new ErrorResponseDto
            {
                Status = StatusCodes.Status400BadRequest,
                Code = "VALIDATION_ERROR",
                Message = "Erro de validação.",
                Errors = errors
            };

            return new BadRequestObjectResult(response);
        };
    });

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ISummaryService, SummaryService>();

var app = builder.Build();

// Aplicando migrações pendentes no banco de dados automaticamente ao iniciar a aplicação
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider
        .GetRequiredService<ILogger<Program>>();
    try
    {
        logger.LogInformation("Applying pending migrations...");
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.Migrate();
        logger.LogInformation("Database is up to date.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error applying migrations.");
        throw;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    timestamp = DateTime.UtcNow
}));

app.UseCors(CorsPolicyName);

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
