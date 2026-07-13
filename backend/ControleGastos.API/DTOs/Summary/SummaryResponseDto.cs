using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Transaction;

namespace ControleGastos.API.DTOs.Summary;

public class SummaryResponseDto
{
  public IEnumerable<PersonSummaryDto> People { get; set; } = new List<PersonSummaryDto>();
  public IEnumerable<TransactionSummaryDto> Total { get; set; } = new List<TransactionSummaryDto>();
}