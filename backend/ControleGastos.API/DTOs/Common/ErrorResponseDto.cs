namespace ControleGastos.API.DTOs.Common;

public class ErrorResponseDto
{
  public int Status { get; set; }
  public string Code { get; set; } = string.Empty;
  public string Message { get; set; } = string.Empty;
  public IEnumerable<string>? Errors { get; set; }
}