# ControleGastos

Projeto desenvolvido como desafio técnico para implementação de um sistema de controle de gastos residenciais.

## Objetivo

Desenvolver uma aplicação Full Stack utilizando:

- ASP.NET Core (C#)
- React
- TypeScript
- PostgreSQL

A aplicação deverá permitir o gerenciamento de pessoas, transações financeiras e consulta consolidada de receitas, despesas e saldo.

## Estrutura do projeto

```plaintext
ControleGastos
├── backend
├── frontend
├── docs
└── docker-compose.yml
```

### Backend

API REST desenvolvida com ASP.NET Core responsável pelas regras de negócio, persistência de dados e comunicação com o banco.

> [Documentação do backend](backend/ControleGastos.API/README.md)

### Frontend

Aplicação React responsável pela interface do usuário e consumo da API.

### Docs

Documentação do projeto, diagramas e definições de arquitetura.

> [arquitetura](docs/arquitetura.md)
>
> [diagrama de classes](docs/diagrama-classes.md)
>
> [regras de negócio](docs/regras-negocio.md)

## Funcionalidades

- Cadastro de pessoas
- Cadastro de transações
- Consulta consolidada de receitas, despesas e saldo
- Persistência em banco de dados PostgreSQL

## Autor

Andrey Gomes da Silva Nascimento
