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
      context.Response.StatusCode = StatusCodes.Status404NotFound;
      await context.Response.WriteAsJsonAsync(new
      {
        message = ex.Message
      });
    }
    catch (BusinessRuleException ex)
    {
      context.Response.StatusCode = StatusCodes.Status400BadRequest;
      await context.Response.WriteAsJsonAsync(new
      {
        message = ex.Message
      });
    }
    catch (Exception)
    {
      context.Response.StatusCode = StatusCodes.Status500InternalServerError;
      await context.Response.WriteAsJsonAsync(new
      {
        message = "Ocorreu um erro interno no servidor."
      });
    }
  }
}