import { createSignal, onMount } from 'solid-js';
import axios, { AxiosError } from 'axios';
import { clsx } from 'clsx';
import Cookies from 'universal-cookie';

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL;
axios.defaults.baseURL = baseUrl;
const MAX_WHY_LEN = 500;

interface PledgeStatusProps {
  why?: string;
}

export default function PledgeStatus(props: PledgeStatusProps) {
  const [error, setError] = createSignal<string | undefined>();
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [isSuccess, setIsSuccess] = createSignal<boolean>(false);
  const cookies = new Cookies(null, { path: '/' });

  const [confirmationText, setConfirmationText] = createSignal<string>('');

  const handleConfirmationTextChange = (e: any) => {
    setConfirmationText(e.target.value);
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      await axios.delete('/strike/end', {
        headers: {
          Authorization: `Bearer ${cookies.get('authToken')}`,
        },
      });
      setIsSuccess(true);
      location.href = '/';
    } catch (err) {
      console.error(err);
      const errorMessage = (err as AxiosError).response?.data;
      if (!errorMessage) {
        setError('Could not end pledge, try again later');
      } else if (errorMessage == 'no strike is ongoing') {
        setError('You 🫵 are not striking 🤔');
      } else {
        setError('Could not end pledge, try again later');
      }
    }
    setIsLoading(false);
  };

  return (
    <div class="p-4">
      <div class="form w-fit flex flex-col gap-4 bg-slate-50 bg-opacity-30 shadow-lg rounded-xl p-4">
        <div class="inline-flex gap-3">
          <h3 class="text-2xl">You're already pledged! Superstar 🎸</h3>
        </div>
        <hr class="border-accent/40 border-solid border-3 " />
        <label class="form-control">
          <div class="label">
            <span class="label-text">Your Why:</span>
          </div>
          <p class="textarea textarea-bordered min-h-[6rem] min-w-full resize">
            {props.why}
          </p>
        </label>
        <div class="form-control w-full flex flex-col gap-6">
          <div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">I wish to end my pledge</span>
                <button
                  class="btn btn-outline btn-error btn-sm"
                  onClick={() =>
                    // @ts-ignore
                    document.getElementById('endPledgeModal')?.showModal()
                  }
                >
                  End
                </button>
              </label>
            </div>
          </div>
        </div>
        <hr class="border-accent/40 border-solid border-3" />
        <a
          href="/dashboard"
          class="text-blue-700 text-center"
        >
          Return to Dashboard
        </a>
      </div>
      <dialog
        id="endPledgeModal"
        class="modal"
      >
        <div class="modal-box bg-base-100">
          <div class="inline-flex gap-3 ">
            <h3 class="text-2xl">End 🪦 your Pledge 😔</h3>
          </div>
          <hr class="border-accent/40 border-solid border-3 " />
          <div class="form-control w-full gap-4">
            <label class="label">
              <span class="label-text text-lg">
                Please type below <em>"End my pledge to withold rent"</em> to
                confirm
              </span>
            </label>
            <input
              type="text"
              // placeholder="End my pledge to withold rent"
              class="input input-bordered w-full text-lg p-2"
              value={confirmationText()}
              onChange={handleConfirmationTextChange}
            />
            <hr class="border-accent/40 border-solid border-3" />
            <button
              class="btn btn-error btn-outline"
              disabled={confirmationText() != 'End my pledge to withold rent'}
              onClick={handleSubmitForm}
            >
              End
            </button>
            <hr class="border-accent/40 border-solid border-3" />
            <p
              class={`w-full text-center text-md ${
                error() ? 'text-red-500' : 'text-transparent'
              }`}
            >
              {error() || 'No error'}
            </p>
          </div>
        </div>
        <form
          method="dialog"
          class="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
