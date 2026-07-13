using ControleGastos.API.DTOs.Transaction;
using ControleGastos.API.Interfaces;

namespace ControleGastos.API.Services;

public class TransactionService : ITransactionService
{


  public Task<IEnumerable<TransactionResponseDto>> GetAllAsync()
  {
    throw new NotImplementedException();
  }

  public Task<TransactionResponseDto?> GetByIdAsync(Guid id)
  {
    throw new NotImplementedException();
  }

  public Task<IEnumerable<TransactionResponseDto>> GetByPersonIdAsync(Guid personId)
  {
    throw new NotImplementedException();
  }

  public Task<TransactionResponseDto> CreateAsync(CreateTransactionDto createTransactionDto)
  {
    throw new NotImplementedException();
  }
}