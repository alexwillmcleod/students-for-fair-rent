import { onCleanup, type JSXElement, type JSX } from "solid-js";
import { createSignal, Show } from "solid-js";
import type { Residence } from "./calc/Calculator";

interface SelectProps<T extends string> {
  onChange?: (newValue: T) => void;
  value?: T;
  options: T[];
}

export default function Select<T extends string>(props: SelectProps<T>) {
  
  const [isOpen, setIsOpen] = createSignal<boolean>(false); 

  const handleSelect = (element: T) => {
    if (!props.onChange) return;
    props.onChange!(element)
    setIsOpen(false);
  }

  // const handleClickOutside = (e: any) => {
  //   if (isOpen() && e.target.closest(".custom-select")) {
  //     setIsOpen(false);
  //   }
  // }
  
  // document.addEventListener('click', handleClickOutside);
  // onCleanup(() => document.removeEventListener('click', handleClickOutside));

  return (
    <div class="flex flex-col justify-center items-center relative">
      <button class="flex flex-row gap-4 justify-center items-center md:w-64 text-ellipsis shadow-xl rounded-xl p-4 bg-white/40" onClick={() => setIsOpen(!isOpen())}>
        {props.value || 'Select an option'} 
        <img class="w-4" src="/images/down-dropdown.svg" />
      </button>
      <Show when={isOpen()}>
        <ul class="transition-all bg-white/50 backdrop-blur-lg shadow-xl rounded-xl flex flex-col justify-center items-center absolute top-full">
          {
            props.options?.map((element: T) => {
              return (<li class="w-full">
                <button 
                  class="w-full p-3 cursor-pointer transition-all hover:bg-accent/30"
                  onClick={() => handleSelect(element)}   
                >
                  {element as string}
                </button>
              </li>)
            })
          }
        </ul>
      </Show>
    </div>
  )
}

