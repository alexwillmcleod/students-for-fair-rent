import { createSignal, onMount } from 'solid-js';
import axios, { AxiosError } from 'axios';
import { clsx } from 'clsx';
import Cookies from 'universal-cookie';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;
const MAX_WHY_LEN = 500;

export default function PledgeForm() {
  const [error, setError] = createSignal<string | undefined>();
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false);
  const cookies = new Cookies(null, { path: '/' });

  onMount(() => {
    if (!cookies.get('authToken')) location.href = '/dashboard';
  });

  const [numberWeeks, setNumberWeeks] = createSignal<number>(12);
  const [isUntilFurtherNotice, setIsUntilFurtherNotice] =
    createSignal<boolean>(true);
  const [why, setWhy] = createSignal<string>('');
  const [isAnonymous, setIsAnonymous] = createSignal<boolean>(false);

  const handleChangePledgeWeeks = (e: any) => {
    let parsedValue: number;
    try {
      parsedValue = parseInt(e.target.value);
    } catch (err) {
      console.error(err);
      return;
    }
    setNumberWeeks(parsedValue);
  };
  const handleWhyChange = (e: any) => {
    const newValue: string = e.target.value;
    setWhy(newValue.substring(0, MAX_WHY_LEN));
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        '/strike/create',
        {
          numberWeeks: isUntilFurtherNotice() ? undefined : numberWeeks(),
          why: why(),
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get('authToken')}`,
          },
        }
      );
      setIsSuccess(true);
      location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      const errorMessage = (err as AxiosError).response?.data;
      if (!errorMessage) {
        setError('Could not create pledge, try again later');
      } else if (errorMessage == 'cannot start strike during a strike') {
        setError('You 🫵 are already striking');
      } else {
        setError('Could not create pledge, try again later');
      }
    }
    setIsLoading(false);
  };
  return (
    <div class="p-4">
      <div class="form w-fit flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4">
        <div class="inline-flex gap-3">
          <h3 class="text-2xl">
            Let's <strong>Strike 🤺 for Fair Rent</strong>
          </h3>
        </div>
        <hr class="border-accent/40 border-solid border-3 " />
        <div class="form-control w-full flex flex-col gap-6">
          <label class="label">
            <span class="label-text text-lg">
              I pledge to withhold my rent from the University of Auckland until
              further notice
            </span>
          </label>
          {/* <div class="flex flex-col justify-center">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Until Further Notice</span>
                <input
                  type="checkbox"
                  class="toggle toggle-primary"
                  checked={isUntilFurtherNotice()}
                  onChange={() =>
                    setIsUntilFurtherNotice(!isUntilFurtherNotice())
                  }
                />
              </label>
            </div>
            <div class="divider">OR</div>
            <div
              class={clsx(
                {
                  'opacity-[10%]': isUntilFurtherNotice(),
                },
                'flex flex-row justify-between'
              )}
            >
              <input
                type="range"
                min={1}
                max={16}
                value={numberWeeks()}
                disabled={isUntilFurtherNotice()}
                class="range range-md enabled:range-primary w-64 md:w-96"
                onChange={handleChangePledgeWeeks}
              />
              {numberWeeks() > 1 && <p>{numberWeeks()} Weeks</p>}
              {numberWeeks() == 1 && <p>1 Week</p>}
            </div>
          </div> */}
          <div>
            <label class="form-control">
              <div class="label">
                <span class="label-text">Your Why?</span>
              </div>
              <textarea
                class="textarea textarea-bordered min-h-[6rem] min-w-full resize"
                textContent={why()}
                maxLength={MAX_WHY_LEN}
                onChange={handleWhyChange}
                placeholder="Why are you striking? (Optional)"
              ></textarea>
              <div class="label">
                <span class="label-text-alt">
                  {why().length} / {MAX_WHY_LEN} characters
                </span>
                {/* <span class="label-text-alt">Alt label</span> */}
              </div>
            </label>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">I wish to stay anonymous</span>
                <input
                  type="checkbox"
                  class="toggle toggle-accent"
                  checked={isAnonymous()}
                  onChange={() => setIsAnonymous(!isAnonymous())}
                />
              </label>
            </div>
          </div>
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
              'Submit Pledge'
            )}
          </button>
        </div>
        <p class={`text-sm ${error() ? 'text-red-500' : 'text-transparent'}`}>
          {error() || 'No error'}
        </p>
        <hr class="border-accent/40 border-solid border-3" />
        <a
          href="/dashboard"
          class="text-blue-700 text-center"
        >
          I won't pledge just yet
        </a>
      </div>
    </div>
  );
}
