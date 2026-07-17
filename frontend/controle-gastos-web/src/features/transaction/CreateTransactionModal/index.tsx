import { useEffect, useState } from "react";
import type { Person } from "../../../types/person";
import personService from "../../../services/personService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createTransactionSchema, type CreateTransactionForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import transactionService from "../../../services/transactionService";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import type { PersonSummary } from "../../../types/summary";
import Button from "../../../components/button";

interface CreateTransactionModalProps {
  isOpen:boolean;
  onClose:()=>void;
  onSuccess:()=>void;
  person?:PersonSummary;
}

const CreateTransactionModal = ({
  isOpen,
  onClose,
  onSuccess,
  person,
}:CreateTransactionModalProps) => {
  const [people, setPeople] = useState<Person[]>([]);

  const fixedPerson = !!person;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues:{
      personId:person?.id ?? "",
      type:"Expense"
    }
  });

  const onSubmit = async (data:CreateTransactionForm)=>{
    try{
      await transactionService.create(data);
      toast.success("Despesa cadastrada");
      reset();
      await onSuccess();
      onClose();
    }catch(error){
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(()=>{
    if(!isOpen)
      return;
    if(fixedPerson)
      return;

    personService
      .getAll()
      .then(setPeople)
      .catch(error=>{
        toast.error(
          getErrorMessage(error)
        );
      });
  },[
    isOpen,
    fixedPerson
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={()=>{onClose();reset();}}
      title="Nova Transação"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-column gap-md"
      >
        <Input
          label="Descrição"
          id="description"
          {...register("description")}
          error={errors.description?.message}
        />

        <Input
          label="Valor"
          type="number"
          id="amount"
          step="0.01"
          min="0"
          {...register("value", { valueAsNumber: true })}
          error={errors.value?.message}
        />

        <Input
          label="Tipo"
          id="type"
          options={[
            { value: "Income", label: "Receita" },
            { value: "Expense", label: "Despesa" },
          ]}
          {...register("type")}
          error={errors.type?.message}
        />

        <Input
          label="Pessoa"
          id="person"
          disabled={fixedPerson}
          options={
            fixedPerson && person
              ? [{ value: person.id, label: person.name }]
              : [
                { value: "", label: "Selecione uma pessoa" },
                ...people.map(p => ({ value: p.id, label: p.name }))
              ]
          }
          {...register("personId")}
          error={errors.personId?.message}
        />
        <div className="flex justify-between mt-md">
          <Button
            variant="error"
            type="button"
            onClick={()=>{
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
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateTransactionModal;