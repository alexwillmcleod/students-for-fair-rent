export default function ExistingError() {
  return (
    <div class="flex flex-col justify-center items-center h-32">
      <p class="text-white font-sans text-xl">You are already striking</p>
      <a
        class="text-white underline"
        href="/pledges"
      >
        View Pledges
      </a>
    </div>
  );
}
