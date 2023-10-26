
interface SelectYearProps {
  setIsFirstYear: (newValue: boolean) => void;
  isFirstYear: boolean | undefined;
}

export default function SelectYear(props: SelectYearProps) {

  const handleSelectYear = (e: any) => {
    props.setIsFirstYear(
      e.target.value == 'first'
    )
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl text-display">Will 2024 be you First Year?</p>
      <div class="flex flex-col gap-4">
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='first-year'>Yes</label>
          <input onChange={handleSelectYear} class="radio radio-primary" type='radio' id='first-year' name='year' value='first' checked={props.isFirstYear == true}/>
        </span>
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='second-year-plus'>No</label>
          <input onChange={handleSelectYear} class="radio radio-primary" type='radio' id='second-year-plus' name='year' value='later' checked={props.isFirstYear == false}/>
        </span>
      </div>
    </div>
  )
}

