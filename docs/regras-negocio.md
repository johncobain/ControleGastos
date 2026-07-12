# Regras de Negócio

## Objetivo

Implementar um sistema de controle de gastos residenciais com:

- Cadastros de transações;
- Cadastro de pessoas;
- Consulta de totais;

Deixar claro qual foi a lógica/função do que foi desenvolvido, através de comentários e documentação no próprio código.

## Pessoa (Criação, Listagem e Deleção)

- Nome obrigatório.
- Data de nascimento obrigatória.
- Ao remover uma pessoa todas as transações são removidas.

## Transações (Criação e Listagem)

- Deve existir uma pessoa para cadastrar uma transação.
- Pessoas menores de 18 anos só podem cadastrar despesas.
- Não é necessário implementar edição/deleção de transações.

## Consulta de Totais

Deverá listar todas as pessoas cadastradas.

Para cada pessoa:

- Total de Receitas
- Total de Despesas
- Saldo (receitas - despesas)

Ao final:

- Total geral de receitas
- Total geral de despesas
- Saldo geral
