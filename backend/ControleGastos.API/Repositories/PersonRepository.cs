using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.API.Data;
using ControleGastos.API.Interfaces;
using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Repositories;
public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Person>> GetAllAsync()
    {
        return await _context.People.ToListAsync();
    }

    public async Task<Person?> GetByIdAsync(Guid id)
    {
        return await _context.People.FindAsync(id);
    }

    public async Task<Person> CreateAsync(Person person)
    {
        await _context.People.AddAsync(person);
        return person;
    }

    public async Task<Person?> DeleteAsync(Guid id)
    {
        var person = await _context.People.FirstOrDefaultAsync(p => p.Id == id);
        if (person is null)
        {
            return null;
        }

        _context.People.Remove(person);
        return person;
    }

    // Para melhor performance, é melhor chamar SaveChangesAsync() apenas uma vez após várias operações de criação ou exclusão, em vez de chamar SaveChangesAsync() após cada operação individual.
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
