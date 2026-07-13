namespace ControleGastos.API.DTOs.Person;

public class PersonSummaryDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal Balance { get; set; }
}