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

### Configuração de Ambientes

A aplicação utiliza variáveis de ambiente do Vite.

### Desenvolvimento

Utiliza automaticamente:

```text
.env.development
```

Ou utiliza o fallback no aruivo axios.ts:

```text
http://localhost:5001/api
```

Execute a aplicação:

```bash
npm run dev
```

### Produção

Utiliza:

```text
.env.production
```

Para executar localmente utilizando a API publicada:

```bash
npm run dev:prod
```

Para gerar a versão de produção:

```bash
npm run build
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
- Resumo individual
- Histórico de transações
- Cadastro de transações diretamente pela pessoa

### Transações

- Cadastro
- Listagem completa
- Filtros por pessoa

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
