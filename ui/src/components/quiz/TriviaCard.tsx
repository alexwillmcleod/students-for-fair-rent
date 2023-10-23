interface TriviaCardProps {
  value: string;
  onSelect?: (value: string) => void;
  isSelected?: boolean;
}

export default function TriviaCard(props: TriviaCardProps) {
  return (
    <button 
      onClick={() => {
      if (props.onSelect) props.onSelect!(props.value)
    }}
    class={`w-36 aspect-square transition-all rounded-xl text-2xl bg-${(props.isSelected) ? 'blue-400/40' : 'accent/40'}`} 
    >
      {props.value} 
    </button>
  )
}