using ControleGastos.API.DTOs.Common;

namespace ControleGastos.API.Exceptions;

public class ExceptionHandlerMiddleware
{
  private readonly RequestDelegate _next;

  public ExceptionHandlerMiddleware(RequestDelegate next)
  {
    _next = next;
  }

  public async Task InvokeAsync(HttpContext context)
  {
    try
    {
      await _next(context);
    }
    catch (NotFoundException ex)
    {
      await WriteErrorResponseAsync(
        context,
        StatusCodes.Status404NotFound,
        "NOT_FOUND",
        ex.Message
      );
    }
    catch (BusinessRuleException ex)
    {
      await WriteErrorResponseAsync(
        context,
        StatusCodes.Status400BadRequest,
        "BUSINESS_RULE_VIOLATION",
        ex.Message
      );
    }
    catch (Exception)
    {
      await WriteErrorResponseAsync(
        context,
        StatusCodes.Status500InternalServerError,
        "INTERNAL_SERVER_ERROR",
        "Ocorreu um erro interno no servidor."
      );
    }
  }

  private static async Task WriteErrorResponseAsync(
    HttpContext context,
    int statusCode,
    string code,
    string message,
    IEnumerable<string>? errors = null
  )
  {
    context.Response.StatusCode = statusCode;
    context.Response.ContentType = "application/json";

    var response = new ErrorResponseDto
    {
      Status = statusCode,
      Code = code,
      Message = message,
      Errors = errors
    };

    await context.Response.WriteAsJsonAsync(response);
  }
}