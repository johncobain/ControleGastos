import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Button from "../../components/button";
import PageHeader from "../../components/pageHeader";
import type { Transaction } from "../../types/transaction";
import EmptyState from "../../components/emptyState";
import transactionService from "../../services/transactionService";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import Input from "../../components/input";
import Loading from "../../components/loading";
import TransactionTable from "../../components/transactionTable";
import CreateTransactionModal from "../../features/transaction/CreateTransactionModal";
import type { Summary } from "../../types/summary";
import summaryService from "../../services/summaryService";
import SummaryCard from "../../components/summaryCard";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [personFilter, setPersonFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<"Income" | "Expense" | "">("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (search) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (personFilter) {
      filtered = filtered.filter(t => 
        t.person.name.toLowerCase().includes(personFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    return filtered;
  }, [search, personFilter, typeFilter, transactions]);

  const loadData = async () => {
    Promise.all([
      transactionService.getAll(),
      summaryService.getSummary(),
    ])
      .then(([transactionsData, summaryData]) => {
        setTransactions(transactionsData);
        setSummary(summaryData);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      transactionService.getAll(),
      summaryService.getSummary(),
    ])
      .then(([transactionsData, summaryData]) => {
        if (!isMounted) {
          return;
        }
        setTransactions(transactionsData);
        setSummary(summaryData);
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }
        setLoading(false);
      });
    return () =>{
      isMounted = false;
    }
  }, []);

  if (error) {
    return <EmptyState
      title="Erro ao carregar transações"
      description={error}
    />;
  }

  return (
    <div className="flex-column gap-lg">
      <PageHeader
        title="Transações"
        subtitle={`${transactions.length} transações cadastradas`}
        actions={<Button onClick={() => setCreateModalOpen(true)}>Nova transação</Button>}
      />
      {summary && (
        <section className="page-summary">
          <h3>Resumo Geral</h3>
          <div className="summary-grid">
            <SummaryCard
              title="Receitas"
              type="income"
              value={summary.totalIncome}
            />

            <SummaryCard
              title="Despesas"
              type="expense"
              value={summary.totalExpense}
            />

            <SummaryCard
              title="Saldo"
              type="balance"
              value={summary.balance}
            />
          </div>
        </section>
      )}
      <main>
        {loading ? (<Loading message="Carregando transações..." />) 
        : (
          <>
            <div className="flex gap-md mb-lg">
              <Input
                label="Pesquisar Descrição"
                id="description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Input
                label="Pesquisar Pessoa"
                id="person"
                value={personFilter}
                onChange={(e) => setPersonFilter(e.target.value)}
              />
              <Input
                label="Pesquisar Tipo"
                id="type"
                options={[
                  { value: "", label: "Todos" },
                  { value: "Income", label: "Receita" },
                  { value: "Expense", label: "Despesa" },
                ]}
                value={typeFilter}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value as "Income" | "Expense" | "")}
              />
            </div>
            {filteredTransactions.length === 0 ? (
              <EmptyState
                title="Nenhuma transação encontrada"
                description="Não há transações cadastradas ou que correspondam aos filtros aplicados."
              />) : (
                <TransactionTable transactions={filteredTransactions} />
              )}
          </> 
        )}
      </main>
      {createModalOpen && (
        <CreateTransactionModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={loadData}
        />
      )}
    </div>
  )
}

export default Transactions;