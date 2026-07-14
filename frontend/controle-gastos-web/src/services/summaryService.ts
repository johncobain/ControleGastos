import api from "./axios.ts";

import type { Summary } from "../types/summary.ts";

const BASE_URL = "/summary";

const getSummary = async () : Promise<Summary> => {
  const response = await api.get<Summary>(`${BASE_URL}`);
  return response.data;
}

const getPersonSummary = async (personId: string) : Promise<Summary> => {
  const response = await api.get<Summary>(`${BASE_URL}/person/${personId}`);
  return response.data;
}

const summaryService = {
  getSummary,
  getPersonSummary
};

export default summaryService;