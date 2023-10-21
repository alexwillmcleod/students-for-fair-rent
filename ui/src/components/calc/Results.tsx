import type { CalculatorInformation, Residence } from './Calculator';
import { createEffect, createSignal } from 'solid-js';

export default function Results(props: CalculatorInformation) {

  const [debt, setDebt] = createSignal<number>(0);
  const [totalCost, setTotalCost] = createSignal<number>(0);

  const weeklyRent = (residence: Residence) => {
    switch (residence) {
      case 'Carlaw Park Stuart McCutcheon House': {
        return 355
      }
      case 'Carlaw Park Nichols': {
        return 345
      }
      case '55 Symonds': {
        return 450
      }
      case 'Te Tirohanga o te Tōangaroa': {
        return 320
      }
      case 'Waipārūrū': {
        return 510
      }
      case 'Grafton': {
        return 490
      }
      case 'University Hall Towers': {
        return 490
      }
      case 'O\'Rorke': {
        return 470
      }
    }
  }

  const totalWeeks = (isFirstYear: boolean) => {
    return isFirstYear ? 38 : 42
  }

  createEffect(() => {
    setDebt(
      props.weeklyLoanIncome * 38
    )
  });
  
  createEffect(() => {
    setTotalCost(
      weeklyRent(props.residence!) * totalWeeks(props.isFirstYear!)
    )
  })

  return (
    <div class="flex flex-col justify-center items-center gap-8 p-10">
      <p class="font-bold text-5xl">Results</p>
      <ul class="flex flex-col gap-2 list-disc ">
        <li>You will be in ${debt()} in debt</li>
        <li>You will have paid a total of ${totalCost()} in rent</li>
     </ul>
    </div>
  )
}

