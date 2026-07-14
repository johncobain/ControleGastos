using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Transaction;

namespace ControleGastos.API.DTOs.Summary;

public class SummaryResponseDto
{
  public IEnumerable<PersonSummaryDto> People { get; set; } = new List<PersonSummaryDto>();
 
  public decimal TotalIncome { get; set; }

  public decimal TotalExpense { get; set; }

  public decimal Balance { get; set; }
}