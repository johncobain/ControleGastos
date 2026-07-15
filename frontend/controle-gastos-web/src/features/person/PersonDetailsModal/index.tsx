import { useEffect, useState } from "react";
import type { PersonSummary } from "../../../types/summary";
import type { Transaction } from "../../../types/transaction";

import transactionService from "../../../services/transactionService";
import summaryService from "../../../services/summaryService";
import { toast } from "react-toastify/unstyled";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import Modal from "../../../components/modal";
import Loading from "../../../components/loading";
import SummaryCard from "../../../components/summaryCard";
import TransactionTable from "../../../components/transactionTable";
import Button from "../../../components/button";
import CreateTransactionModal from "../../transaction/CreateTransactionModal";

interface PersonDetailsModalProps {
  personId: string;
  isOpen: boolean;
  onClose: () => void;
  onNewTransaction: () => void;
}

const PersonDetailsModal = ({
  personId,
  isOpen,
  onClose,
  onNewTransaction,
}: PersonDetailsModalProps) => {
  const [summary, setSummary] = useState<PersonSummary>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  const [createTransactionOpen, setCreateTransactionOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([
      summaryService.getPersonSummary(personId),
      transactionService.getByPersonId(personId),
    ])
      .then(([summaryData, transactionsData]) => {
        setSummary(summaryData);
        setTransactions(transactionsData);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    
    let isMounted = true;

    Promise.all([
      summaryService.getPersonSummary(personId),
      transactionService.getByPersonId(personId),
    ]).then(([summaryData, transactionsData]) => {
      if (!isMounted) {
        return;
      }
      setSummary(summaryData);
      setTransactions(transactionsData);
    })
    .catch((error) => {
      if (!isMounted) {
        return;
      }
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    })
    .finally(() => {
      if (!isMounted) {
        return;
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    }
  }, [isOpen, personId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={summary?.name ?? "Detalhes da Pessoa"}
      footer={
        <div className="flex align-center justify-between gap-md">
          <Button variant="error" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={() => setCreateTransactionOpen(true)}>
            Nova Transação
          </Button>
        </div>
      }
    >
      {loading ? (
        <Loading message="Carregando dados..." />
      ) : (
        <div className="flex-column gap-lg">
          <div className="summary-grid">
            <SummaryCard
              title="Receitas"
              type="income"
              value={summary?.totalIncome ?? 0}
            />
            <SummaryCard
              title="Despesas"
              type="expense"
              value={summary?.totalExpense ?? 0}
            />
            <SummaryCard
              title="Saldo"
              type="balance"
              value={summary?.balance ?? 0}
            />
          </div>
          <h3>Transações</h3>
          <TransactionTable transactions={transactions}/>
        </div>
      )}
      {createTransactionOpen && (
        <CreateTransactionModal
          isOpen={createTransactionOpen}
          onClose={() => setCreateTransactionOpen(false)}
          onSuccess={async ()=>{
            await loadData();
            onNewTransaction();
          }}
          person={summary}
        />
      )}
    </Modal>
  );
};

export default PersonDetailsModal;