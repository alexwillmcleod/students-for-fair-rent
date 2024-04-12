import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  type JSXElement,
} from 'solid-js';

interface Question {
  a: number;
  b: number;
  method: '+' | '-' | '*' | '/';
}

const displayQuestion = ({ a, b, method }: Question) => `${a} ${method} ${b}`;

const generateQuestion = (): Question => {
  const randomNumber = Math.random();
  if (randomNumber > 0.75) {
    return {
      method: '+',
      a: Math.round(Math.random() * 25),
      b: Math.round(Math.random() * 25),
    };
  } else if (randomNumber > 0.5) {
    const a = Math.round(Math.random() * 100);
    const b = Math.round(Math.random() * a);
    return {
      method: '-',
      a,
      b,
    };
  } else if (randomNumber > 0.25) {
    return {
      method: '*',
      a: Math.round(Math.random() * 6),
      b: Math.round(Math.random() * 12),
    };
  } else {
    const b = Math.round(Math.random() * 100);
    const answer = Math.round(Math.random() * 10);
    const a = answer * b;
    return {
      method: '/',
      a,
      b,
    };
  }
};

const isCorrect = ({ a, b, method }: Question, answer: number): boolean => {
  if (method == '+') {
    return a + b == answer;
  } else if (method == '-') {
    return a - b == answer;
  } else if (method == '*') {
    return a * b == answer;
  } else if (method == '/') {
    return a / b == answer;
  } else {
    return false;
  }
};

const MathAssignment = ({
  questionCount,
  onIncorrect,
  onComplete,
}: {
  questionCount: number;
  onIncorrect: Function;
  onComplete: Function;
}) => {
  const [step, setStep] = createSignal<number>(0);
  const [question, setQuestion] = createSignal<Question>(generateQuestion());
  const [userAnswerValue, setUserAnswerValue] = createSignal<string>('');
  const [lastStatus, setLastStatus] = createSignal<JSXElement>(<></>);

  createEffect(() => {
    if (step() == questionCount) {
      onComplete();
    }
    setQuestion(generateQuestion());
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
    document.getElementById('answer-input')?.blur();
    document.getElementById('answer-input')?.focus();
    if (userAnswerValue() == '') return;
    if (document.activeElement?.id != 'answer-input') return;
    try {
      const userAnswer = Number.parseInt(userAnswerValue());
      if (!isCorrect(question(), userAnswer)) throw new Error('Incorrect');
      setLastStatus(<p class="text-green-500">Correct</p>);
    } catch {
      onIncorrect();
      setLastStatus(<p class="text-red-500">Incorrect. -5%</p>);
    }
    setStep(step() + 1);
    setUserAnswerValue('');
  };

  return (
    <div class="flex flex-col p-8 gap-4 min-h-96 relative">
      <h2 class="font-display font-bold text-3xl text-blue-400">Canvas</h2>
      <div class="flex flex-col gap-2">
        <p class="text-white text-2xl">{displayQuestion(question())}</p>
        <input
          id="answer-input"
          class="rounded-xl p-2"
          type="number"
          value={userAnswerValue()}
          onChange={(e: any) => {
            setUserAnswerValue(e.target.value);
          }}
        ></input>
      </div>
      <div class="flex flex-row-reverse items-center justify-between absolute bottom-5 left-0 w-full px-5">
        <button
          class="bg-white py-2 px-4 rounded-lg font-display text-blue-400"
          onClick={checkAnswer}
        >
          Next
        </button>
        <div class="flex flex-row gap-2">
          <p class="text-white">
            Question {step() + 1} / {questionCount}
          </p>
          {lastStatus()}
        </div>
      </div>
    </div>
  );
};

export default MathAssignment;
