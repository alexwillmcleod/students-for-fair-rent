import type { CalculatorInformation, Residence } from '../calc/Calculator';
import { createEffect, createSignal } from 'solid-js';

interface DawnIncomeAnswerProps {
  selectedValue: number,
}

export default function DawnIncomeAnswer(props: DawnIncomeAnswerProps) {

  const correctAnswer = 14519;
  const dawnAnnualIncome = 755000

  return (
    <div class="flex flex-col justify-center items-center gap-8 ">
      <p class="font-bold text-5xl">Trivia Question</p>
      <div class="flex flex-col gap-2 items-center">
        {/* <h2 class="text-2xl text-primary">Dawn Freshwater has a weekly income of?</h2> */}
        <p class="text-3xl font-medium">{
          (props.selectedValue == correctAnswer) ? 
            "Correct!"
            :
            `Incorrect! You Selected ${props.selectedValue}`
        }
        </p>
        <p class="text-xl">Vice-Chancellor Dawn Freshwater earns <b>{correctAnswer}</b> every week and <b>{dawnAnnualIncome}</b> per year!</p>
        <p class="text-xl">Thats enough to rent out an entire floor of Waipārūrū just for herself</p>
        <p class="text-xl">She is the highest paid public servant in the country - as if she serves the public at all</p>

     </div>
    </div>
  )
}

