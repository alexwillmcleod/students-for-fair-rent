
interface EnterWeeklyIncomeProps {
  setWeeklyIncome: (newValue: number) => void;
  weeklyIncome?: number;
  setWeeklyWorkingHours: (newValue: number) => void;
  weeklyWorkingHours?: number;
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
  
  const handleSetWeeklyWorkingHours = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    if (parsedValue > 100) return;
    if (parsedValue < 0) return;
    props.setWeeklyWorkingHours(
      parsedValue
    )
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl">Employment</p>
      <div class="flex flex-col gap-4">
        <div class="form-control w-96">
          <label class="label">
            <span class="label-text text-2xl">Enter your weekly income</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-md text-2xl p-2" 
            onChange={handleSetWeeklyIncome} value={props.weeklyIncome != undefined ? props.weeklyIncome! : ''} />
          <label class="label">
            <span class="label-text-alt text-lg">In NZD</span>
            <span class="label-text-alt text-xs">Excluding StudyLink</span>
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="form-control w-96">
          <label class="label">
            <span class="label-text text-2xl">Enter the number of hours you work per week</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-md text-2xl p-2" 
            onChange={handleSetWeeklyWorkingHours} value={props.weeklyWorkingHours != undefined ? props.weeklyWorkingHours! : ''} />
          <label class="label">
            <span class="label-text-alt text-lg">Less than 100</span>
            {/* <span class="label-text-alt text-xs"></span> */}
          </label>
        </div>
      </div>
    </div>
  )
}

