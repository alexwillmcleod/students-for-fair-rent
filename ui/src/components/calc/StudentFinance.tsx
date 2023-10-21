
interface StudentFinanceProps {
  setWeeklyAllowanceIncome: (newValue: number) => void;
  setWeeklyLoanIncome: (newValue: number) => void;
  weeklyAllowanceIncome: number,
  weeklyLoanIncome: number,
}

export default function StudentFinance(props: StudentFinanceProps) {

  const handleChangeStudentAllowance = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    props.setWeeklyAllowanceIncome(
      parsedValue
    )
  }

  const handleChangeStudentLoan = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    props.setWeeklyLoanIncome(
      parsedValue
    )
  }
  return (
    <div class="flex flex-col justify-center items-center gap-8 p-10">
      <p class="font-bold text-5xl">How much StudyLink assistance do you get?</p>
      <div class="flex flex-col gap-4">
        <span class="flex flex-col gap-4 items-center">
          <p>How much weekly Student Allowance do you receive for living costs?</p>
          <div class="flex flex-row gap-4">
            <input type="range" min={0} max={300} value={props.weeklyAllowanceIncome} class="range range-md range-success w-64 md:w-96" onChange={handleChangeStudentAllowance}/> 
            <p>${props.weeklyAllowanceIncome}</p>
          </div>
        </span>
        <span class="flex flex-col gap-4 items-center">
          <p>How much weekly Student Loan do you take out for living costs?</p>
          <div class="flex flex-row gap-4">
            <input type="range" min={0} max={300} value={props.weeklyLoanIncome} class="range range-md range-error w-64 md:w-96" onChange={handleChangeStudentLoan}/> 
            <p>${props.weeklyLoanIncome}</p>
          </div>
        </span>
      </div>
    </div>
  )
}

