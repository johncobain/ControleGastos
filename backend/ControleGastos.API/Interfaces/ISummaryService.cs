using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Summary;

namespace ControleGastos.API.Interfaces;

public interface ISummaryService
{
  Task<SummaryResponseDto> GetSummaryAsync();
  Task<PersonSummaryDto> GetPersonSummaryAsync(Guid personId);
}