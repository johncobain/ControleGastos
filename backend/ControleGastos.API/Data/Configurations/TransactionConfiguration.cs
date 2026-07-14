using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ControleGastos.API.Data.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
  public void Configure(EntityTypeBuilder<Transaction> builder)
  {
    builder.ToTable("Transactions");

    builder.HasKey(t => t.Id);

    builder.Property(t => t.Description)
      .IsRequired()
      .HasMaxLength(255);

    builder.Property(t => t.Value)
      .IsRequired()
      .HasPrecision(10, 2);

    builder.Property(t => t.Type)
      .IsRequired()
      .HasConversion<string>();
    
    builder.Property(t => t.PersonId)
      .IsRequired();
    
    builder.HasOne(t => t.Person)
      .WithMany(p => p.Transactions)
      .HasForeignKey(t => t.PersonId)
      .OnDelete(DeleteBehavior.Cascade);
    
    builder.HasIndex(t => t.PersonId);
  }
} 