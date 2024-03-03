import { createSignal } from 'solid-js';
import SelectYear from '@molecules/CalculatorSelectYear';
import Introduction from '@molecules/CalculatorIntroduction';
import EnterWeeklyIncome from '@molecules/CalculatorEnterWeeklyIncome';
import StudentFinance from '@molecules/CalculatorStudentFinance';
import Results from '@molecules/CalculatorResults';
import SelectResidence from '@molecules/CalculatorSelectResidence';

export type Residence =
  | "O'Rorke"
  | 'Waipārūrū'
  | 'University Hall Towers'
  | 'Grafton'
  | 'Carlaw Park Stuart McCutcheon House'
  | 'Carlaw Park Nicholls'
  | 'Te Tirohanga o te Tōangaroa'
  | '55 Symonds';

export interface CalculatorInformation {
  isFirstYear?: boolean;
  residence?: Residence;
  weeklyIncome?: number;
  weeklyAllowanceIncome: number;
  weeklyLoanIncome: number;
}

export default function Calculator() {
  const [step, setStep] = createSignal<number>(0);

  const [calculatorInformation, setCalculatorInformation] =
    createSignal<CalculatorInformation>({
      isFirstYear: undefined,
      weeklyIncome: undefined,
      weeklyLoanIncome: 0,
      weeklyAllowanceIncome: 0,
      residence: undefined,
    });

  const handleChange = (name: string, newValue: any) => {
    setCalculatorInformation({
      ...calculatorInformation(),
      [name]: newValue,
    });
  };
  const stepArray = [
    <Introduction />,
    <SelectYear
      setIsFirstYear={(newValue) => {
        handleChange('isFirstYear', newValue);
        handleChange('residence', undefined);
      }}
      isFirstYear={calculatorInformation().isFirstYear}
    />,
    <SelectResidence
      isFirstYear={calculatorInformation().isFirstYear!}
      setResidence={(newValue) => handleChange('residence', newValue)}
      residence={calculatorInformation().residence}
    />,
    <EnterWeeklyIncome
      setWeeklyIncome={(newValue) => handleChange('weeklyIncome', newValue)}
      weeklyIncome={calculatorInformation().weeklyIncome}
    />,
    <StudentFinance
      setWeeklyAllowanceIncome={(newValue) =>
        handleChange('weeklyAllowanceIncome', newValue)
      }
      setWeeklyLoanIncome={(newValue) =>
        handleChange('weeklyLoanIncome', newValue)
      }
      weeklyAllowanceIncome={calculatorInformation().weeklyAllowanceIncome}
      weeklyLoanIncome={calculatorInformation().weeklyLoanIncome}
    />,
    <Results {...calculatorInformation()} />,
  ];
  const stepTitles = [
    'Introduction',
    'Year',
    'Residence',
    'Income',
    'StudyLink',
    'Results',
  ];

  const isNextStep = (): boolean => {
    if (!isFinishedStep()) return false;
    return step() + 1 < stepArray.length;
  };

  const isFinishedStep = (): boolean => {
    switch (stepTitles[step()]) {
      case 'Year':
        return calculatorInformation().isFirstYear != undefined;
      case 'Residence':
        return calculatorInformation().residence != undefined;
      case 'Income':
        return calculatorInformation().weeklyIncome != undefined;
      default:
        return true;
    }
  };

  const isPreviousStep = (): boolean => {
    return step() > 0;
  };

  const handleNextStep = () => {
    if (!isNextStep()) return;
    setStep(step() + 1);
  };

  const handlePreviousStep = () => {
    if (!isPreviousStep()) return;
    setStep(step() - 1);
  };

  return (
    <div>
      <div class="flex flex-col w-full md:min-h-[32rem] bg-white/40 rounded-xl p-4">
        <div class="w-full p-4 pb-10 md:p-10">{stepArray[step()]}</div>
        <div class="flex flex-row w-full mt-auto justify-between gap-4">
          <span>
            <StepIndicator
              stepTitles={stepTitles}
              step={step()}
            />
          </span>
          <span class="flex flex-row gap-4">
            <button
              disabled={!isPreviousStep()}
              class="w-fit px-4 py-3 bg-accent/40 rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40"
              onClick={handlePreviousStep}
            >
              Previous Step
            </button>
            <button
              disabled={!isNextStep()}
              class="w-fit px-4 py-3 bg-accent/40 rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40"
              onClick={handleNextStep}
            >
              Next Step
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  step: number;
  stepTitles: string[];
}

function StepIndicator(props: StepIndicatorProps) {
  return (
    <ul class="steps hidden md:flex">
      {props.stepTitles.map((title: string, index: number) => (
        <li class={`step ${props.step >= index ? 'step-primary' : ''}`}>
          {title}
        </li>
      ))}
    </ul>
  );
}
