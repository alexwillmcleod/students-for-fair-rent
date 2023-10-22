import type { CalculatorInformation, Residence } from '../calc/Calculator';
import { createEffect, createSignal } from 'solid-js';
import TriviaCard from './TriviaCard';

interface DawnIncomeTriviaProps {
  selectedValue: number,
  setSelectedValue: (newValue: number) => void;
}

export default function DawnIncomeTrivia(props: DawnIncomeTriviaProps) {

  const handleSelectValue = (newValue: string) => {
    console.log(`Selecting ${newValue}`)
    try {
      props.setSelectedValue(parseInt(newValue.replace(",", "")));
    } catch (err) {
      console.error(err);
      return;
    }
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl">Trivia Question</p>
      <div class="flex flex-col gap-2 items-center">
        <h2 class="text-2xl text-primary">University Vice-Chancellor Dawn Freshwater has a weekly income of?</h2>
        <div class="grid grid-cols-2 gap-4 w-fit">
          <TriviaCard value="14,519" isSelected={props.selectedValue == 14519} onSelect={handleSelectValue} /> 
          <TriviaCard value="5,285" isSelected={props.selectedValue == 5285} onSelect={handleSelectValue} /> 
          <TriviaCard value="10,254" isSelected={props.selectedValue == 10254} onSelect={handleSelectValue} /> 
          <TriviaCard value="20,856" isSelected={props.selectedValue == 20856} onSelect={handleSelectValue} /> 
        </div>
     </div>
    </div>
  )
}

