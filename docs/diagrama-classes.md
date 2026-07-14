# Diagrama de Classes

![Diagrama de Classes](diagrams/DiagramaClasses.svg)

## Entidades

### Person

Representa uma pessoa cadastrada no sistema.

Atributos:

- Id
- Name
- BirthDate

Métodos:

- GetAge()

---

### Transaction

Representa uma movimentação financeira.

Atributos:

- Id
- Description
- Value
- Type
- PersonId
- CreatedAt

---

### TransactionType

Enum responsável por identificar o tipo da movimentação.

Valores:

- Expense
- Income

---

## Relacionamento

Uma pessoa pode possuir zero ou muitas transações.

Cada transação pertence obrigatoriamente a uma pessoa.
