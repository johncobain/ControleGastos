import { useEffect, useState } from "react";
import type { Person } from "../../../types/person";
import personService from "../../../services/personService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createTransactionSchema, type CreateTransactionForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
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

        <label>
          Tipo
          <select
            {...register("type")}
            className="input"
          >
            <option value="Expense">Despesa</option>
            <option value="Income">Receita</option>
          </select>
        </label>

        <label>
          Pessoa
          <select
            disabled={fixedPerson}
            {...register("personId")}
            className="input"
          >
            {!fixedPerson && (
              <>
                <option value="">Selecione uma pessoa</option>
                {people.map(person=>(
                  <option
                    key={person.id}
                    value={person.id}
                  >
                    {person.name}
                  </option>
                ))}
              </>
            )}

            {fixedPerson && (
              <option value={person.id}>
                {person.name}
              </option>
            )}
          </select>
        </label>
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