interface SelectInternationalProps {
  setIsInternational: (newValue: boolean) => void;
  isInternational?: boolean;
}

export default function SelectInternational(props: SelectInternationalProps) {

  const handleSelectInternational = (e: any) => {
    props.setIsInternational(
      e.target.value == 'international'
    )
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Are you an international student?</p>
      <div class="flex flex-col gap-4">
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='yes'>International</label>
          <input onChange={handleSelectInternational} class="radio radio-primary" type='radio' id='yes' name='international' value='international' checked={props.isInternational == true}/>
        </span>
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='no'>Domestic</label>
          <input onChange={handleSelectInternational} class="radio radio-primary" type='radio' id='no' name='international' value='domestic' checked={props.isInternational == false}/>
        </span>
      </div>
    </div>
  )
}

