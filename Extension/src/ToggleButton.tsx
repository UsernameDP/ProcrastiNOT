import { useContext } from "react";
import { SettingsContext } from "./App";

export default function ToggleButton() {
  const settings = useContext(SettingsContext);
  if (!settings) throw "Settings is null";

  return (
    <button
      className={`px-2 py-1  rounded-sm text-white ${
        settings.enabled ? "bg-red-600" : "bg-blue-600"
      }`}
      onClick={settings.toggleEnabled}
    >
      {settings.enabled ? "Disable" : "Enable"}
    </button>
  );
}
