using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleGastos.API.Data.Configurations;

public class PersonConfiguration : IEntityTypeConfiguration<Person>
{
  public void Configure(EntityTypeBuilder<Person> builder)
  {
    builder.ToTable("People");

    builder.HasKey(p => p.Id);

    builder.Property(p => p.Name)
      .IsRequired()
      .HasMaxLength(100);

    builder.Property(p => p.BirthDate)
      .IsRequired();
  }
}