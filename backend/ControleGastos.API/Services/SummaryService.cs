using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Summary;
using ControleGastos.API.DTOs.Transaction;
using ControleGastos.API.Exceptions;
using ControleGastos.API.Interfaces;
using ControleGastos.API.Models;

namespace ControleGastos.API.Services;

public class SummaryService : ISummaryService
{
  private readonly IPersonRepository _personRepository;
  private readonly ITransactionRepository _transactionRepository;

  public SummaryService(IPersonRepository personRepository, ITransactionRepository transactionRepository)
  {
    _personRepository = personRepository;
    _transactionRepository = transactionRepository;
  }

  public async Task<SummaryResponseDto> GetSummaryAsync()
  {
    var people = await _personRepository.GetAllAsync();

    var summaries = new List<PersonSummaryDto>();

    foreach (var person in people)
    {
      var summary = await GetPersonSummaryAsync(person.Id);
      if (summary != null)
      {
        summaries.Add(summary);
      }
    }

    return new SummaryResponseDto
    {
      People = summaries,
      TotalIncome = summaries.Sum(s => s.TotalIncome),
      TotalExpense = summaries.Sum(s => s.TotalExpense),
      Balance = summaries.Sum(s => s.Balance)
    };
  }

  public async Task<PersonSummaryDto> GetPersonSummaryAsync(Guid personId)
  {
    var person = await _personRepository.GetByIdAsync(personId);
    if (person == null)
    {
      throw new NotFoundException("Pessoa não encontrada.");
    }

    var transactions = await _transactionRepository.GetByPersonIdAsync(personId);

    var totalIncome = transactions
      .Where(t => t.Type == TransactionType.Income)
      .Sum(t => t.Value);

    var totalExpense = transactions
      .Where(t => t.Type == TransactionType.Expense)
      .Sum(t => t.Value);

    return new PersonSummaryDto
    {
      Id = person.Id,
      Name = person.Name,
      TotalIncome = totalIncome,
      TotalExpense = totalExpense,
      Balance = totalIncome - totalExpense
    };
  }
}