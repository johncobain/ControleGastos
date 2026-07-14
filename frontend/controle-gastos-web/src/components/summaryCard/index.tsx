import Card from "../card";

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard = ({
  title,
  value,
  type,
}: SummaryCardProps) => {
  const getTypeColor = () => {
    switch (type) {
      case 'income':
        return 'var(--income)';
      case 'expense':
        return 'var(--expense)';
      case 'balance':
        return value >= 0 ? 'var(--income)' : 'var(--expense)';
      default:
        return 'var(--accent)';
    }
  };

  return (
    <Card>
      <small>{title}</small>

      <h2 style={{ color: getTypeColor() }}>
        {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </h2>
    </Card>
  );
}

export default SummaryCard;