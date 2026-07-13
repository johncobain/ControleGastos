using System.ComponentModel.DataAnnotations;

namespace ControleGastos.API.DTOs.Person;

public class CreatePersonDto
{
  [Required(ErrorMessage = "O campo 'Name' é obrigatório.")]
  [MaxLength(100, ErrorMessage = "O campo 'Name' deve ter no máximo 100 caracteres.")]
  public string Name { get; set; } = string.Empty;

  [Required(ErrorMessage = "O campo 'BirthDate' é obrigatório.")]
  public DateOnly? BirthDate { get; set; }
}