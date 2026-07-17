import axios, { AxiosError } from "axios";

import {
  ApiRequestError,
  type ApiErrorResponse,
} from "../types/apiError.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(
        new ApiRequestError(
          "NETWORK_ERROR",
          "Nao foi possivel conectar ao servidor.",
          undefined,
          undefined,
          error
        )
      );
    }

    const { status, data } = error.response;
    const rawData: unknown = data;

    if (rawData && typeof rawData === "object") {
      const errorData = rawData as ApiErrorResponse;

      const code =
        typeof errorData.code === "string" && errorData.code.trim().length > 0
          ? errorData.code
          : "HTTP_ERROR";

      const message =
        typeof errorData.message === "string" && errorData.message.trim().length > 0
          ? errorData.message
          : "Ocorreu um erro inesperado.";

      const details = Array.isArray(errorData.errors)
        ? errorData.errors.filter((item): item is string => typeof item === "string")
        : undefined;

      return Promise.reject(
        new ApiRequestError(code, message, status, details, error)
      );
    }

    if (typeof rawData === "string" && rawData.trim().length > 0) {
      return Promise.reject(
        new ApiRequestError("HTTP_ERROR", rawData, status, undefined, error)
      );
    }

    return Promise.reject(
      new ApiRequestError(
        "HTTP_ERROR",
        "Ocorreu um erro inesperado.",
        status,
        undefined,
        error
      )
    );
  }
);

export default api;