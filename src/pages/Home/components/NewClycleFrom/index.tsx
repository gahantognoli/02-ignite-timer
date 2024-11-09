import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const newClycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo de no mínimo 1 minuto")
    .max(60, "O ciclo de no máximo 60 minutos"),
});

type NewClycleFormData = zod.infer<typeof newClycleFormValidationSchema>;

export function NewClycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewClycleFormData>({
    resolver: zodResolver(newClycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmount", {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
