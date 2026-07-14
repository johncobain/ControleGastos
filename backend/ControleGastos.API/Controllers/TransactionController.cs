using ControleGastos.API.DTOs.Transaction;
using ControleGastos.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers;

[Route("api/transaction")]
[ApiController]
public class TransactionController : ControllerBase
{
  private readonly ITransactionService _transactionService;

  public TransactionController(ITransactionService transactionService)
  {
      _transactionService = transactionService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<TransactionResponseDto>>> GetAll()
  {
    var transactions = await _transactionService.GetAllAsync();
    return Ok(transactions);
  }

  [HttpGet("{id:guid}")]
  public async Task<ActionResult<TransactionResponseDto>> GetById([FromRoute] Guid id)
  {
    var transaction = await _transactionService.GetByIdAsync(id);
    return Ok(transaction);
  }

  [HttpGet("person/{personId:guid}")]
  public async Task<ActionResult<IEnumerable<TransactionResponseDto>>> GetByPersonId([FromRoute] Guid personId)
  {
    var transactions = await _transactionService.GetByPersonIdAsync(personId);
    return Ok(transactions);
  }

  [HttpPost]
  public async Task<ActionResult<TransactionResponseDto>> Create([FromBody] CreateTransactionDto createTransactionDto)
  {
    var transaction = await _transactionService.CreateAsync(createTransactionDto);

    return CreatedAtAction(
      nameof(GetById),
      new { id = transaction.Id },
      transaction
    );
  }
}