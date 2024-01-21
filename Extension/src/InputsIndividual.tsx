import { useState } from "react";
import { InputValidity, AddInput, RemoveInput, IsValidInput } from "./App";

type Props = {
  name: string;
  placeholder: string;
  inputs: string[];
  addInput: AddInput;
  isInputValid: IsValidInput;
  removeInput: RemoveInput;
};

export default function InputsIndividual(props: Props) {
  const [value, setValue] = useState<string>("");
  const [inputValidity, setInputValidity] = useState<InputValidity>(
    props.isInputValid(value)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValidity(props.isInputValid(e.target.value));
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validityCheckBeforeSubmit = props.isInputValid(value);

    if (validityCheckBeforeSubmit.success && value.length !== 0)
      await props.addInput(value);

    setInputValidity(validityCheckBeforeSubmit);
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <p className="mr-2 text-lg text-white font-bold mb-2">{`${props.name}`}</p>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={props.placeholder}
          className="w-full bg-black text-gray-400 p-1 text-md"
        />
        {!inputValidity.success && (
          <p className="text-red-600 mt-3">{inputValidity.error}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 text-md">
        {props.inputs.map((input, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between rounded-md py-2 px-2 hover:shadow-zinc-500 hover:shadow-md transition-all duration-500"
            >
              <p className="text-white hover:text-blue-500 transition-all duration-300">
                {input}
              </p>
              <button
                type="button"
                onClick={async () => await props.removeInput(input)}
                className="aspect-square w-6 h-6 rounded-md border-2 text-center ml-4 hover:bg-gray-600 hover:text-white transition-all duration-300"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
}
