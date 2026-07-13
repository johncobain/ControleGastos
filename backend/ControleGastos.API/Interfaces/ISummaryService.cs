using ControleGastos.API.DTOs.Summary;

namespace ControleGastos.API.Interfaces;

public interface ISummaryService
{
  Task<SummaryResponseDto> GetSummaryAsync();
}