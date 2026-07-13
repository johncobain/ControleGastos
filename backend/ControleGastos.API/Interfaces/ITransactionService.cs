using ControleGastos.API.DTOs.Transaction;

namespace ControleGastos.API.Interfaces;

public interface ITransactionService
{
    Task<IEnumerable<TransactionResponseDto>> GetAllAsync();

    Task<TransactionResponseDto?> GetByIdAsync(Guid id);

    Task<IEnumerable<TransactionResponseDto>> GetByPersonIdAsync(Guid personId);

    Task<TransactionResponseDto> CreateAsync(CreateTransactionDto createTransactionDto);
}