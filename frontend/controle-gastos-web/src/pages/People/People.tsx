import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/button";

import "./styles.css";
import type { PersonSummary, Summary } from "../../types/summary";
import summaryService from "../../services/summaryService";
import personService from "../../services/personService";
import Loading from "../../components/loading";
import EmptyState from "../../components/emptyState";
import PersonCard from "../../components/personCard";
import { getErrorMessage } from "../../utils/getErrorMessage";
import SummaryCard from "../../components/summaryCard";
import PageHeader from "../../components/pageHeader";
import ConfirmDialog from "../../components/confirmDialog";
import CreatePersonModal from "../../features/person/CreatePersonModal";
import PersonDetailsModal from "../../features/person/PersonDetailsModal";

const People = () => {
  const [people, setPeople] = useState<PersonSummary[]>([]);
  const [summary, setSummary] = useState<Summary>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPerson, setSelectedPerson] = useState<PersonSummary | null>(null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDetails = (id: string) => {
    const person = people.find((item) => item.id === id);

    if (!person) {
      return;
    }

    setSelectedPerson(person);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const person = people.find((item) => item.id === id);

    if (!person) {
      return;
    }

    setSelectedPerson(person);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPerson) {
      return;
    }

    try {
      setIsDeleting(true);
      await personService.delete(selectedPerson.id);

      await loadData();
      toast.success("Pessoa excluida com sucesso.");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setSelectedPerson(null);
    }
  };

  const loadData = async () => {
    let isMounted = true;
  
    summaryService.getSummary()
      .then((summary) => {
        if (!isMounted) {
          return;
        }
        setSummary(summary);
        setPeople(summary.people);
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
    return () => {
      isMounted = false;
    };
  }

  useEffect(()=> {
    loadData();
  }, []);

  if (error) {
    return <EmptyState
      title="Erro ao carregar dados"
      description={error}
    />;
  }

  return (
    <div className="flex-column gap-lg">
      <PageHeader
        title="Pessoas"
        subtitle={`${people.length} pessoas cadastradas`}
        actions={<Button onClick={() => setIsCreateModalOpen(true)}>Nova Pessoa</Button>}
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
        {loading && <Loading message="Carregando dados..."/>}
        {!loading && people.length === 0 && (
          <EmptyState
            title="Nenhuma pessoa cadastrada"
            description="Clique no botão 'Nova Pessoa' para cadastrar uma nova pessoa."
          />
        )}

        {!loading && people.length > 0 && (
          <div className="flex-column gap-lg">
            {people.map(person=>(
              <PersonCard
                key={person.id}
                person={person}
                onDetails={() => handleDetails(person.id)}
                onDelete={() => handleDelete(person.id)}
              />
            ))}
          </div>
        )}
      </main>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirmar exclusao"
        message={
          selectedPerson
            ? `Deseja realmente excluir ${selectedPerson.name}?`
            : "Deseja realmente excluir esta pessoa?"
        }
        loading={isDeleting}
        onCancel={() => {
          if (isDeleting) {
            return;
          }
          setIsConfirmOpen(false);
          setSelectedPerson(null);
        }}
        onConfirm={handleConfirmDelete}
      />
      <CreatePersonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={async () => {
          await loadData();
        }}
      />
      <PersonDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPerson(null);
        }}
        personId={selectedPerson?.id || ""}
        onNewTransaction={loadData}
      />
    </div>
  );
}

export default People;