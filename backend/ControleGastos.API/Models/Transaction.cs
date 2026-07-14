using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.API.Models
{
    public class Transaction
    {
        public Guid Id { get; private set; }
        public string Description { get; private set; } = string.Empty;
        [Column(TypeName = "decimal(10,2)")]
        public decimal Value { get; private set; }
        public TransactionType Type { get; private set; }

        public Guid PersonId { get; private set; }
        public Person Person { get; private set; } = null!;

        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

        private Transaction() { }

        public Transaction(
            string description,
            decimal value,
            TransactionType type,
            Guid personId
        )
        {
            Id = Guid.NewGuid();
            Description = description;
            Value = value;
            Type = type;
            PersonId = personId;
        }
    }
}