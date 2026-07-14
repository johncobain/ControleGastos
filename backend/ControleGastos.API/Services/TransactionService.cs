using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Transaction;
using ControleGastos.API.Interfaces;
using ControleGastos.API.Models;

namespace ControleGastos.API.Services;

public class TransactionService : ITransactionService
{
  private readonly ITransactionRepository _transactionRepository;
  private readonly IPersonRepository _personRepository;

  public TransactionService(ITransactionRepository transactionRepository, IPersonRepository personRepository)
  {
    _transactionRepository = transactionRepository;
    _personRepository = personRepository;
  }

  public async Task<IEnumerable<TransactionResponseDto>> GetAllAsync()
  {
    var transactions = await _transactionRepository.GetAllAsync();

    return transactions.Select(t => new TransactionResponseDto
    {
      Id = t.Id,
      Description = t.Description,
      Value = t.Value,
      Type = t.Type,
      Person = _personRepository.GetByIdAsync(t.PersonId).Result is Person person ? new PersonResponseDto
      {
        Id = person.Id,
        Name = person.Name,
        Age = person.GetAge()
      } : null
    });
  }

  public async Task<TransactionResponseDto?> GetByIdAsync(Guid id)
  {
    var transaction = await _transactionRepository.GetByIdAsync(id);

    if (transaction == null)
    {
      return null;
    }

    return new TransactionResponseDto
    {
      Id = transaction.Id,
      Description = transaction.Description,
      Value = transaction.Value,
      Type = transaction.Type,
      Person = _personRepository.GetByIdAsync(transaction.PersonId).Result is Person person ? new PersonResponseDto
      {
        Id = person.Id,
        Name = person.Name,
        Age = person.GetAge()
      } : null
    };
  }

  public async Task<IEnumerable<TransactionResponseDto>> GetByPersonIdAsync(Guid personId)
  {
    var transactions = await _transactionRepository.GetByPersonIdAsync(personId);

    return transactions.Select(t => new TransactionResponseDto
    {
      Id = t.Id,
      Description = t.Description,
      Value = t.Value,
      Type = t.Type,
      Person = _personRepository.GetByIdAsync(t.PersonId).Result is Person person ? new PersonResponseDto
      {
        Id = person.Id,
        Name = person.Name,
        Age = person.GetAge()
      } : null
    });
  }

  // Aqui existe uma regra de negócio importante
  // Se a pessoa responsavel pela transação for menor de idade, não é permitido criar transação de Receita, apenas Despesas
  public async Task<TransactionResponseDto> CreateAsync(CreateTransactionDto createTransactionDto)
  {
    var person = await _personRepository.GetByIdAsync(createTransactionDto.PersonId);

    if (person == null)
    {
      throw new InvalidOperationException("Pessoa não encontrada.");
    }

    if (person.GetAge() < 18 && createTransactionDto.Type == TransactionType.Income)
    {
      throw new InvalidOperationException("Não é permitido criar transações de Receita para pessoas menores de idade.");
    }

    var transaction = new Transaction(
      createTransactionDto.Description,
      createTransactionDto.Value,
      createTransactionDto.Type,
      createTransactionDto.PersonId
    );

    await _transactionRepository.CreateAsync(transaction);
    await _transactionRepository.SaveChangesAsync();

    return new TransactionResponseDto
    {
      Id = transaction.Id,
      Description = transaction.Description,
      Value = transaction.Value,
      Type = transaction.Type,
      Person = _personRepository.GetByIdAsync(transaction.PersonId).Result is Person personT ? new PersonResponseDto
      {
        Id = personT.Id,
        Name = personT.Name,
        Age = personT.GetAge()
      } : null
    };
  }
}