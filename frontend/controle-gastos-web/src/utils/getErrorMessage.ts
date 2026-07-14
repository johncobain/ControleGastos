import axios from "axios";

import { ApiRequestError } from "../types/apiError.ts";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiRequestError) {
    if (error.code === "VALIDATION_ERROR" && error.details && error.details.length > 0) {
      return error.details.join(" | ");
    }

    return error.message;
  }

  if (!axios.isAxiosError(error))
    return "Ocorreu um erro inesperado.";

  if (!error.response)
    return "Não foi possível conectar ao servidor.";

  const data = error.response.data;

  if (typeof data === "string")
    return data;
  
  if (data?.message)
    return data.message;

  return "Ocorreu um erro inesperado.";
};