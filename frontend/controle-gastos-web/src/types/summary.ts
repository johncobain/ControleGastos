export interface Summary {
  people: PersonSummary[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface PersonSummary {
  id: string;
  name: string;
  age: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}