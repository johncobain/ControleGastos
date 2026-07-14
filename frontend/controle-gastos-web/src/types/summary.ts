import type { PersonSummary } from './person.ts';

export interface Summary {
  people: PersonSummary[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
}