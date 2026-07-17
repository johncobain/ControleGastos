# ControleGastos

![Home](docs/telas/demo.gif)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![ASP.NET](https://img.shields.io/badge/ASP.NET_Core-9-512BD4?logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema Full Stack desenvolvido para gerenciamento de gastos residenciais, permitindo cadastro de pessoas, transações financeiras e consultas consolidadas de receitas, despesas e saldo.

## Demonstração

| Serviço  | Link                                                                                                 |
|----------|------------------------------------------------------------------------------------------------------|
| Frontend | [https://controle-gastos-fullstack.vercel.app](https://controle-gastos-fullstack.vercel.app)         |
| Backend  | [https://controlegastos-tbom.onrender.com/api](https://controlegastos-tbom.onrender.com/api)         |
| Swagger  | Disponível apenas em ambiente de desenvolvimento.                                                    |

OBS: Checar rotas disponíveis da API em [backend/ControleGastos.API/README.md#endpoints](backend/ControleGastos.API/README.md#endpoints).

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

### Ambiente de Desenvolvimento Backend

```bash
cd backend/ControleGastos.API

dotnet watch run
```

### Ambiente de Produção Backend

O projeto também suporta execução utilizando o perfil **Production**, permitindo utilizar um banco de dados remoto (como Neon).

Crie o arquivo:

```text
backend/ControleGastos.API/appsettings.Production.json
```

utilizando como base:

```text
backend/ControleGastos.API/appsettings.Production.json.example
```

Adicione a conection string do banco selecionado e depois execute:

```bash
dotnet watch run --launch-profile Production
```

### URLs Backend

API disponível em:

```bash
http://localhost:5001
```

Swagger (Apenas Profile Development) disponível em:

```bash
http://localhost:5001/swagger
```

---

### 4. Executar o Frontend

### Ambiente de Desenvolvimento Frontend

```bash
cd frontend/controle-gastos-web

npm install

npm run dev
```

### Ambiente de Produção Frontend

```bash
npm run dev:prod
```

### Build

```bash
npm run build
```

### URLs Frontend

Aplicação disponível em:

```bash
http://localhost:5173
```

---

## Funcionalidades

### Dashboard

- Resumo financeiro geral
- Totais consolidados
- Acesso rápido às funcionalidades

### Pessoas

- Cadastro
- Exclusão
- Resumo financeiro individual
- Histórico de transações
- Cadastro de transações por pessoa

### Transações

- Cadastro
- Listagem
- Filtros por pessoa
- Consulta detalhada

## Deploy

O projeto pode ser publicado utilizando os seguintes serviços:

| Serviço        | Plataforma      |
|----------------|-----------------|
| Frontend       | Vercel          |
| Backend        | Render          |
| Banco de Dados | Neon PostgreSQL |

## Documentação

- [Backend](backend/ControleGastos.API/README.md)

- [Frontend](frontend/controle-gastos-web/README.md)

- [Arquitetura](docs/arquitetura.md)

- [Diagrama de Classes](docs/diagrama-classes.md)

- [Regras de Negócio](docs/regras-negocio.md)

- [Telas da Aplicação](docs/telas.md)

---

## Autor

Andrey Gomes da Silva Nascimento
