import axios from 'axios';
import { createSignal, onMount } from 'solid-js';
import Cookies from 'universal-cookie';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;

interface VerifyStrikeProps {
  code: string;
}

export default function VerifyStrike({ code }: VerifyStrikeProps) {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<string | undefined>();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/auth/verify', {
        token: code,
      });
      console.log(res.data);
      const ONE_WEEK = 3600000;
      const cookies = new Cookies(null, { path: '/' });
      cookies.set('authToken', res.data, {
        // expires: new Date(Date.now() + ONE_WEEK),
        maxAge: ONE_WEEK,
        path: '/',
      });
      location.href = '/pledge';
    } catch (err) {
      console.error(err);
      setError('Invalid Token');
    }
    setIsLoading(false);
  };

  return (
    <div class="flex w-full h-full flex-col justify-center items-center p-12 gap-4">
      <img
        src="/images/millenial.svg"
        width="200"
        alt="404"
        height="10"
      />
      <div>
        <p class="font-bold text-3xl justify-center items-center text-center">
          Great to see you!
        </p>
        <p class="text-xl justify-center items-center text-center">
          Let's strike
        </p>
      </div>
      <button
        class="bg-accent/40 text-xl w-full px-6 py-4   rounded-2xl shadow-lg disabled:bg-white/10 disabled:text-black/40"
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
