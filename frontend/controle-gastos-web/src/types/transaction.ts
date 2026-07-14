import type { Person } from "./person.ts";

export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  createdAt: string;
  person: Person;
}

export interface CreateTransaction {
  description: string;
  value: number;
  type: TransactionType;
  personId: string;
}