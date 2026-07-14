using ControleGastos.API.DTOs.Person;
using ControleGastos.API.DTOs.Summary;
using ControleGastos.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[Route("api/summary")]
[ApiController]
public class SummaryController : ControllerBase
{
  private readonly ISummaryService _summaryService;
  
  public SummaryController(ISummaryService summaryService)
  {
    _summaryService = summaryService;
  }

  [HttpGet]
  public async Task<ActionResult<SummaryResponseDto>> GetSummary()
  {
    var summary = await _summaryService.GetSummaryAsync();
    return Ok(summary);
  }

  [HttpGet("person/{personId:guid}")]
  public async Task<ActionResult<PersonSummaryDto>> GetPersonSummary([FromRoute] Guid personId)
  {
    var personSummary = await _summaryService.GetPersonSummaryAsync(personId);
    return Ok(personSummary);
  }
}