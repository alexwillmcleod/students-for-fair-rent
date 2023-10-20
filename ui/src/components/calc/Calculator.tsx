import { createSignal } from 'solid-js';
import SelectYear from './SelectYear';
import Introduction from './Introduction';
import EnterWeeklyIncome  from './EnterWeeklyIncome';

interface CalculatorInformation {
  isFirstYear: boolean,
  weeklyIncome: number
}

export default function Calculator() {

  const [step, setStep] = createSignal<number>(0);

  const [
    calculatorInformation,
    setCalculatorInformation
  ] = createSignal<CalculatorInformation>({
    isFirstYear: false,
    weeklyIncome: 0 
  });


  const setIsFirstYear = (newValue: boolean) => {
    setCalculatorInformation({
      ...calculatorInformation(),
      isFirstYear: newValue
    })
  } 
  
  const setWeeklyIncome = (newValue: number) => {
    
    setCalculatorInformation({
      ...calculatorInformation(),
      weeklyIncome: newValue
    })
  }

  const stepArray = [
    <Introduction />,
    <SelectYear setIsFirstYear={setIsFirstYear}/>,
    <EnterWeeklyIncome setWeeklyIncome={setWeeklyIncome} weeklyIncome={calculatorInformation().weeklyIncome}/>,
  ];
  const stepTitles = [
    'Introduction',
    'Year',
    'Income',
    'Hours'
  ];

  const isNextStep = (): boolean => {
    return step() + 1 < stepArray.length;
  }  

  const isPreviousStep = (): boolean => {
    return step() > 0;
  }

  const handleNextStep = () => {
    if (!isNextStep()) return;
    setStep(step() + 1);
  }

  const handlePreviousStep = () => {
    if (!isPreviousStep) return;
    setStep(step() - 1);
  }

  return (
    <div>
      <div class="flex flex-col w-full h-96 bg-white/40 rounded-xl p-4">
        <div class="w-full">
        {
          stepArray[step()]
        }     
        </div>
        <div class="flex flex-row w-full mt-auto justify-between gap-4">
          <span>
            <StepIndicator stepTitles={stepTitles} step={step()}/>
          </span>
          <span class="flex flex-row gap-4">
            <button disabled={!isPreviousStep()}  
            class="w-fit px-4 py-3 bg-accent/40 rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40" onClick={handlePreviousStep}>
              Previous Step
            </button>  
            <button disabled={!isNextStep()} 
            class="w-fit px-4 py-3 bg-accent/40 rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40" onClick={handleNextStep}>
              Next Step
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  step: number,
  stepTitles: string[]
}

function StepIndicator(props: StepIndicatorProps) {

  return (
    <ul class="steps">
      {
        props.stepTitles.map(
          (title: string, index: number) => (
            <li class={`step ${props.step >= index ? 'step-primary' : ''}`}>{title}</li>
          )
        )
      }
    </ul>
  )
}