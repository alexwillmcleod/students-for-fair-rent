import type { CalculatorInformation, Residence } from './Calculator';
import { createEffect, createSignal } from 'solid-js';

export default function Results(props: CalculatorInformation) {

    return (
    <div class="flex flex-col justify-center items-center gap-8 p-10">
      <p class="font-bold text-5xl">Quiz Question</p>
      <div class="flex flex-col gap-2">
        Dawn Freshwater has a weekly income of?
        
     </div>
    </div>
  )
}

