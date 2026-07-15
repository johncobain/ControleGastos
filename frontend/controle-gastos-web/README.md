# ControleGastos.Web

Interface web do sistema ControleGastos desenvolvida em React.

A aplicação consome a API ASP.NET Core responsável pelo gerenciamento de pessoas, transações financeiras e resumos consolidados.

---

## Tecnologias

- React 19
- TypeScript
- Vite
- Axios
- React Router DOM
- React Hook Form
- Zod
- React Toastify

---

## Como executar

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

---

## Estrutura

```text
src
├── components
├── features
├── pages
├── routes
├── services
├── styles
├── types
└── utils
```

---

## Funcionalidades

### Dashboard

- Resumo financeiro geral
- Totais consolidados
- Ações rápidas

### Pessoas

- Cadastro
- Exclusão
- Consulta de resumo financeiro
- Histórico de transações

### Transações

- Cadastro
- Listagem
- Filtros

---

## Tratamento de Erros

Todos os erros retornados pela API são tratados através do Axios e exibidos utilizando React Toastify.

Formato esperado:

```json
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Erro de validação.",
  "errors": [
    "Mensagem de erro"
  ]
}
```

---
