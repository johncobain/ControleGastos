# ControleGastos.API

API REST desenvolvida em ASP.NET Core 9 para gerenciamento de gastos residenciais.

---

## Tecnologias

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL
- Docker
- Swagger

---

## Como executar

### 1. Subir o banco na raíz do projeto (ControleGastos)

```bash
docker compose up -d
```

### 2. Aplicar migrations (em ControleGastos/backend/ControleGastos.API)

```bash
dotnet ef database update
```

### 3. Executar a aplicação

```bash
dotnet watch run
```

---

## Swagger

Após iniciar a aplicação:

```bash
http://localhost:5001/swagger
```

---

## Endpoints

### Pessoa

| Método | Endpoint |
| --------- | ---------- |
| GET | /api/person |
| GET | /api/person/{id} |
| POST | /api/person |
| DELETE | /api/person/{id} |

---

### Transação

| Método | Endpoint |
| --------- | ---------- |
| GET | /api/transaction |
| GET | /api/transaction/{id} |
| GET | /api/transaction/person/{id} |
| POST | /api/transaction |

---

### Resumo

| Método | Endpoint |
| --------- | ---------- |
| GET | /api/summary |
| GET | /api/summary/person/{id} |

---

## Regras de Negócio

### Pessoas

- Nome obrigatório.
- Idade calculada a partir da data de nascimento.
- Ao remover uma pessoa, todas as suas transações são removidas automaticamente.

### Transações

- Pessoa deve existir.
- Menores de idade podem cadastrar apenas despesas.
- Valor deve ser maior que zero.
- Transações são retornadas ordenadas por data de criação.

---

## Tratamento de Erros

A aplicação utiliza um middleware global para tratamento de exceções.

- Pessoa não encontrada
- Violação de regra de negócio
- Erros de validação

Formato padrão de erro:

```json
{
"status": 400,
"code": "VALIDATION_ERROR",
"message": "Erro de validação.",
"errors": [
  "O campo 'Name' é obrigatório."
]
}
```

Codigos de erro utilizados:

- `VALIDATION_ERROR`
- `NOT_FOUND`
- `BUSINESS_RULE_VIOLATION`
- `INTERNAL_SERVER_ERROR`

---
