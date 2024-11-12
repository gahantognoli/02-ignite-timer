import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { NewClycleForm } from "./components/NewClycleFrom";
import { Countdown } from "./components/Countdown";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CycleContext";

const newClycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo de no mínimo 1 minuto")
    .max(60, "O ciclo de no máximo 60 minutos"),
});

type NewClycleFormData = zod.infer<typeof newClycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interruptClycle, activeCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewClycleFormData>({
    resolver: zodResolver(newClycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;
  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewClycleFormData){
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewClycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptClycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
