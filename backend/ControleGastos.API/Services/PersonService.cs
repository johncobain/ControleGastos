using ControleGastos.API.DTOs.Person;
using ControleGastos.API.Interfaces;

namespace ControleGastos.API.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;

    public PersonService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    public Task<IEnumerable<PersonResponseDto>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<PersonResponseDto?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<PersonResponseDto> CreateAsync(CreatePersonDto createPersonDto)
    {
        throw new NotImplementedException();
    }

    public Task<PersonResponseDto?> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}