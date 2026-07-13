using ControleGastos.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.API.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
  {    
  }

  public DbSet<Person> People { get; set; }
  public DbSet<Transaction> Transactions { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

    base.OnModelCreating(modelBuilder);
  }
}