import ToggleButton from "./ToggleButton";

export default function Header() {
  return (
    <header className="w-full border-b-[0.5px] border-b-gray-600 pb-1 px-2">
      <section className="flex flex-row px-2 justify-between">
        <div className="flex flex-row items-center">
          <img
            src="./favicon/favicon.ico"
            alt="favicon"
          />
          <h1 className="text-xl flex flex-row pl-4 text-white font-mono">
            Procrasti <p className="font-extrabold">NOT</p>
          </h1>
        </div>
        <div className="flex justify-center items-center ml-20">
          <ToggleButton />
        </div>
      </section>
    </header>
  );
}
