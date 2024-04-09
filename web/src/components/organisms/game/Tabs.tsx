import { getImage } from 'astro:assets';
import sfrBackgroundImage from '../../../assets/sfr-background.png';
import type { Accessor, Signal } from 'solid-js';
const optimisedSfrBackgroundImage = await getImage({ src: sfrBackgroundImage });

export interface TabsProps {
  names: Accessor<string[]>;
  selectedName: Accessor<number | null>;
  onChange: (index: number) => void;
  openNewTab: () => void;
  closeTab: (index: number) => void;
}

export default function Tabs({
  names,
  onChange,
  selectedName,
  openNewTab,
  closeTab,
}: TabsProps) {
  const closeTabPreventDefault = (e: any, index: number) => {
    e.preventDefault();
    closeTab(index);
  };

  return (
    <div class="w-full h-screen overflow-y-auto max-h-screen bg-cover bg-fixed">
      <div
        class="flex flex-col w-full p-6 rounded-md gap-8 bg-cover bg-fixed overflow-y-auto max-h-screen h-full"
        style={`background-image:  url(${optimisedSfrBackgroundImage.src})`}
      >
        <button
          onClick={() => openNewTab()}
          class="w-full text-center py-2 px-4 rounded-md bg-white/40"
        >
          New Tab +
        </button>
        <hr class=" border-black/40" />
        <div class="flex flex-col gap-4">
          {names().map((element, index) => (
            <div
              class={`flex flex-row justify-center w-full text-center rounded-md ${
                selectedName() == index ? 'bg-blue-300/40' : 'bg-white/40'
              }`}
            >
              <button
                class="w-full py-2 px-4"
                onClick={() => onChange(index)}
              >
                {element}
              </button>
              <button
                onClick={(e) => closeTabPreventDefault(e, index)}
                class="py-2 px-4"
              >
                ⨯
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
