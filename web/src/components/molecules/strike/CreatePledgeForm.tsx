import type { Accessor } from 'solid-js';
import type { StrikeData } from './StrikeForm';

export default function CreatePledgeForm({
  handleChange,
  strikeData,
  errors,
}: {
  handleChange: Function;
  strikeData: Accessor<StrikeData>;
  errors: any;
}) {
  const MAX_WHY_LEN = 500;
  return (
    <>
      <div>
        <label class="form-control">
          <div class="label">
            <span class="text-white text-xl label-text">Your Why?</span>
          </div>
          <textarea
            class="textarea textarea-bordered min-h-[6rem] min-w-full resize"
            textContent={strikeData().pledge?.text || ''}
            maxLength={MAX_WHY_LEN}
            onChange={(e) =>
              handleChange({
                target: {
                  name: 'text',
                  value: e.target.value,
                },
              })
            }
            placeholder="Why are you striking? (Optional)"
          ></textarea>
          <div class="label">
            <span class="label-text-alt">
              {strikeData().pledge?.text.length} / {MAX_WHY_LEN} characters
            </span>
            {/* <span class="label-text-alt">Alt label</span> */}
          </div>
        </label>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="text-white text-xl label-text">
              I wish to stay anonymous
            </span>
            <input
              type="checkbox"
              class="toggle toggle-accent"
              checked={strikeData().pledge?.isAnonymous}
              onChange={() =>
                handleChange({
                  target: {
                    value: !strikeData().pledge?.isAnonymous,
                    name: 'isAnonymous',
                  },
                })
              }
            />
          </label>
        </div>
      </div>
    </>
  );
}
