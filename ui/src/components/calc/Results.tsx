import type { CalculatorInformation, Residence } from './Calculator';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import ResultCard from './ResultCard';

export default function Results(props: CalculatorInformation) {
  const annualCost = createMemo(() => weeklyRent() * totalWeeks());
  const weeklyIncome = createMemo(
    () =>
      props.weeklyIncome! + props.weeklyLoanIncome + props.weeklyAllowanceIncome
  );
  const annualIncome = createMemo(() => weeklyIncome() * totalWeeks());
  const weeklyIncomeShort = createMemo(() => weeklyRent() - weeklyIncome());
  const annualIncomeShort = createMemo(() => annualCost() - annualIncome());
  const annualLivingCostsDebt = createMemo(() => {
    const totalWeeks = 38;
    return props.weeklyLoanIncome * totalWeeks;
  });

  const weeklyRent = createMemo(() => {
    switch (props.residence!) {
      case 'Carlaw Park Stuart McCutcheon House': {
        return 355;
      }
      case 'Carlaw Park Nichols': {
        return 345;
      }
      case '55 Symonds': {
        return 450;
      }
      case 'Te Tirohanga o te Tōangaroa': {
        return 320;
      }
      case 'Waipārūrū': {
        return 510;
      }
      case 'Grafton': {
        return 490;
      }
      case 'University Hall Towers': {
        return 490;
      }
      case "O'Rorke": {
        return 470;
      }
    }
  });

  const totalWeeks = createMemo(() => (props.isFirstYear ? 38 : 42));

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Results</p>
      <div class="md:grid md:grid-cols-3 flex flex-col gap-2 list-disc ">
        <ResultCard
          when={annualLivingCostsDebt() > 0}
          color="red-600"
        >
          You will owe StudyLink <b>${annualLivingCostsDebt()}</b> for living
          costs
        </ResultCard>
        <ResultCard
          color="red-500"
          when={weeklyIncome() < weeklyRent()}
        >
          You are <b>${weeklyRent() - weeklyIncome()}</b> short of rent each
          week
        </ResultCard>
        <ResultCard
          color="red-400"
          when={annualIncome() < annualCost()}
        >
          You are <b>${annualCost() - annualIncome()}</b> short of rent and
          cannot live in halls without intergenerational wealth
        </ResultCard>
        <ResultCard color="red-300">
          You will have a paid a total of <b>${annualCost()}</b> in rent alone
        </ResultCard>
        <ResultCard
          color="red-200"
          when={props.weeklyIncome}
          // when={props.weeklyIncome != undefined && props.weeklyIncome! > 0}
        >
          <b>{Math.round((100 * weeklyRent()) / props.weeklyIncome!)}%</b> of
          your earned income will be spent on rent
        </ResultCard>
      </div>
    </div>
  );
}
