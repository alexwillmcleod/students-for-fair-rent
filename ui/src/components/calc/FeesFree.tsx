interface SelectFeesFreeProps {
  setIsFeesFree: (newValue: boolean) => void;
  isFeesFree?: boolean;
}

export default function SelectFeesFree(props: SelectFeesFreeProps) {

  const handleSelectFeesFree = (e: any) => {
    props.setIsFeesFree(
      e.target.value == 'yes'
    )
  }

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Will you be fees free?</p>
      <div class="flex flex-col gap-4">
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='yes'>Yes</label>
          <input onChange={handleSelectFeesFree} class="radio radio-primary" type='radio' id='yes' name='fees-free' value='yes' checked={props.isFeesFree == true}/>
        </span>
        <span class="flex flex-row gap-4 items-center">
          <label class="text-xl" for='no'>No</label>
          <input onChange={handleSelectFeesFree} class="radio radio-primary" type='radio' id='no' name='fees-free' value='no' checked={props.isFeesFree == false}/>
        </span>
      </div>
    </div>
  )
}

