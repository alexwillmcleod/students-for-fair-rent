import { Show } from 'solid-js';
import type { Residence } from './Calculator';
import Select from '../Select';
import type { SelectOption } from '../Select';

interface SelectResidenceProps {
  setResidence: (newResidence: Residence) => void;
  residence?: Residence;
  isFirstYear: boolean;
}

export default function SelectResidence(props: SelectResidenceProps) {
  const firstYearHalls: Residence[] = [
    "O'Rorke",
    'Waipārūrū',
    'Grafton',
    'University Hall Towers',
  ];

  const secondYearHalls: Residence[] = [
    'Carlaw Park Stuart McCutcheon House',
    'Carlaw Park Nicholls',
    'Te Tirohanga o te Tōangaroa',
    '55 Symonds',
  ];

  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-bold text-5xl font-display">Select Residence</p>
      <div class="flex flex-col gap-4">
        <Show when={props.isFirstYear}>
          <Select
            options={firstYearHalls}
            onChange={props.setResidence}
            value={props.residence}
          />
        </Show>
        <Show when={!props.isFirstYear}>
          <Select
            options={secondYearHalls}
            onChange={props.setResidence}
            value={props.residence}
          />
        </Show>
      </div>
    </div>
  );
}
