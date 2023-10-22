interface TriviaCardProps {
  value: string;
  color?: string;
  onSelect?: (value: string) => void;
}

export default function TriviaCard(props: TriviaCardProps) {
  return (
    <button 
      style={{
      "background-color": props.color
    }} onClick={() => {
      if (props.onSelect) props.onSelect!(props.value)
    }}>
      {props.value} 
    </button>
  )
}