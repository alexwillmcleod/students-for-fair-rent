import { createSignal } from "solid-js";
import DawnIncomeTrivia from "./DawnIncomeTrivia";
import DawnIncomeAnswer from "./DawnIncomeAnswer";
import Introduction from "./Introduction";

export interface TriviaInformation {
  dawnIncomeSelected: number
}

export default function Quiz() {

  const [step, setStep] = createSignal<number>(0);

  
  
  const [
    triviaInformation,
    setTriviaInformation
  ] = createSignal<TriviaInformation>({
    dawnIncomeSelected: 0
  });

  const setDawnIncomeSelect = (newValue: number) => {
    setTriviaInformation({
      ...triviaInformation(),
      dawnIncomeSelected: newValue
    });
  }

  const stepArray = [
    <Introduction />,
    <DawnIncomeTrivia setSelectedValue={setDawnIncomeSelect} selectedValue={triviaInformation().dawnIncomeSelected}/>,
    <DawnIncomeAnswer selectedValue={triviaInformation().dawnIncomeSelected}/>
  ]

  const stepTitles = [
    'Introduction',
    'DawnIncomeQuestion',
    'DawnIncomeAnswer'
  ]

  const isNextStep = (): boolean => {
    if (!isFinishedStep()) return false;
    return step() + 1 < stepArray.length;
  }  

  const isFinishedStep = (): boolean => {
    switch (stepTitles[step()]) {
      case 'DawnIncomeQuestion': return triviaInformation().dawnIncomeSelected != undefined
      default: return true
    }
  }

  const isPreviousStep = (): boolean => {
    return step() > 0;
  }

  const handleNextStep = () => {
    if (!isNextStep()) return;
    setStep(step() + 1);
  }

  const handlePreviousStep = () => {
    if (!isPreviousStep()) return;
    setStep(step() - 1);
  }

  return (
    <div>
      <div class="flex flex-col w-full md:min-h-[32rem] bg-white/40 rounded-xl p-2 md:p-4">
        <div class="w-full px-4 py-8 md:p-10">
        {
          stepArray[step()]
        }     
        </div>
        <div class="flex flex-row-reverse w-full mt-auto justify-between gap-4">
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

  )
}