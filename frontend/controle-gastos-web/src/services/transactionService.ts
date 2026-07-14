import api from "./axios.ts";

import type {
  Transaction,
  CreateTransaction
} from "../types/transaction.ts";

const BASE_URL = "/transaction";

const getAll = async () : Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(`${BASE_URL}`);
  return response.data;
}

const getById = async (id: string) : Promise<Transaction> => {
  const response = await api.get<Transaction>(`${BASE_URL}/${id}`);
  return response.data;
}

const getByPersonId = async (personId: string) : Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(`${BASE_URL}/person/${personId}`);
  return response.data;
}

const create = async (transaction: CreateTransaction) : Promise<Transaction> => {
  const response = await api.post<Transaction>(`${BASE_URL}`, transaction);
  return response.data;
}

const transactionService = {
  getAll,
  getById,
  getByPersonId,
  create
};

export default transactionService;