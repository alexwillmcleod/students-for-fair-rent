import Select from '@atoms/Select';
import { createSignal, onMount } from 'solid-js';
import type { Residence } from '@organisms/Calculator';
import axios, { AxiosError } from 'axios';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;
import Cookies from 'universal-cookie';

export default function StartStrikeForm() {
  const [firstName, setFirstName] = createSignal<string>('');
  const [lastName, setLastName] = createSignal<string>('');
  const [emailAddress, setEmailAddress] = createSignal<string>('');
  const [upi, setUpi] = createSignal<string>('');
  const [studentId, setStudentId] = createSignal<string>('');
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
  const [hallOfResidence, setHallOfResidence] = createSignal<
    Residence | undefined
  >(undefined);

  onMount(() => {
    const cookies = new Cookies(null, { path: '/' });
    if (cookies.get('authToken') != undefined) location.href = '/';
  });

  const [error, setError] = createSignal<string | undefined>();
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false);

  const handleSubmitForm = async () => {
    setIsLoading(true);
    let changedHallOfResidence: string = hallOfResidence()!;
    if (changedHallOfResidence == 'Te Tirohanga o te Tōangaroa') {
      changedHallOfResidence = 'Te Tirohanga o te Toangaroa';
    }
    if (changedHallOfResidence == ' Waipārūrū') {
      changedHallOfResidence = 'Waiparuru';
    }
    try {
      const userCreateRes = await axios.post('/user/create', {
        firstName: firstName(),
        lastName: lastName(),
        emailAddress: emailAddress(),
        upi: upi(),
        studentId: studentId(),
        hallOfResidence: changedHallOfResidence,
      });
      await axios.post(`/auth/send/${emailAddress()}`);
      setIsSuccess(true);
      location.href = '/email-sent-successfully';
    } catch (err) {
      const errorMessage = (err as AxiosError).response?.data;
      if (!errorMessage) {
        setError('Could not sign you up 🥺. Try again later');
      } else if (
        errorMessage ==
        '`firstName`, `lastName`, `studentId`, `upi`, `emailAddress`, and `hallOfResidence` are required fields'
      ) {
        setError('You are missing a field');
      } else if (errorMessage == 'user already exists') {
        setError('Somebody with those details have already signed up');
      }
    }
    setIsLoading(false);
  };

  if (isSuccess()) {
    return (
      <div class="p-4">
        <div class="form w-fit flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4">
          Why the fuck does this not work {emailAddress()}!
        </div>
      </div>
    );
  }

  return (
    <div class="p-4">
      <div class="form w-fit flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4">
        <div class="inline-flex gap-3">
          <h3 class="text-2xl">
            Join the <strong>Students for Fair Rent Strike</strong> 🤺
          </h3>
        </div>
        <hr class="border-accent/40 border-solid border-3 " />
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">First Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            class="input input-bordered w-full text-lg p-2"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName()}
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            class="input input-bordered w-full text-lg p-2"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName()}
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">Email Address</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            class="input input-bordered w-full text-lg p-2"
            onChange={(e) => setEmailAddress(e.target.value)}
            value={emailAddress()}
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">UPI</span>
            <span class="label-text text-md">(eg. amcl287)</span>
          </label>
          <input
            type="text"
            placeholder="Enter your UPI"
            class="input input-bordered w-full text-lg p-2"
            onChange={(e) => setUpi(e.target.value)}
            value={upi()}
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">Student ID</span>
            <span class="label-text text-md">(eg. 567604513)</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Student ID"
            class="input input-bordered w-full text-lg p-2"
            onChange={(e) => setStudentId(e.target.value)}
            value={studentId()}
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-lg">Hall of Residence</span>
          </label>
          <Select
            options={halls}
            onChange={(newValue: Residence) => setHallOfResidence(newValue)}
            value={hallOfResidence()}
            direction="up"
          />
        </div>
        <hr class="border-accent/40 border-solid border-3" />
        <div class="flex flex-row justify-end">
          <button
            onClick={handleSubmitForm}
            class="w-full px-4 py-3 bg-accent/40 rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40"
          >
            {isLoading() ? (
              <span class="loading loading-spinner loading-xs" />
            ) : (
              "Let's Strike!"
            )}
          </button>
        </div>
        <p class={`text-sm ${error() ? 'text-red-500' : 'text-transparent'}`}>
          {error() || 'No error'}
        </p>
        <hr class="border-accent/40 border-solid border-3" />
        <a
          href="/login"
          class="text-blue-700 text-center"
        >
          I have already started striking
        </a>
      </div>
    </div>
  );
}
