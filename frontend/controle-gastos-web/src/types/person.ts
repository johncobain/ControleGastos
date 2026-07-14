export interface Person {
  id: string;
  name: string;
  age: number;
}

export interface CreatePerson {
  name: string;
  birthDate: string;
}

export interface PersonSummary {
  id: string;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}