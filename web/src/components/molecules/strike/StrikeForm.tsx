import Select from '@atoms/Select';
import { createMemo, createSignal, type JSX } from 'solid-js';
import { z } from 'zod';
import CreateUserForm from './CreateUserForm';
import CreatePledgeForm from './CreatePledgeForm';
import axios from 'axios';
import ExistingError from './ExistingError';
import { navigate } from 'astro:transitions/client';
import InformationForm from './InformationForm';
import { ResidenceEnum, type Residence } from '@organisms/Calculator';
import ShareForm from './ShareForm';

const strikeDataSchema = z.object({
  firstName: z.string().min(2, 'First Name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last Name must be at least 2 characters long'),
  emailAddress: z.string().email(),
  hallOfResidence: z.nativeEnum(ResidenceEnum, {
    errorMap: (issue, ctx) => {
      console.log(
        `issue = ${JSON.stringify(issue)}, ctx = ${JSON.stringify(ctx)}`
      );
      return {
        message: 'Please select a Hall of Residence',
      };
    },
  }),
  pledge: z
    .object({
      text: z.string().max(500),
      isAnonymous: z.boolean(),
    })
    .optional(),
});
export type StrikeData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  hallOfResidence: Residence | 'Unselected';
  pledge: {
    text: string;
    isAnonymous: boolean;
  };
};

export default function StrikeForm({ url }: { url: string }) {
  const [strikeData, setStrikeData] = createSignal<StrikeData>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    hallOfResidence: 'Unselected',
    pledge: {
      text: '',
      isAnonymous: false,
    },
  });

  const [errors, setErrors] = createSignal<unknown | undefined>(undefined);
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    try {
      localStorage.setItem(name, value);
    } catch {}
    setStrikeData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    console.log({
      ...strikeData(),
      [name]: value,
    });
  };
  const handlePledgeChange = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    const { name, value } = e.target;
    setStrikeData((prevData: any) => ({
      ...prevData,
      pledge: {
        ...prevData.pledge,
        [name]: value,
      },
    }));
    console.log({
      ...strikeData(),
      pledge: {
        ...strikeData().pledge,
        [name]: value,
      },
    });
  };

  const [step, setStep] = createSignal<string>('information');

  const steps: Record<string, JSX.Element> = {
    information: <InformationForm />,
    createUser: (
      <CreateUserForm
        handleChange={handleChange}
        strikeData={strikeData}
        errors={errors}
      />
    ),
    createPledge: (
      <CreatePledgeForm
        handleChange={handlePledgeChange}
        strikeData={strikeData}
        errors={errors}
      />
    ),
    shareForm: <ShareForm url={url} />,
    alreadyStriking: <ExistingError />,
  };

  const onSubmit = async () => {
    if (step() == 'information') {
      setStep('createUser');
      return;
    }
    const result = strikeDataSchema.safeParse(strikeData());
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    setErrors({});
    if (step() == 'createUser') {
      setStep('createPledge');
      return;
    }

    // Submit with axios
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'post',
        url: '/strike/create',
        baseURL: import.meta.env.PUBLIC_API_BASE_URL,
        data: {
          why:
            strikeData().pledge?.text == ''
              ? undefined
              : strikeData().pledge?.text,
          numberWeeks: undefined,
          isAnonymous: strikeData().pledge?.isAnonymous,
          emailAddress: strikeData().emailAddress,
          firstName: strikeData().firstName,
          lastName: strikeData().lastName,
          hallOfResidence: strikeData().hallOfResidence,
        },
      });
    } catch (err: any) {
      if (err.response.data == 'cannot start strike during a strike') {
        setStep('alreadyStriking');
      }
    }
    if (step() == 'shareForm') {
      navigate('/pledges');
      return;
    }
    setStep('shareForm');
    setIsLoading(false);
  };

  const stepNumber = createMemo(() => {
    if (step() == 'information') return 0;
    if (step() == 'createUser') return 1;
    if (step() == 'createPledge') return 2;
    return 2;
  });

  return (
    <div
      class="w-full md:w-[44rem] rounded-xl flex flex-col gap-4 p-8"
      style="background-image: url('/strike-gradient.png')"
    >
      <h1 class="font-strike text-3xl text-[#e1e1e1]">Strike for Fair Rent</h1>
      {steps[step()]}
      <hr />
      <div class="flex flex-row justify-between">
        <div class="flex flex-col justify-center items-center">
          {/* <StepIndicator
            stepTitles={['Name', 'Why']}
            step={stepNumber()}
          /> */}
          <p class="text-white text-xl">
            {/* {90 - stepNumber() * 30}s until complete */}
            Page {stepNumber() + 1} / 3
          </p>
        </div>
        <button
          onClick={onSubmit}
          class="bg-[#e1e1e1] w-12 h-12 flex justify-center items-center  rounded-full font-strike font-bold text-2xl text-[#272627] shadow-xl"
        >
          {isLoading() ? (
            <span class="loading loading-spinner loading-xl" />
          ) : (
            '➜'
          )}
        </button>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  step: number;
  stepTitles: string[];
}
function StepIndicator(props: StepIndicatorProps) {
  return (
    <ul class="steps fill-info hidden md:flex">
      {props.stepTitles.map((title: string, index: number) => (
        <li
          class={`step ${props.step >= index ? 'step-accent' : 'step-white'}`}
        >
          <p class="text-white font-sans text-xl">{title}</p>
        </li>
      ))}
    </ul>
  );
}
