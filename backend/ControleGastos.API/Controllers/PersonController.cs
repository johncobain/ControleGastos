using ControleGastos.API.DTOs.Person;
using ControleGastos.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[Route("api/person")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonResponseDto>>> GetAll()
    {
        var people = await _personService.GetAllAsync();
        return Ok(people);
    }


    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PersonResponseDto>> GetById([FromRoute] Guid id)
    {
        var person = await _personService.GetByIdAsync(id);
        return Ok(person);
    }

    [HttpPost]
    public async Task<ActionResult<PersonResponseDto>> Create([FromBody] CreatePersonDto createPersonDto)
    {
        var person = await _personService.CreateAsync(createPersonDto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = person.Id },
            person
        );
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        await _personService.DeleteAsync(id);

        return NoContent();
    }
}