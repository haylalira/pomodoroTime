import { HandPalm, Play } from "phosphor-react";

import {
         ButtonContainerStart,
         ButtonContainerStop,
         CountdownContainer,
         FormContainer,
         HomerContainer, 
         MinutesAmountInput, 
         Separator, 
         TaskInput } from "./styles";

import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { z }from 'zod'
import { useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns'

const newCycleValidationFormSchema = z.object({
task: z.string().nonempty('informe a tarefa').min(1, 'informe a tarefa'),
minutesAmount:z.number().min(5,' o ciclo precisa ser de no mínimo 5 minutos').max(60,'O ciclo precisa ser de no máximo 60 minutos.')
})

type newCycleFormData = z.infer<typeof newCycleValidationFormSchema>


interface Cycle {
 id: string;
 task:string;
 minutesAmount:number ;
 startData: Date;
 interruptedDate?: Date



}


export function Home(){
const [cycles, setCycles]= useState<Cycle[]>([]);
const [activeCycleId, setActiveCycleId] = useState<string | null >(null)
const [amountSecondsPassed , setAmoutSecondsPassed] = useState(0)

const{ register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
    resolver:zodResolver(newCycleValidationFormSchema),
    defaultValues:{
        task:'',
        minutesAmount:0
    }
 
})

function HandleCreateNewCycle(data: newCycleFormData){
    const newCyle: Cycle ={
     id: String(new Date().getTime()),
     task: data.task,
     minutesAmount: data.minutesAmount,
     startData: new Date(),
    }

     
    setCycles(state => [...state, newCyle])
    setActiveCycleId(newCyle.id)
    setAmoutSecondsPassed(0)
     reset();
}
const activeCycle = cycles.find((cycle )=> cycle.id === activeCycleId )
useEffect(()=>{
    let interval: number
    if(activeCycle){
        interval = setInterval(()=>{
            setAmoutSecondsPassed(differenceInSeconds(new Date(), activeCycle.startData))
        }, 1000)
    }
    return()=>{
        clearInterval(interval)
    }
},[activeCycle])



function HandleInterruptedCycle (){
    
    setCycles(
        cycles.map((cycle)=>{
            if(cycle.id === activeCycleId){
                return { ...cycle, interruptedDate: new Date()
         } } else{ return cycle}
           
        })
    )
    setActiveCycleId(null)
}
const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

const minutesAmout = Math.floor(currentSeconds / 60);
const secondsAmout = currentSeconds % 60

const minutes = String(minutesAmout).padStart(2,'0')
const seconds = String(secondsAmout).padStart(2,'0')

useEffect(()=>{
    if(activeCycle){  document.title =`${minutes}:${seconds}`}
  
},[minutes,seconds,activeCycle])

const task = watch('task')
const isSubmitDisable = !task

return(
<HomerContainer>
<form onSubmit={handleSubmit(HandleCreateNewCycle)} action="">
 <FormContainer>
 
 <label htmlFor="task"> Vou trabalhar em </label>

    <TaskInput 
     id="task"
     list="taskSuggestion"
     disabled={!!activeCycle}
     placeholder="Dê um nome para o seu projeto"
      {...register('task')}
    />
    
    <datalist id="taskSuggestion">
        <option value="projeto 1"></option>
        <option value="projeto 2"></option>
        <option value="projeto 3"></option>
        <option value="projeto 4"></option>
    </datalist>

    <label htmlFor="minutesAmount">durante</label>


    <MinutesAmountInput 
    type="number" 
    id="minutesAmount"
     placeholder="00"
     step={5}
     min={5}
     max={60}
     disabled={!!activeCycle}
     {...register('minutesAmount',{ valueAsNumber:true})}/>

    <span>minutos.</span>
    </FormContainer>
    
    <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
    </CountdownContainer>

    {activeCycle ? (<ButtonContainerStop onClick={HandleInterruptedCycle} type="button">
        <HandPalm size={24}/>
        Interromper
        
    </ButtonContainerStop>
   ): (
        
        <ButtonContainerStart disabled={isSubmitDisable} type="submit">
        <Play size={24}/>
        começar
        
    </ButtonContainerStart>
   )}
    
   
    </form>
</HomerContainer>
)
}