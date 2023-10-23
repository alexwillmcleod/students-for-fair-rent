
interface EnterWeeklyIncomeProps {
  setWeeklyIncome: (newValue: number) => void;
  weeklyIncome?: number;
}

export default function EnterWeeklyIncome(props: EnterWeeklyIncomeProps) {

  const handleSetWeeklyIncome = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    props.setWeeklyIncome(
      parsedValue
    )
  }
   return (
    <div class="flex flex-col justify-center items-center gap-4 md:gap-16">
      <p class="font-bold text-5xl">Employment</p>
      <div class="flex flex-col items-center gap-4 w-full">
        <div class="form-control w-96 max-w-xs md:max-w-md">
          <label class="label">
            <span class="label-text text-2xl">Enter your weekly income from employment</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered max-w-xs md:max-w-md text-2xl p-2" 
            onChange={handleSetWeeklyIncome} value={props.weeklyIncome != undefined ? props.weeklyIncome! : ''} />
          <label class="label">
            <span class="label-text-alt text-lg">In NZD</span>
            <span class="label-text-alt text-xs">Excluding StudyLink</span>
          </label>
        </div>
      </div>
    </div>
  )
}

