import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Modal from "../../../components/modal";
import Input from "../../../components/input";
import Button from "../../../components/button";

import personService from "../../../services/personService";

import { createPersonSchema, type CreatePersonForm } from "./schema";

import { getErrorMessage } from "../../../utils/getErrorMessage";

interface CreatePersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePersonModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreatePersonModalProps) => {
  const today = new Date();
  const timezoneOffsetMs = today.getTimezoneOffset() * 60 * 1000;
  const maxBirthDate = new Date(today.getTime() - timezoneOffsetMs)
    .toISOString()
    .split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePersonForm>({
    resolver: zodResolver(createPersonSchema),
  });

  const onSubmit = async (data: CreatePersonForm) => {
    try {
      await personService.create(data);
      toast.success("Pessoa cadastrada");
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Pessoa"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-column gap-md"
      >
        <Input
          label="Nome"
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Data de Nascimento"
          type="date"
          id="birthDate"
          lang="pt-BR"
          max={maxBirthDate}
          {...register("birthDate")}
          error={errors.birthDate?.message}
        />

        <div className="flex justify-end gap-md">
          <Button
            type="button"
            variant="error"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            loading={isSubmitting}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreatePersonModal;