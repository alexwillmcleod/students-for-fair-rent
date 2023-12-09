import { Show, type JSXElement } from 'solid-js';

interface ResultCardProps {
  children?: JSXElement;
  color?: string;
  when?: any | boolean | null | undefined | false;
}

export default function ResultCard(props: ResultCardProps) {
  const color = props.color || 'accent';
  return (
    <Show when={props.when}>
      <div
        class={`w-full md:w-48 md:aspect-square transition-all rounded-xl p-4 backdrop-blur-xl text-2xl bg-accent/40 bg-${color}/30`}
      >
        {props.children}
      </div>
    </Show>
  );
}
