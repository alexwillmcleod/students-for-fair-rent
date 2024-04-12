import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type Accessor,
  type Setter,
} from 'solid-js';

interface Order {
  milk: 'Oat' | 'Soy' | 'Almond' | 'Coconut';
  shotCount: 'Half' | 'Single' | 'Double' | 'Triple';
  type: 'Espresso' | 'Latte' | 'Flat White' | 'Iced Coffee';
  toGo: 'To Go' | 'Have Here';
  size: 'Small' | 'Medium' | 'Large';
  value: string;
}
interface AnswerOrder {
  milk?: 'Oat' | 'Soy' | 'Almond' | 'Coconut';
  shotCount?: 'Half' | 'Single' | 'Double' | 'Triple';
  type?: 'Espresso' | 'Latte' | 'Flat White' | 'Iced Coffee';
  toGo?: 'To Go' | 'Have Here';
  size?: 'Small' | 'Medium' | 'Large';
}

interface WorkProps {
  orderCount: number;
  onComplete: Function;
  onIncorrect: Function;
}

const potentialOrderList: Order[] = [
  {
    milk: 'Oat',
    shotCount: 'Double',
    type: 'Flat White',
    toGo: 'To Go',
    size: 'Large',
    value:
      'Hi! Would I be able to get a double shot flat white with oat milk to go and could I make that large',
  },
  {
    milk: 'Coconut',
    shotCount: 'Half',
    type: 'Iced Coffee',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'Kia Ora! Could I get a iced coffee with a half shot, coconut milk to have here. I think the size should be medium. Thank you!',
  },
  {
    milk: 'Soy',
    shotCount: 'Triple',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Small',
    value:
      'Hey! Can I get a triple shot espresso with soy milk? I’ll take it to go, and small size, please.',
  },
  {
    milk: 'Almond',
    shotCount: 'Single',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Large',
    value:
      'Could I have a large latte with almond milk, single shot, to have here? Thanks!',
  },
  {
    milk: 'Oat',
    shotCount: 'Half',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Medium',
    value:
      'Good morning, I’d like a medium iced coffee with oat milk, half a shot, to go please.',
  },
  {
    milk: 'Coconut',
    shotCount: 'Double',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'Could I possibly get a small flat white with double shot and coconut milk, to have here, please?',
  },
  {
    milk: 'Soy',
    shotCount: 'Single',
    type: 'Latte',
    toGo: 'To Go',
    size: 'Large',
    value:
      'I’m in a bit of a rush, could I grab a large soy latte with a single shot, to go?',
  },
  {
    milk: 'Almond',
    shotCount: 'Triple',
    type: 'Espresso',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'Is it possible to have a medium espresso with almond milk, triple shot, here?',
  },
  {
    milk: 'Oat',
    shotCount: 'Half',
    type: 'Latte',
    toGo: 'To Go',
    size: 'Large',
    value:
      'Hello! A large latte with oat milk and just half a shot, to go, would be perfect, thank you!',
  },
  {
    milk: 'Coconut',
    shotCount: 'Single',
    type: 'Iced Coffee',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'A small iced coffee with coconut milk and a single shot, to have here, sounds wonderful.',
  },
  {
    milk: 'Soy',
    shotCount: 'Double',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Small',
    value:
      'Could I get a small espresso with double soy shots, to go? Quick pick-me-up!',
  },
  {
    milk: 'Almond',
    shotCount: 'Triple',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'I’d love a medium flat white with triple almond milk shots, to enjoy here. Thanks!',
  },
  {
    milk: 'Oat',
    shotCount: 'Single',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Large',
    value:
      'Hey there, can I grab a large iced coffee with a single shot and oat milk, to go?',
  },
  {
    milk: 'Coconut',
    shotCount: 'Half',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'Morning! A small latte with half a shot and coconut milk, I’ll stay and have it here.',
  },
  {
    milk: 'Soy',
    shotCount: 'Double',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Medium',
    value:
      'Can I have a medium iced coffee with soy milk, double shot, to go, please?',
  },
  {
    milk: 'Oat',
    shotCount: 'Triple',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Large',
    value:
      'I’d like a large latte with triple shots, oat milk, to have here. Much appreciated!',
  },
  {
    milk: 'Almond',
    shotCount: 'Single',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Small',
    value:
      'Just a small espresso with a single shot and almond milk, to go, please.',
  },
  {
    milk: 'Coconut',
    shotCount: 'Double',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'Would it be possible to get a medium flat white with double shot, coconut milk, to have here?',
  },
  {
    milk: 'Soy',
    shotCount: 'Half',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Large',
    value:
      'I need a large iced coffee with half a shot, and soy, to go. Thanks!',
  },
  {
    milk: 'Oat',
    shotCount: 'Triple',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'A small latte with triple oat milk shots, having here, would be wonderful.',
  },
  {
    milk: 'Coconut',
    shotCount: 'Single',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Medium',
    value:
      'May I have a medium espresso with coconut milk and just a single shot, to go?',
  },
  {
    milk: 'Oat',
    shotCount: 'Double',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Large',
    value:
      'I’d love a large flat white with double oat milk shots, to have right here, please.',
  },
  {
    milk: 'Soy',
    shotCount: 'Triple',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Small',
    value:
      'Can I get a small iced coffee with triple soy shots, to go? Need a strong one today!',
  },
  {
    milk: 'Almond',
    shotCount: 'Half',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'A medium latte with half a shot and almond milk, to enjoy here, would be perfect.',
  },
  {
    milk: 'Coconut',
    shotCount: 'Double',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Large',
    value:
      'Could I grab a large double shot espresso with coconut milk, to go?',
  },
  {
    milk: 'Oat',
    shotCount: 'Single',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'Would it be possible to get a small flat white with a single shot of oat milk, to have here?',
  },
  {
    milk: 'Soy',
    shotCount: 'Triple',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Medium',
    value:
      'I’m looking for a medium iced coffee with triple shots, soy milk, to go.',
  },
  {
    milk: 'Almond',
    shotCount: 'Half',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Large',
    value:
      'I’d appreciate a large latte with half a shot, almond milk, staying to have it here, thanks!',
  },
  {
    milk: 'Coconut',
    shotCount: 'Single',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Small',
    value:
      'Let me get a small espresso, coconut milk, single shot, to go, please.',
  },
  {
    milk: 'Oat',
    shotCount: 'Double',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Medium',
    value:
      'A medium flat white with double shots and oat milk, to have here, sounds great.',
  },
  {
    milk: 'Soy',
    shotCount: 'Triple',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Large',
    value:
      'Could you do a large iced coffee with triple soy shots, to go? It’s going to be a long day.',
  },
  {
    milk: 'Almond',
    shotCount: 'Half',
    type: 'Latte',
    toGo: 'Have Here',
    size: 'Small',
    value:
      'I want a small latte with almond milk, just half a shot, to enjoy here, please.',
  },
  {
    milk: 'Coconut',
    shotCount: 'Double',
    type: 'Espresso',
    toGo: 'To Go',
    size: 'Medium',
    value: 'I need a medium double shot espresso with coconut milk, on the go.',
  },
  {
    milk: 'Oat',
    shotCount: 'Single',
    type: 'Flat White',
    toGo: 'Have Here',
    size: 'Large',
    value:
      'Can I have a large flat white, single shot, with oat milk, to have here?',
  },
  {
    milk: 'Soy',
    shotCount: 'Triple',
    type: 'Iced Coffee',
    toGo: 'To Go',
    size: 'Medium',
    value:
      'Hey, I’d like a medium iced coffee, triple soy shots, to go, please!',
  },
];

const generateOrder = (): Order => {
  const randomIndex = Math.floor(
    Math.random() * (potentialOrderList.length - 1)
  );
  return potentialOrderList[randomIndex];
};

const OptionButton = ({
  key,
  setAnswerOrder,
  answerOrder,
  value,
}: {
  setAnswerOrder: Setter<AnswerOrder>;
  answerOrder: Accessor<AnswerOrder>;
  key: string;
  value: string;
}) => (
  <button
    onClick={() =>
      setAnswerOrder((prev: AnswerOrder) => ({
        ...prev,
        [key]: value,
      }))
    }
    class={`w-full px-4 py-4 rounded-xl ${
      // @ts-ignore
      answerOrder()[key] == value ? 'bg-yellow-200' : 'bg-slate-200'
    }`}
  >
    {value}
  </button>
);

const Work = ({ orderCount, onComplete, onIncorrect }: WorkProps) => {
  const [step, setStep] = createSignal<number>(0);
  const [currentOrder, setCurrentOrder] = createSignal<Order>(generateOrder());
  const [answerOrder, setAnswerOrder] = createSignal<AnswerOrder>({});

  createEffect(() => {
    if (step() == orderCount) {
      onComplete();
    }
  });

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  onMount(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    // Remove event listener when the component unmounts
    document.removeEventListener('keydown', handleKeyDown);
  });

  const checkAnswer = () => {
    if (answerOrder().milk == undefined) return;
    if (answerOrder().size == undefined) return;
    if (answerOrder().toGo == undefined) return;
    if (answerOrder().type == undefined) return;
    if (answerOrder().shotCount == undefined) return;
    if (answerOrder().milk != currentOrder().milk) onIncorrect();
    if (answerOrder().size != currentOrder().size) onIncorrect();
    if (answerOrder().toGo != currentOrder().toGo) onIncorrect();
    if (answerOrder().type != currentOrder().type) onIncorrect();
    if (answerOrder().shotCount != currentOrder().shotCount) onIncorrect();
    setStep(step() + 1);
    setAnswerOrder({});
    setCurrentOrder(generateOrder());
  };

  return (
    <div class="flex flex-col p-8 gap-4 min-h-96 h-max relative w-full">
      <h2 class="font-display font-bold text-3xl text-yellow-200">
        High Street Cafe
      </h2>
      <div class="flex flex-col gap-2">
        <p class="text-white text-lg">{currentOrder().value}</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2 w-full">
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="type"
            value="Espresso"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="type"
            value="Flat White"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="type"
            value="Latte"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="type"
            value="Iced Coffee"
          />
        </div>

        <div class="flex flex-row gap-2 w-full">
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="toGo"
            value="To Go"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="toGo"
            value="Have Here"
          />
        </div>

        <div class="flex flex-row gap-2 w-full">
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="shotCount"
            value="Half"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="shotCount"
            value="Single"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="shotCount"
            value="Double"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="shotCount"
            value="Triple"
          />
        </div>

        <div class="flex flex-row gap-2 w-full">
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="size"
            value="Small"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="size"
            value="Medium"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="size"
            value="Large"
          />
        </div>

        <div class="flex flex-row gap-2 w-full">
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="milk"
            value="Oat"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="milk"
            value="Soy"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="milk"
            value="Almond"
          />
          <OptionButton
            answerOrder={answerOrder}
            setAnswerOrder={setAnswerOrder}
            key="milk"
            value="Coconut"
          />
        </div>
      </div>

      <div class="flex flex-row-reverse justify-between items-center mt-auto w-full">
        <button
          class="bg-white py-2 px-4 rounded-lg font-display text-blue-400"
          onClick={checkAnswer}
        >
          Next
        </button>
        <p class="text-white">
          Order {step() + 1} / {orderCount}
        </p>
      </div>
    </div>
  );
};

export default Work;
