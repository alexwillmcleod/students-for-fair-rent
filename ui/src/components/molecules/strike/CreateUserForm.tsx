import Select from '@atoms/Select';
import type { Residence } from '@organisms/Calculator';
import type { Accessor } from 'solid-js';
import type { StrikeData } from './StrikeForm';

const halls: Residence[] = [
  "O'Rorke",
  'Waipārūrū',
  'Grafton',
  'University Hall Towers',
  'Carlaw Park Stuart McCutcheon House',
  'Carlaw Park Nicholls',
  'Te Tirohanga o te Tōangaroa',
  '55 Symonds',
];

function TextInput({
  textLabel,
  name,
  onChange,
  data,
  errors,
}: {
  textLabel: string;
  name: string;
  onChange: any;
  data?: Accessor<StrikeData>;
  errors: any;
}) {
  return (
    <div class="flex flex-col">
      <label
        class="font-sans text-white text-xl"
        for={name}
      >
        {textLabel}
      </label>
      <input
        class="input"
        onChange={onChange}
        name={name}
        value={(data && data() && (data() as Record<string, any>)[name]) || ''}
      ></input>
      <p class="text-white">
        {(errors && errors() && errors()[name]?._errors) || ''}
      </p>
    </div>
  );
}

export default function CreateUserForm({
  handleChange,
  strikeData,
  errors,
}: {
  handleChange: Function;
  strikeData: Accessor<any>;
  errors: any;
}) {
  return (
    <>
      <TextInput
        textLabel="First Name"
        name="firstName"
        onChange={handleChange}
        data={strikeData}
        errors={errors}
      />
      <TextInput
        textLabel="Last Name (Optional)"
        name="lastName"
        onChange={handleChange}
        data={strikeData}
        errors={errors}
      />
      <TextInput
        textLabel="Email Address"
        name="emailAddress"
        onChange={handleChange}
        data={strikeData}
        errors={errors}
      />
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-lg text-white">Hall of Residence</span>
        </label>
        <Select
          options={halls}
          onChange={(newValue: Residence) =>
            handleChange({
              target: { name: 'hallOfResidence', value: newValue },
            })
          }
          value={strikeData().hallOfResidence}
          direction="up"
        />
        <p class="text-white w-full text-center">
          {(errors && errors() && errors().hallOfResidence?._errors) || ''}
        </p>
      </div>
    </>
  );
}
