import type { CalculatorInformation, Residence } from './Calculator';
import { createEffect, createSignal, Show } from 'solid-js';
import ResultCard from './ResultCard';

export default function Results(props: CalculatorInformation) {

  const [debt, setDebt] = createSignal<number>(0);
  const [totalCost, setTotalCost] = createSignal<number>(0);
  const [totalRent, setTotalRent] = createSignal<number>(0);
  const [totalIncome, setTotalIncome] = createSignal<number>(0);

  const tuition = (isInternational?: boolean, isFeesFree?: boolean) => (
    isFeesFree ? 0 : isInternational ? 40_000 : 8_000
  )

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
    const totalStudyPeriodWeeks = 38;
    const maximumDebt = props.weeklyLoanIncome * totalStudyPeriodWeeks + 
    (props.isInternationalStudent ? tuition(props.isInternationalStudent, props.isFeesFree) : 0)
    setDebt(
      Math.min(maximumDebt, 
        totalCost() - 
        (((props.weeklyAllowanceIncome + (props.weeklyIncome || 0))) * totalStudyPeriodWeeks) - 
        props.savings - 
        (props.weeklyIncome || 0 * totalStudyPeriodWeeks))
    )
  });
  
  createEffect(() => {
    setTotalRent(
      weeklyRent(props.residence!) * totalWeeks(props.isFirstYear!)
    )
    setTotalCost(
      (weeklyRent(props.residence!) * totalWeeks(props.isFirstYear!)) + tuition(props.isInternationalStudent, props.isFeesFree) 
    )
  })

  createEffect(() => {
    setTotalIncome(
      props.weeklyIncome! * totalWeeks(props.isFirstYear!)  
    )
  })

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Results</p>
      <div class="md:grid md:grid-cols-3 flex flex-col gap-2 list-disc ">
        {/* <ResultCard value={`You will be in $${debt()} in debt`} color="red-500"/> */}
        {/* <ResultCard value={`You will have paid a total of $${totalCost()} in rent`}/> */}
        <Show when={debt() > 0}>
          <ResultCard color="red-400">
            You will be <b>${debt()}</b> in debt
          </ResultCard>
        </Show>

        <ResultCard color="red-300">
          You will have a paid a total of <b>${totalRent()}</b> in rent alone
        </ResultCard>
        <Show when={props.weeklyIncome}>
          <ResultCard color="red-200">
            <b>{100 * (Math.round(weeklyRent(props.residence!)/props.weeklyIncome!))}%</b> of your earned income will be spent on rent 
          </ResultCard>
        </Show>
        <Show when={props.savings > 0}>
          <ResultCard color="green-200">
            You will have <b>${Math.max(props.savings - totalCost(), 0)}</b> in savings left
          </ResultCard>
        </Show>
     </div>
    </div>
  )
}

