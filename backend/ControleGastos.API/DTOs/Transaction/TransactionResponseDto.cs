using ControleGastos.API.DTOs.Person;
using ControleGastos.API.Models;

namespace ControleGastos.API.DTOs.Transaction;

public class TransactionResponseDto
{
    public Guid Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Value { get; set; }

    public TransactionType Type { get; set; }

    public PersonResponseDto? Person { get; set; }
}