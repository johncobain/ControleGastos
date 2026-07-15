import { z } from "zod";

const isNotFutureDate = (value: string) => {
  const birthDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return birthDate <= today;
};

export const createPersonSchema = z.object({
  name: z
    .string()
    .min(1, "Informe o nome")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  birthDate: z
    .string()
    .min(1, "Informe a data de nascimento")
    .refine(isNotFutureDate, "A data de nascimento não pode ser posterior ao dia atual")
});

export type CreatePersonForm = z.infer<typeof createPersonSchema>;