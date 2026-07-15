import type { Person } from "../../types/person";

import Card from "../card";
import Button from "../button";

interface PersonCardProps {
  person: Person;
  onDetails: (personId: string) => void;
  onDelete: (personId: string) => void;
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
      <div className="flex gap-md">
        <Button 
          variant="primary"
          onClick={()=>onDetails(person.id)}
        >
          Detalhes
        </Button>
        <Button 
          variant="error"
          onClick={()=>onDelete(person.id)}
        >
          Excluir
        </Button>
      </div>
    </Card>
  );
}

export default PersonCard;