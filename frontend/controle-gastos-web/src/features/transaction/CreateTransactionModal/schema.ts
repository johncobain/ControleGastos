import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z
    .string()
    .min(1, "Informe a descrição")
    .max(255, "A descrição deve ter no máximo 255 caracteres"),

  value: z
    .number()
    .min(1, "Informe o valor")
    .positive("O valor deve ser positivo"),

  type: z.enum(["Income", "Expense"], "Selecione o tipo da transação."),

  personId: z
    .string()
    .uuid("Selecione uma pessoa.")
});

export type CreateTransactionForm =
  z.infer<typeof createTransactionSchema>;