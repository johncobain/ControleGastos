using System.ComponentModel.DataAnnotations;
using ControleGastos.API.Models;

namespace ControleGastos.API.DTOs.Transaction;

public class CreateTransactionDto
{
    [Required]
    [MaxLength(255)]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Value { get; set; }

    [Required]
    public TransactionType Type { get; set; }

    [Required]
    public Guid PersonId { get; set; }
}