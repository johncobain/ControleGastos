import Table from "../table";

import type { Transaction } from "../../types/transaction.ts";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({
  transactions
}: TransactionTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Pessoa</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.description}</td>
            <td>{transaction.type=== 'Income' ? 'Receita' : 'Despesa'}</td>
            <td style={{ 
              color: transaction.type === 'Income' 
                ? 'var(--income)' 
                : 'var(--expense)' 
            }}>
              {transaction.value.toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' }
              )}
            </td>
            <td>{transaction.person.name}</td>
            <td>{new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

export default TransactionTable;