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

## Configuração de Ambientes

A aplicação possui suporte a dois ambientes de execução:

- **Development**: utiliza o arquivo `appsettings.Development.json`.
- **Production**: utiliza o arquivo `appsettings.Production.json`.

O arquivo `appsettings.Production.json` está no `.gitignore`, portanto não é enviado ao repositório.

Para facilitar a configuração existe o arquivo:

```text
appsettings.Production.json.example
```

Basta copiá-lo para:

```text
appsettings.Production.json
```

e preencher a string de conexão do banco de dados escolhido.

## Como executar

### 1. Subir o banco na raíz do projeto (ControleGastos)

```bash
docker compose up -d
```

### 2. Executar a aplicação

```bash
dotnet watch run
```

## Executando com Ambiente Produção

Após configurar o arquivo `appsettings.Production.json`, execute:

### Iniciar a aplicação

```bash
dotnet watch run --launch-profile Production
```

---

## Swagger (Apenas Profile Development)

Após iniciar a aplicação:

```bash
http://localhost:5001/swagger
```

## Desenvolvimento

A aplicação aplica automaticamente todas as migrations pendentes durante a inicialização.

Para alterações no modelo de dados, é necessário criar novas migrations utilizando a ferramenta Entity Framework CLI (`dotnet-ef`).

```bash
dotnet tool install --global dotnet-ef
```

Para criar uma nova migration, execute:

```bash
dotnet ef migrations add NomeDaMigration
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
