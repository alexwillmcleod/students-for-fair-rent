import type { Accessor } from 'solid-js';
import type { PossibleTabs } from './Game';

const PossibleTabsList: PossibleTabs[] = [
  'Accommodation Portal',
  'Canvas',
  'Work',
  'The Bank',
];

export interface BlankTabProps {
  openNewTab: (tabName?: PossibleTabs) => void;
  closeTab: (index: number) => void;
  selectedTab: Accessor<number | null>;
}

export default function BlankTab({
  openNewTab,
  closeTab,
  selectedTab,
}: BlankTabProps) {
  return (
    <div class="w-full h-full flex flex-col justify-center items-center p-12 gap-4">
      <img
        width={300}
        src="images/froogle.webp"
        class="rounded-xl"
      />
      <h3 class="text-3xl">Your Shortcuts</h3>
      <div class="flex flex-col gap-2">
        {PossibleTabsList.map((element, index) => (
          <div class="flex flex-row justify-center w-full text-center rounded-md bg-slate-200/30">
            <button
              class="w-full py-2 px-4"
              onClick={() => {
                if (selectedTab() != null) {
                  closeTab(selectedTab()!);
                }
                openNewTab(element);
              }}
            >
              {element}
            </button>
          </div>
        ))}
        <div class="flex flex-row justify-center w-full text-center rounded-md bg-slate-200/30">
          <a
            target="_blank"
            href="/"
            class="w-full py-2 px-4 cursor-pointer"
          >
            Students for Fair Rent Website
          </a>
        </div>
      </div>
    </div>
  );
}
