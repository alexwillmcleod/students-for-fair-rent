import type { CalculatorInformation, Residence } from './Calculator';
import { createEffect, createSignal, Show } from 'solid-js';
import ResultCard from './ResultCard';

export default function Results(props: CalculatorInformation) {
  const [totalCost, setTotalCost] = createSignal<number>(0);
  const [totalIncome, setTotalIncome] = createSignal<number>(0);
  const [weeklyFinance, setWeeklyFinance] = createSignal<number>(0);
  const [totalLivingCostsDebt, setTotalLivingCostsDebt] =
    createSignal<number>(0);

  /* 
    This is the total finance available to the tauira
    Including income from loans, income from work, and loans
  */
  const [totalFinance, setTotalFinance] = createSignal<number>(0);

  const weeklyRent = (residence: Residence) => {
    switch (residence) {
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
  };

  const totalWeeks = (isFirstYear: boolean) => {
    return isFirstYear ? 38 : 42;
  };

  createEffect(() => {
    setTotalCost(weeklyRent(props.residence!) * totalWeeks(props.isFirstYear!));
  });

  createEffect(() => {
    setTotalIncome(props.weeklyIncome! * totalWeeks(props.isFirstYear!));
  });

  createEffect(() => {
    const totalWorkIncome =
      props.weeklyIncome! * totalWeeks(props.isFirstYear!);
    const academicWeeks = 38;
    const totalLoanIncome = props.weeklyLoanIncome * academicWeeks;
    const totalAllowanceIncome = props.weeklyAllowanceIncome * academicWeeks;
    setTotalFinance(
      totalWorkIncome + totalLoanIncome + props.savings! + totalAllowanceIncome
    );
  });

  createEffect(() => {
    setWeeklyFinance(
      props.weeklyIncome! +
        props.weeklyLoanIncome! +
        props.weeklyAllowanceIncome!
    );
  });

  createEffect(() => {
    setTotalLivingCostsDebt(props.weeklyLoanIncome! * 38);
  });

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Results</p>
      <div class="md:grid md:grid-cols-3 flex flex-col gap-2 list-disc ">
        <ResultCard
          when={totalLivingCostsDebt() > 0}
          color="red-600"
        >
          You will owe StudyLink <b>${totalLivingCostsDebt()}</b> (just for
          living costs)
          <Show
            when={totalLivingCostsDebt() - (totalFinance() - totalCost()) > 0}
          >
            {' '}
            and after repaying you will still owe{' '}
            <b>
              ${totalLivingCostsDebt() - (totalFinance() - totalCost())}
            </b>{' '}
          </Show>
        </ResultCard>
        <ResultCard
          color="red-500"
          when={weeklyFinance() < weeklyRent(props.residence!)}
        >
          You are <b>${weeklyRent(props.residence!) - weeklyFinance()}</b> short
          of rent each week
        </ResultCard>
        <ResultCard
          color="red-400"
          when={totalFinance() < totalCost()}
        >
          You are <b>${totalCost() - totalFinance()}</b> short of rent and
          cannot live in halls
        </ResultCard>
        <ResultCard color="red-300">
          You will have a paid a total of <b>${totalCost()}</b> in rent alone
        </ResultCard>
        <ResultCard
          color="red-200"
          when={props.weeklyIncome}
          // when={props.weeklyIncome != undefined && props.weeklyIncome! > 0}
        >
          <b>
            {100 *
              Math.round(weeklyRent(props.residence!) / props.weeklyIncome!)}
            %
          </b>{' '}
          of your earned income will be spent on rent
        </ResultCard>
      </div>
    </div>
  );
}
