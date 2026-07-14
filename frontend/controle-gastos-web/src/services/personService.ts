import api from "./axios.ts";

import type {
  Person,
  CreatePerson,
} from "../types/person.ts";

const BASE_URL = "/person";

const getAll = async () : Promise<Person[]> => {
  const response = await api.get<Person[]>(`${BASE_URL}`);
  return response.data;
}

const getById = async (id: string) : Promise<Person> => {
  const response = await api.get<Person>(`${BASE_URL}/${id}`);
  return response.data;
}

const create = async (person: CreatePerson) : Promise<Person> => {
  const response = await api.post<Person>(`${BASE_URL}`, person);
  return response.data;
}

const remove = async (id: string) : Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
}

const personService = {
  getAll,
  getById,
  create,
  delete : remove
};

export default personService;