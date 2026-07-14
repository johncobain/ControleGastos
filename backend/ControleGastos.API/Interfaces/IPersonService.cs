using ControleGastos.API.DTOs.Person;

namespace ControleGastos.API.Interfaces;

public interface IPersonService
{
    Task<IEnumerable<PersonResponseDto>> GetAllAsync();

    Task<PersonResponseDto> GetByIdAsync(Guid id);

    Task<PersonResponseDto> CreateAsync(CreatePersonDto createPersonDto);

    Task DeleteAsync(Guid id);
}