import type { PersonSummary } from "../../types/summary";

import Card from "../card";
import Button from "../button";

interface PersonCardProps {
  person: PersonSummary;
  onDetails: (personId: string) => void;
  onDelete?: (personId: string) => void;
}

const PersonCard = ({
  person,
  onDetails,
  onDelete
}: PersonCardProps) => {
  return (
    <Card className="flex justify-between">
      <div>
        <h3>{person.name}</h3>
        <p>{person.age} anos</p>
      </div>
      <div>
        <h3>Receita</h3>
        <p 
          style={{color: 'var(--income)'}}>
          {person.totalIncome
          .toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' } )}
        </p>
      </div>
      <div>
        <h3>Despesas</h3>
        <p 
          style={{color: 'var(--expense)'}}>
          {person.totalExpense
          .toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' } )}
        </p>
      </div>
      <div>
        <h3>Saldo</h3>
        <p 
          style={{color: person.balance>=0
            ? 'var(--income)' 
            : 'var(--expense)'
        }}>
          {person.balance
          .toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' } )}
        </p>
      </div>
      <div className="flex gap-md">
        <Button 
          variant="primary"
          onClick={()=>onDetails(person.id)}
        >
          Detalhes
        </Button>
        {onDelete && (
          <Button 
            variant="error"
            onClick={()=>onDelete(person.id)}
            >
            Excluir
          </Button>
        )}
      </div>
    </Card>
  );
}

export default PersonCard;