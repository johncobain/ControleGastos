namespace ControleGastos.API.Models
{
    public class Person
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public DateOnly BirthDate { get; private set; }

        public ICollection<Transaction> Transactions { get; private set; } = [];

        private Person() { }

        public Person(string name, DateOnly birthDate)
        {
            Id = Guid.NewGuid();
            Name = name;
            BirthDate = birthDate;
        }

        public int GetAge()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var age = today.Year - BirthDate.Year;

            if (BirthDate > today.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}