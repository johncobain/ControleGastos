# Arquitetura

O projeto segue uma arquitetura cliente-servidor, composta por uma API REST e uma aplicação web SPA.

---

## Backend

Tecnologias:

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL
- Swagger

Organização:

```text
Controllers
Services
Repositories
Interfaces
Data
Models
DTOs
Exceptions
```

A API é responsável por:

- regras de negócio;
- persistência de dados;
- validações;
- tratamento global de erros.

---

## Frontend

Tecnologias:

- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- React Hook Form
- Zod
- React Toastify

Organização:

```text
Pages
Routes
Features
Components
Services
Styles
Types
Utils
```

A aplicação segue uma arquitetura baseada em componentes reutilizáveis, com separação entre interface, comunicação com API e regras de apresentação.

---

## Banco de Dados

- PostgreSQL 16

Relacionamentos:

Person -> Transaction (1:N)

---

## Desenvolvimento

- Docker
- Git
- VSCode
