using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.API.Models;

namespace ControleGastos.API.Interfaces;

public interface ITransactionRepository
{
    Task<IEnumerable<Transaction>> GetAllAsync();

    Task<Transaction?> GetByIdAsync(Guid id);

    Task<IEnumerable<Transaction>> GetByPersonIdAsync(Guid personId);

    Task<Transaction> CreateAsync(Transaction transaction);

    Task SaveChangesAsync();
}