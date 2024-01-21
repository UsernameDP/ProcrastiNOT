import { useContext } from "react";
import { SettingsContext } from "./App";
import InputsIndividual from "./InputsIndividual";

export default function InputsGrouped() {
  const settings = useContext(SettingsContext);
  if (!settings) throw "Settings not defined";

  return (
    <section className="flex flex-col p-4 gap-2">
      <InputsIndividual
        name={"Manual"}
        placeholder={"Website URLs to block"}
        inputs={settings.manualInputs}
        addInput={settings.addManualInput}
        isInputValid={settings.isValidManualInput}
        removeInput={settings.removeManualInput}
      />
      <InputsIndividual
        name={"General"}
        placeholder={"General subjects to block"}
        inputs={settings.generalInputs}
        addInput={settings.addGeneralInput}
        isInputValid={settings.isValidGeneralInput}
        removeInput={settings.removeGeneralInput}
      />
    </section>
  );
}
