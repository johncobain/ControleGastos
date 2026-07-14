using ControleGastos.API.DTOs.Person;
using ControleGastos.API.Exceptions;
using ControleGastos.API.Interfaces;
using ControleGastos.API.Models;

namespace ControleGastos.API.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;

    public PersonService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    public async Task<IEnumerable<PersonResponseDto>> GetAllAsync()
    {
        var people = await _personRepository.GetAllAsync();

        return people.Select(p => new PersonResponseDto
        {
            Id = p.Id,
            Name = p.Name,
            Age = p.GetAge()
        });
    }

    public async Task<PersonResponseDto> GetByIdAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);

        if (person == null)
        {
            throw new NotFoundException("Pessoa não encontrada.");
        }

        return new PersonResponseDto
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.GetAge()
        };
    }

    public async Task<PersonResponseDto> CreateAsync(CreatePersonDto createPersonDto)
    {
        var person = new Person(
            name: createPersonDto.Name,
            birthDate: createPersonDto.BirthDate!.Value
        );

        await _personRepository.CreateAsync(person);
        await _personRepository.SaveChangesAsync();

        return new PersonResponseDto
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.GetAge()
        };
    }

    public async Task DeleteAsync(Guid id)
    {
        var person = await _personRepository.GetByIdAsync(id);

        if (person == null)
        {
            throw new NotFoundException("Pessoa não encontrada.");
        }

        await _personRepository.DeleteAsync(id);
        await _personRepository.SaveChangesAsync();
    }
}