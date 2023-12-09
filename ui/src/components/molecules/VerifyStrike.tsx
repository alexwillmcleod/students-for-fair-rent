import axios from 'axios';
import { createSignal, onMount } from 'solid-js';
import { createCookieStore } from '@solid-primitives/cookies-store';
import Cookies from 'universal-cookie';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;

interface VerifyStrikeProps {
  code: string;
}

export default function VerifyStrike({ code }: VerifyStrikeProps) {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string | undefined>();
  const [cookies, setCookies] = createCookieStore<{ authToken: string }>();

  onMount(() => {
    const cookies = new Cookies(null, { path: '/' });
    if (cookies.get('authToken') != undefined) location.href = '/';
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/verify', {
        token: code,
      });
      console.log(res.data);
      setCookies('authToken', res.data);
      location.href = '/';
    } catch (err) {
      setError('Invalid Token');
    }
    setIsLoading(false);
  };

  return (
    <div class="flex flex-col gap-4 justify-center text-center w-1/2">
      <h1 class="text-5xl font-semibold font-display">Kia Ora!</h1>
      <p class="text-2xl text-center">
        Striking is an effective way to fight for fair access to education and
        accommodation
      </p>
      <button
        class="bg-accent/40 text-xl w-full px-8 py-6   rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40"
        onClick={handleSubmit}
      >
        {isLoading() ? (
          <span class="loading loading-spinner loading-xl" />
        ) : (
          'Continue'
        )}
      </button>
      <p class={`text-lg ${error() ? 'text-red-500' : 'text-transparent'}`}>
        {error() || 'No error'}
      </p>
    </div>
  );
}
