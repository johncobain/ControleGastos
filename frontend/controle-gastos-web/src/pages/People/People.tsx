import { useEffect, useMemo, useState } from "react";
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
import Input from "../../components/input";

const People = () => {
  const [people, setPeople] = useState<PersonSummary[]>([]);
  const [summary, setSummary] = useState<Summary>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [minBalance, setMinBalance] = useState("");
  const [maxBalance, setMaxBalance] = useState("");

  const [selectedPerson, setSelectedPerson] = useState<PersonSummary | null>(null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (nameFilter) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (ageFilter) {
      filtered = filtered.filter(p =>
        p.age === Number(ageFilter)
      );
    }

    if (minBalance) {
      filtered = filtered.filter(p =>
        p.balance >= Number(minBalance)
      );
    }

    if (maxBalance) {
      filtered = filtered.filter(p =>
        p.balance <= Number(maxBalance)
      );
    }
    
    return filtered;
  }, [nameFilter, ageFilter, minBalance, maxBalance, people]);

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
        {!loading && (
          <>
            <div className="flex gap-md mb-lg">
              <Input
                label="Pesquisar Nome"
                id="name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <Input
                label="Idade"
                id="age"
                type="number"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              />
              <Input
                label="Saldo mínimo"
                id="minBalance"
                type="number"
                step="0.01"
                value={minBalance}
                onChange={(e) => setMinBalance(e.target.value)}
              />
              <Input
                label="Saldo máximo"
                id="maxBalance"
                type="number"
                step="0.01"
                value={maxBalance}
                onChange={(e) => setMaxBalance(e.target.value)}
              />
            </div>
            {filteredPeople.length === 0 ? (
              <EmptyState
                title="Nenhuma pessoa encontrada"
                description="Não há pessoas cadastradas ou que correspondam aos filtros aplicados."
              />
            ) : (
              <div className="flex-column gap-lg">
                {filteredPeople.map(person=>(
                  <PersonCard
                    key={person.id}
                    person={person}
                    onDetails={() => handleDetails(person.id)}
                    onDelete={() => handleDelete(person.id)}
                  />
                ))}
              </div>
            )}
          </>
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
      {isDetailsModalOpen && (
        <PersonDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedPerson(null);
          }}
          personId={selectedPerson?.id || ""}
          onNewTransaction={loadData}
        />
      )}
    </div>
  );
}

export default People;