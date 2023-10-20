
interface SelectYearProps {
  setIsFirstYear: (newValue: boolean) => void;
}

export default function SelectYear(props: SelectYearProps) {

  const handleSelectYear = (e: any) => {
    props.setIsFirstYear(
      e.target.value == 'first'
    )
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8 p-10">
      <p class="font-bold text-5xl">What Year will you be in 2024?</p>
      <div class="flex flex-col gap-4">
        <span class="flex flex-row gap-4 items-center">
          <label class="text-3xl" for='first-year'>First Year</label>
          <input onChange={handleSelectYear} class="radio radio-primary" type='radio' id='first-year' name='year' value='first'/>
        </span>
        <span class="flex flex-row gap-4 items-center">
          <label class="text-3xl" for='second-year-plus'>Second Year +</label>
          <input onChange={handleSelectYear} class="radio radio-primary" type='radio' id='second-year-plus' name='year' value='later'/>
        </span>
      </div>
    </div>
  )
}

