
interface EnterWeeklyIncomeProps {
  setWeeklyIncome: (newValue: number) => void;
  weeklyIncome: number;
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
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl">What is your Weekly Income</p>
      <div class="flex flex-col gap-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            {/* <span class="label-text">Enter your hourly wage</span> */}
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs text-2xl p-2" 
            onChange={handleSetWeeklyIncome} value={props.weeklyIncome} />
          <label class="label">
            <span class="label-text-alt text-lg">In NZD</span>
            <span class="label-text-alt text-xs">Excluding StudyLink</span>
          </label>
        </div>
      </div>
    </div>
  )
}

