# ControleGastos

Sistema Full Stack para gerenciamento de gastos residenciais.

A aplicação permite cadastrar pessoas, registrar transações financeiras (receitas e despesas) e consultar resumos financeiros por pessoa e de forma consolidada.

## Tecnologias

### Backend

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL
- Docker
- Swagger

### Frontend

- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- React Hook Form
- Zod
- React Toastify

---

## Estrutura

```plaintext
ControleGastos
├── backend/
│   └── ControleGastos.API
├── frontend/
│   └── controle-gastos-web
├── docs/
└── docker-compose.yml
```

## Como executar

### Pré-requisitos

- .NET SDK 9
- Docker
- Node.js 22+
- npm

Também é necessário instalar a ferramenta do Entity Framework Core:

```bash
dotnet tool install --global dotnet-ef
```

Caso já esteja instalada:

```bash
dotnet tool update --global dotnet-ef
```

### 1. Clonar o projeto

```bash
git clone <repositorio>
```

---

### 2. Subir o PostgreSQL

Na raiz do projeto:

```bash
docker compose up -d
```

---

### 3. Executar o Backend

```bash
cd backend/ControleGastos.API

dotnet ef database update

dotnet watch run
```

API disponível em:

```bash
http://localhost:5001
```

Swagger:

```bash
http://localhost:5001/swagger
```

---

### 4. Executar o Frontend

```bash
cd frontend/controle-gastos-web

npm install

npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```

---

## Funcionalidades

### Pessoas

- Cadastro
- Listagem
- Exclusão
- Resumo financeiro individual

### Transações

- Cadastro
- Listagem
- Histórico por pessoa

### Dashboard

- Resumo financeiro geral
- Totais consolidados
- Acesso rápido às funcionalidades

## Documentação

- [Backend](backend/ControleGastos.API/README.md)

- [Frontend](frontend/controle-gastos-web/README.md)

- [Arquitetura](docs/arquitetura.md)

- [Diagrama de Classes](docs/diagrama-classes.md)

- [Regras de Negócio](docs/regras-negocio.md)

---

## Autor

Andrey Gomes da Silva Nascimento
