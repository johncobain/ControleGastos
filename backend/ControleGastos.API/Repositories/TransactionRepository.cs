using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.API.Models;
using ControleGastos.API.Data;
using ControleGastos.API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        return await _context.Transactions
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Transaction?> GetByIdAsync(Guid id)
    {
        return await _context.Transactions.FindAsync(id);
    }

    public async Task<IEnumerable<Transaction>> GetByPersonIdAsync(Guid personId)
    {
        return await _context.Transactions
            .Where(t => t.PersonId == personId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<Transaction> CreateAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        return transaction;
    }

    // Para melhor performance, é melhor chamar SaveChangesAsync() apenas uma vez após várias operações de criação ou exclusão, em vez de chamar SaveChangesAsync() após cada operação individual.
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}