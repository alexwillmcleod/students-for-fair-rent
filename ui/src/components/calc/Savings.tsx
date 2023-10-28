
interface EnterSavingsProps {
  setSavings: (newValue: number) => void;
  savings?: number;
}

export default function EnterSavings(props: EnterSavingsProps) {

  const handleSetSavings = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    props.setSavings(
      parsedValue
    )
  }
   return (
    <div class="flex flex-col justify-center items-center gap-4 md:gap-16">
      <p class="font-bold text-5xl font-display">Savings</p>
      <div class="flex flex-col items-center gap-4 w-full">
        <div class="form-control w-96 max-w-xs md:max-w-md">
          <label class="label">
            <span class="label-text text-2xl">Enter your savings</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered max-w-xs md:max-w-md text-2xl p-2" 
            onChange={handleSetSavings} value={props.savings != undefined ? props.savings! : ''} />
          <label class="label">
            <span class="label-text-alt text-lg">In NZD</span>
          </label>
        </div>
      </div>
    </div>
  )
}

