import { useState, createContext, useEffect } from "react";
import Header from "./Header";
import InputsGrouped from "./InputsGrouped";
import validator from "validator";

export type InputValidity = {
  success: boolean;
  error: string;
};

export type AddInput = (input: string) => Promise<void>;
export type RemoveInput = (input: string) => Promise<void>;
export type IsValidInput = (input: string) => InputValidity;

export type Settings = {
  enabled: boolean;
  toggleEnabled: () => Promise<void>;

  manualInputs: string[];
  generalInputs: string[];

  addManualInput: AddInput;
  isValidManualInput: IsValidInput;
  removeManualInput: RemoveInput;

  addGeneralInput: AddInput;
  isValidGeneralInput: IsValidInput;
  removeGeneralInput: RemoveInput;
};

export const SettingsContext = createContext<Settings | null>(null);

export default function App() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [manualInputs, setManualInputs] = useState<string[]>([]);
  const [generalInputs, setGeneralInputs] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local
      .get(["enabled", "manualInputs", "generalInputs"])
      .then((result) => {
        if (typeof result.enabled === "boolean") {
          setEnabled(result.enabled);
        }
        if (Array.isArray(result.manualInputs)) {
          setManualInputs(result.manualInputs);
        }
        if (Array.isArray(result.generalInputs)) {
          setGeneralInputs(result.generalInputs);
        }
      });
  }, []);

  const toggleEnabled = async () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    await chrome.storage.local.set({ enabled: newEnabled });
    console.log(newEnabled);
  };

  const addManualInput = async (input: string) => {
    const newManualInputs = [...manualInputs, input];
    setManualInputs(newManualInputs);
    await chrome.storage.local.set({ manualInputs: newManualInputs });
    //POST to backend
  };
  const removeManualInput = async (input: string) => {
    const newManualInputs = manualInputs.filter((ele) => ele !== input);
    setManualInputs(newManualInputs);
    await chrome.storage.local.set({ manualInputs: newManualInputs });
    //DELETE to backend
  };
  const isValidManualInput = (input: string): InputValidity => {
    if (input.length === 0)
      return {
        success: true,
        error: ""
      };
    if (manualInputs.indexOf(input) !== -1)
      return { success: false, error: "URL already exists!" };
    if (!validator.isURL(input)) return { success: false, error: "Not a URL!" };

    return {
      success: true,
      error: ""
    };
  };

  const addGeneralInput = async (input: string) => {
    const newGeneralInputs = [...generalInputs, input];
    setGeneralInputs([...generalInputs, input]);
    await chrome.storage.local.set({ generalInputs: newGeneralInputs });
  };
  const removeGeneralInput = async (input: string) => {
    const newGeneralInputs = generalInputs.filter((ele) => ele !== input);
    setGeneralInputs(newGeneralInputs);
    chrome.storage.local.set({ generalInputs: newGeneralInputs });
  };
  const isValidGeneralInput = (input: string): InputValidity => {
    if (input.length === 0)
      return {
        success: true,
        error: ""
      };
    if (generalInputs.indexOf(input) !== -1)
      return { success: false, error: "Subject already exists!" };

    return {
      success: true,
      error: ""
    };
  };

  const settings: Settings = {
    enabled: enabled,
    toggleEnabled: toggleEnabled,
    manualInputs: manualInputs,
    generalInputs: generalInputs,
    addManualInput: addManualInput,
    isValidManualInput: isValidManualInput,
    removeManualInput: removeManualInput,
    addGeneralInput: addGeneralInput,
    isValidGeneralInput: isValidGeneralInput,
    removeGeneralInput: removeGeneralInput
  };

  useEffect(() => {
    //Fetch manual inputs and general inputs here
  }, []);

  return (
    <main className="py-4 bg-black">
      <SettingsContext.Provider value={settings}>
        <Header />
        <InputsGrouped />
      </SettingsContext.Provider>
    </main>
  );
}
