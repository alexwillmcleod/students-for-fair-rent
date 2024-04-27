import { addNotification } from '../../../store/notifications';
function copyLink(link: string) {
  navigator.clipboard.writeText(link);
  addNotification({
    value: 'Copied Link',
  });
}

export default function ShareForm({ url }: { url: string }) {
  return (
    <div class="flex flex-col justify-center items-center gap-8">
      <div class="flex flex-col justify-center gap-2 items-center">
        <p class="text-white font-sans text-3xl font-bold">Next Steps:</p>
        <ol class="list-decimal">
          <li class="text-white text-xl">
            <div class="flex flex-col gap-4 justify-center items-center p-2">
              <a
                class="rounded-xl w-full flex flex-row justify-center items-center gap-4 py-4 px-8 bg-base-100/50"
                href="/posts/how-to-strike"
                target="_blank"
              >
                <p class="text-xl flex flex-row gap-2 items-center text-black">
                  Follow our How-to-Strike
                  <img
                    class="w-5 h-5"
                    src="/external-link.png"
                  />
                </p>
              </a>
            </div>
          </li>

          <li class="text-white text-xl">
            <div class="flex flex-col gap-4 justify-center items-center p-2">
              <a
                class="rounded-xl flex w-full flex-row justify-center items-center gap-4 py-4 px-8 bg-base-100/50"
                href="https://discord.gg/pxYkG3E3XS"
                target="_blank"
              >
                <p class="text-xl flex flex-row gap-2 items-center text-black">
                  Join our Chat
                  <img
                    class="w-5 h-5"
                    src="/external-link.png"
                  />
                </p>
              </a>
            </div>
          </li>

          <li class="text-white text-xl">
            <div class="flex flex-col gap-4 justify-center items-center p-2">
              <button
                onclick={() => copyLink(`${url}/strike`)}
                class="rounded-xl flex flex-row justify-left items-center gap-4 py-4 px-8 bg-base-100/50"
              >
                <p class="text-xl text-black flex flex-row gap-2 items-center">
                  Share form with flatmates and neighbours
                  <img
                    class="w-5 h-5"
                    src="/images/share.svg"
                  />
                </p>
              </button>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
