import Select from '@atoms/Select';
import { createSignal, type JSX } from 'solid-js';
import { z } from 'zod';
import CreateUserForm from './CreateUserForm';
import CreatePledgeForm from './CreatePledgeForm';
import axios from 'axios';
import ExistingError from './ExistingError';
import { navigate } from 'astro:transitions/client';
import InformationForm from './InformationForm';

const strikeDataSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  emailAddress: z.string().email(),
  hallOfResidence: z.enum([
    "O'Rorke",
    'Waipārūrū',
    'University Hall Towers',
    'Grafton',
    'Carlaw Park Stuart McCutcheon House',
    'Carlaw Park Nicholls',
    'Te Tirohanga o te Tōangaroa',
    '55 Symonds',
  ]),
  pledge: z
    .object({
      text: z.string().max(500),
      isAnonymous: z.boolean(),
    })
    .optional(),
});
export type StrikeData = z.infer<typeof strikeDataSchema>;

export default function StrikeForm() {
  const [strikeData, setStrikeData] = createSignal<StrikeData>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    hallOfResidence: "O'Rorke",
    pledge: {
      text: '',
      isAnonymous: false,
    },
  });

  const [errors, setErrors] = createSignal<unknown | undefined>(undefined);
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
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
    navigate('/pledges');
    setIsLoading(false);
  };

  return (
    <div
      class="w-full md:w-[44rem] rounded-xl flex flex-col gap-4 p-8"
      style="background-image: url('/strike-gradient.png')"
    >
      <h1 class="font-strike text-3xl text-[#e1e1e1]">Strike for Fair Rent</h1>
      {steps[step()]}
      <hr />
      <div class="flex flex-row justify-end">
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
