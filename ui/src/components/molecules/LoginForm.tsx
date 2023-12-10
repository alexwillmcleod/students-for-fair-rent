import Select from '@atoms/Select';
import { createSignal, onMount } from 'solid-js';
import type { Residence } from '@organisms/Calculator';
import axios, { AxiosError } from 'axios';
import { createSign } from 'crypto';
import Cookies from 'universal-cookie';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;

export default function LoginForm() {
  const [emailAddress, setEmailAddress] = createSignal<string>('');

  const [error, setError] = createSignal<string | undefined>();
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false);

  onMount(() => {
    const cookies = new Cookies(null, { path: '/' });
    if (cookies.get('authToken') != undefined) location.href = '/';
  });

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      const userCreateRes = await axios.post(`/auth/send/${emailAddress()}`);
      setIsSuccess(true);
      location.href = '/email-sent-successfully';
    } catch (err) {
      const errorMessage = (err as AxiosError).response?.data;
      if (!errorMessage) {
        setError('Could not send an email 🥺. Try again later');
      } else if (errorMessage == 'could not find a user with that email') {
        setError('Could not find 🔎 a user with that email 🤔');
      } else {
        setError('Could not send an email 🥺. Try again later');
      }
    }
    setIsLoading(false);
  };
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
          href="/join"
          class="text-blue-700 text-center"
        >
          I haven't started striking yet
        </a>
      </div>
    </div>
  );
}
