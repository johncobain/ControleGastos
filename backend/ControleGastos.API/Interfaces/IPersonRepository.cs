using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.API.Models;

namespace ControleGastos.API.Interfaces;

public interface IPersonRepository
{
    Task<IEnumerable<Person>> GetAllAsync();

    Task<Person?> GetByIdAsync(Guid id);

    Task<Person> CreateAsync(Person person);

    Task<Person?> DeleteAsync(Guid id);

    Task SaveChangesAsync();
}
