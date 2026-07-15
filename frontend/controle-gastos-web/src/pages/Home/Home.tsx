import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/pageHeader";
import type { Summary } from "../../types/summary";
import Button from "../../components/button";
import CreatePersonModal from "../../features/person/CreatePersonModal";
import CreateTransactionModal from "../../features/transaction/CreateTransactionModal";
import summaryService from "../../services/summaryService";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "react-toastify";
import EmptyState from "../../components/emptyState";
import Loading from "../../components/loading";
import PersonCard from "../../components/personCard";
import { useNavigate } from "react-router-dom";
import type { Transaction } from "../../types/transaction";
import transactionService from "../../services/transactionService";
import TransactionTable from "../../components/transactionTable";
import Card from "../../components/card";

import "./styles.css";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const Home = () => {
  const navigate = useNavigate();

  const [summary, setSummary] = useState<Summary>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const loadData = async () => {
    Promise.all([
      summaryService.getSummary(),
      transactionService.getAll(),
    ])
      .then(([summaryData, transactionsData]) => {
        setSummary(summaryData);
        setTransactions(transactionsData);
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
    loadData();
  }, []);

  const latestTransactions = useMemo(
    () => transactions.slice(0, 5),
    [transactions]
  );

  const highlightedPeople = useMemo(
    () => summary?.people.map((person) => ({
      ...person,
      balance: person.totalIncome - person.totalExpense,
    })).sort((a, b) => b.balance - a.balance).slice(0, 5) ?? [],
    [summary]
  );

  if (error) {
    return <EmptyState
      title="Erro ao carregar dados"
      description={error}
    />
  }

  if (loading) {
    return <Loading message="Carregando dados..." />;
  }

  return (
    <div className="flex-column gap-lg">
      <PageHeader
        title="Dashboard"
        subtitle={`Visão geral do controle de gastos`}
      />
      <Card className="text-center flex-column gap-sm">
        <span className="dashboard-hero-label">Saldo atual</span>
        <span 
          className="dashboard-hero-value"
          style={{color: summary && summary.balance >= 0 ? 'var(--income)' : 'var(--expense)'}}
        >
          {formatCurrency(summary?.balance ?? 0)}
        </span>
        <div className="dashboard-hero-breakdown">
          Receitas: 
          <span style={{color: 'var(--income)'}}>
            {formatCurrency(summary?.totalIncome ?? 0)}
          </span>
          Despesas: 
          <span style={{color: 'var(--expense)'}}>
            {formatCurrency(summary?.totalExpense ?? 0)}
          </span>
        </div>
      </Card>
      <section className="dashboard-stats-grid">
        <Card className="flex-column">
          <small>Pessoas</small>
          <h2>
            {summary?.people.length ?? 0} cadastrada
            {summary?.people.length === 1 ? "" : "s"}
          </h2>
        </Card>
        <Card className="flex-column">
          <small>Transações</small>
          <h2>
            {transactions.length} registrada
            {transactions.length === 1 ? "" : "s"}
          </h2>
        </Card>
      </section>
      <section className="flex-column gap-md">
        <h3>Ações rápidas</h3>
        <div className="dashboard-quick-actions-grid">
          <Button onClick={() => setIsPersonModalOpen(true)}>
            Nova Pessoa
          </Button>
          <Button onClick={() => setIsTransactionModalOpen(true)}>
            Nova Transação
          </Button>
          <Button variant="info" onClick={() => navigate("/people")}>
            Gerenciar Pessoas
          </Button>
          <Button variant="info" onClick={() => navigate("/transactions")}>
            Ver Transações
          </Button>
        </div>
      </section>
      <section className="flex-column gap-md">
        <h3>Últimas transações</h3>
        {latestTransactions.length === 0 ? (
          <EmptyState
            title="Nenhuma transação cadastrada"
            description="Cadastre uma transação para começar a controlar seus gastos."
          />
        ) : (
          <TransactionTable transactions={latestTransactions} />
        )}
      </section>

      <section className="flex-column gap-md">
        <h3>Top 5 Pessoas</h3>
        {highlightedPeople.length === 0 ? (
          <EmptyState
            title="Nenhuma pessoa cadastrada"
            description="Cadastre uma pessoa para começar a controlar seus gastos."
          />
        ) : (
          <div className="flex-column gap-md">
            {highlightedPeople.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onDetails={() => navigate("/people")}
              />
            ))}
          </div>
        )}
      </section>
      {isPersonModalOpen && (
        <CreatePersonModal
          isOpen={isPersonModalOpen}
          onClose={() => setIsPersonModalOpen(false)}
          onSuccess={async () => {
            await loadData();
          }}
        />
      )}
      {isTransactionModalOpen && (
        <CreateTransactionModal
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
          onSuccess={async () => {
            await loadData();
          }}
        />
      )}
    </div>
  )
}

export default Home;