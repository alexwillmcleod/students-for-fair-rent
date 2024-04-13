import { navigate } from 'astro:transitions/client';
import {
  createMemo,
  createSignal,
  onMount,
  onCleanup,
  type JSXElement,
  createEffect,
  For,
} from 'solid-js';
import MathAssignment from './Assignment';
import Work from './Work';
import axios from 'axios';

interface Todo {
  title: string;
  dueDate?: number; // Which week it's due by inclusive
  rentDue?: number;
  modal?: ({
    handleComplete,
    handleClose,
    rentDue,
  }: {
    handleComplete: Function;
    handleClose: Function;
    rentDue?: number;
  }) => JSXElement;
}

interface WrappedTodo {
  title: string;
  dueDate?: number;
  rentDue?: number;
  modal?: JSXElement;
  onClick: () => void;
}

const payRentTitle = 'Pay Rent';
const workShiftTitle = 'Work 10 Hours';
const oneMinute = 60 * 1000;
const weeklyRent = 540;
const weeklyStudyLink = 300;
const depositCost = 2000;
const hourlyWageAfterTax = 23.15 * 0.9;

export default function Game() {
  const [week, setWeek] = createSignal<number>(1);
  const [money, setMoney] = createSignal<number>(2500);
  const [sessionId, setSessionId] = createSignal<string | undefined>();
  const [isAnyOpen, setIsAnyOpen] = createSignal<boolean>(false);
  const [gameLostMessage, setGameLostMessage] = createSignal<
    string | undefined
  >(undefined);
  const [grade, setGrade] = createSignal<number>(100);
  const [totalDebt, setTotalDebt] = createSignal<number>(0);
  const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout | undefined>(
    undefined
  );
  const [assignmentIndex, setAssignmentIndex] = createSignal<number>(1);
  const [awaitingTodos, setAwaitingTodos] = createSignal<Todo[]>([]);

  const createNewAssignment = () => {
    addTodo({
      title: `Assignment ${assignmentIndex()}`,
      dueDate: week() + 3,
      modal: ({ handleClose, handleComplete }) => (
        <MathAssignment
          questionCount={3}
          onComplete={handleComplete}
          onIncorrect={handleIncorrect}
        />
      ),
    });
    setAssignmentIndex((prev) => prev + 1);
  };

  const createNewRentCharge = () => {
    addTodo({
      dueDate: week() + 4,
      title: payRentTitle,
      rentDue: weeklyRent,
      modal: ({ handleComplete, handleClose, rentDue }) => (
        <div class="min-h-96 p-8 relative flex flex-col gap-4">
          <h2 class="text-blue-400 text-3xl font-strike">
            Waipapa Taumata Rau Accommodation Portal
          </h2>
          <p class="text-lg text-white">You owe us rent 🤣</p>
          <button
            class="absolute bottom-5 right-5 py-2 px-4 bg-white rounded-xl"
            onClick={() => {
              if (money() >= rentDue!) {
                setMoney(money() - rentDue!);
                handleComplete();
              }
            }}
          >
            Pay ${rentDue!}
          </button>
        </div>
      ),
    });
  };

  const createNewShift = () => {
    addTodo({
      dueDate: week() + 2,
      title: workShiftTitle,
      modal: ({ handleComplete, handleClose }) => (
        <Work
          orderCount={2}
          onComplete={() => {
            handleComplete();
            setMoney((prev) => prev + Math.round(hourlyWageAfterTax * 10));
          }}
          onIncorrect={() => {
            setGameLostMessage('You were fired from the cafe');
            endGame();
          }}
        />
      ),
    });
  };

  const endGame = async () => {
    // @ts-ignore
    document.getElementById('endModal')?.showModal();
    clearInterval(intervalId());
    try {
      await axios({
        method: 'patch',
        url: '/game',
        data: {
          sessionId: sessionId(),
          isGameOver: true,
          numberWeeks: week(),
          grade: grade(),
          money: money(),
          totalDebt: totalDebt(),
          lossReason: gameLostMessage(),
        },
        baseURL: import.meta.env.PUBLIC_API_BASE_URL,
      });
    } catch {}
  };

  // Check if the game is over
  createEffect(() => {
    if (money() < 0) {
      endGame();
      setGameLostMessage('You ran out of money');
    }
    if (grade() < 60) {
      endGame();
      setGameLostMessage('You failed University');
    }
    if (
      todos().some((element) =>
        element.dueDate != undefined ? element.dueDate < week() : false
      )
    ) {
      endGame();
      setGameLostMessage('You missed a due date');
    }
  });

  // Decrease grade if incorrect
  const handleIncorrect = () => {
    setGrade(grade() - 5);
  };

  const onNextWeek = async () => {
    setWeek((prev) => prev + 1);
    if (week() > 2) {
      createNewRentCharge();
    }
    createNewAssignment();
    createNewShift();
    // StudyLink money
    setMoney((prev) => prev + weeklyStudyLink);
    setTotalDebt((prev) => prev + weeklyStudyLink);
    // console.log(
    //   JSON.stringify({
    //     data: {
    //       sessionId: sessionId(),
    //       isGameOver: false,
    //       grade: grade(),
    //       numberOfWeeks: week(),
    //       totalDebt: totalDebt(),
    //       money: money(),
    //     },
    //   })
    // );
    try {
      await axios({
        method: 'patch',
        url: '/game',
        data: {
          sessionId: sessionId(),
          isGameOver: false,
          numberOfWeeks: week(),
          grade: grade(),
          totalDebt: totalDebt(),
          money: money(),
        },
        baseURL: import.meta.env.PUBLIC_API_BASE_URL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const startGame = async () => {
    const res = await axios({
      method: 'post',
      url: '/game',
      baseURL: import.meta.env.PUBLIC_API_BASE_URL,
    });
    const gameId = res.data.game;
    setSessionId(gameId);
    setTimeout(() => {
      setIntervalId(setInterval(onNextWeek, oneMinute * 0.65));
      onNextWeek();
    }, 2000);
  };

  onCleanup(() => {
    clearInterval(intervalId());
  });

  createEffect(() => {
    if (isAnyOpen()) return;
    if (awaitingTodos().length == 0) return;
    for (const todo of awaitingTodos()) {
      setTodos((prev) => [...prev, todo]);
    }
    setAwaitingTodos([]);
  });

  onMount(() => {
    //@ts-ignore
    document.getElementById('introModal').showModal();
    document.getElementById('endModal')?.addEventListener('close', () => {
      navigate('/strike');
    });
  });

  const [todos, setTodos] = createSignal<Todo[]>([
    {
      title: 'Pay Deposit',
      modal: ({ handleComplete }: { handleComplete: Function }) => (
        <div class="min-h-96 p-8 relative flex flex-col gap-4">
          <h2 class="text-blue-400 text-3xl font-strike">
            Waipapa Taumata Rau Accommodation Portal
          </h2>
          <p class="text-lg text-white">
            Every year we force you to pay an absurd amount of money upfront.
            This is a massive barrier to entry for people who may not have that
            much money available before they start university.
          </p>
          <div class="mt-auto w-full flex flex-row-reverse">
            <button
              class=" py-2 px-4 bg-white rounded-xl"
              onClick={() => {
                startGame();
                setMoney(money() - depositCost);
                handleComplete();
              }}
            >
              Pay ${depositCost}
            </button>
          </div>
        </div>
      ),
    },
  ]);

  const addTodo = (todo: Todo) => {
    setAwaitingTodos((prev) => [...prev, todo]);
  };

  const wrappedTodos = createMemo<WrappedTodo[]>(() =>
    todos().map(({ title, modal, dueDate, rentDue }, index) => {
      const handleComplete = () => {
        setTodos((prev) =>
          prev.filter((element, otherIndex) => otherIndex != index)
        );
        handleClose();
      };
      const handleClose = () => {
        // @ts-ignore
        document.getElementById(`${title}-${index}-modal`)?.close();
        setIsAnyOpen(false);
      };
      return {
        title,
        dueDate,
        onClick: () => {
          // @ts-ignore
          document.getElementById(`${title}-${index}-modal`).showModal();
          setIsAnyOpen(true);
        },
        modal:
          !!modal &&
          ((
            <dialog
              id={`${title}-${index}-modal`}
              class="modal p-0"
              onClose={() => {
                setIsAnyOpen(false);
              }}
            >
              <div class="modal-box p-0 bg-[#282c34]">
                {modal({ handleComplete, handleClose, rentDue })}
              </div>
              <form
                method="dialog"
                class="modal-backdrop"
              >
                <button>close</button>
              </form>
            </dialog>
          ) as Element | undefined),
      };
    })
  );

  return (
    <div class="flex flex-col relative w-screen h-screen bg-[#282c34] p-8 gap-8 overflow-x-hidden">
      <p class="text-5xl font-strike  text-[#f95a58]">Todos</p>
      <ul class="flex flex-col gap-4">
        <For
          each={wrappedTodos()
            .map((element) => ({
              title: element.title,
              dueDate: element.dueDate,
              onClick: element.onClick,
            }))
            .concat(
              awaitingTodos().map((element) => ({
                title: element.title,
                dueDate: element.dueDate,
                onClick: () => {},
              }))
            )}
          fallback={
            <p class="text-white text-lg">
              You have completed all of your todo items
            </p>
          }
        >
          {(element) => (
            <div
              class="flex flex-col gap-4 cursor-pointer"
              onClick={element.onClick}
            >
              <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-4 justify-center items-center">
                  <div class="p-3 rounded-lg border-2 border-red-400" />
                  <p class="text-xl rounded-xl text-white font-sans">
                    {element.title}
                  </p>
                </div>

                {element.dueDate && (
                  <p class="text-white text-lg font-sans">
                    Due Week {element.dueDate}
                  </p>
                )}
              </div>
              <hr />
            </div>
          )}
        </For>
      </ul>

      <div class="flex flex-row-reverse gap-4 w-full absolute bottom-0 px-12 py-4">
        <p class="px-2 lg:px-4 py-2 rounded-xl font-strike text-white text-md lg:text-xl bg-[#f95a58]">
          Week {week()}
        </p>

        <p class="px-2 lg:px-4 py-2 rounded-xl text-white text-md lg:text-xl font-strike bg-[#f95a58]">
          ${money()}
        </p>

        <p class="px-2 lg:px-4 py-2 rounded-xl text-white text-md lg:text-xl font-strike bg-[#f95a58]">
          Grade: {grade()}%
        </p>
        <p class="lg:px-4 px-2 py-2 rounded-xl text-white text-md lg:text-xl font-strike bg-[#f95a58]">
          Debt: ${totalDebt()}
        </p>
      </div>
      <For each={wrappedTodos()}>{(element: WrappedTodo) => element.modal}</For>
      <dialog
        id="introModal"
        class="modal"
      >
        <div class="modal-box p-8 bg-cover min-h-96 gap-4 flex flex-col relative bg-[#282c34]">
          <h1 class="text-center font-strike text-4xl w-full text-white">
            Play for Fair Rent
          </h1>
          <p class="text-xl text-white">
            Welcome to the Student's for Fair Rent Game. You are a university
            student in Waipārūrū trying to survive. Complete the tasks on your
            todo list before the due date to survive.
          </p>
          <button
            class="absolute bottom-5 right-5 bg-white text-black font-bold font-display px-4 py-2 rounded-xl"
            // @ts-ignore
            onClick={() => document.getElementById('introModal')?.close()}
          >
            Start
          </button>
        </div>
        <form
          method="dialog"
          class="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
      <dialog
        id="endModal"
        class="modal p-0 bg-[#282c34]"
      >
        <div
          class="modal-box text-white p-8 bg-slate-700 flex flex-col justify-center items-center min-h-96 shadow-lg gap-8 relative"
          style="background-image: url('public/strike-gradient.png')"
        >
          <h1 class="font-strike text-4xl absolute top-5">You Lost :(</h1>
          <p class="text-2xl">
            You lost :( {gameLostMessage()}. You survived {week() - 1} weeks,
            but's it's not over yet... stand up for what is right.
          </p>
          <a
            class="bg-white font-strike text-black px-4 py-2 rounded-xl absolute bottom-5"
            href="/strike"
          >
            Strike for Fair Rent!
          </a>
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
