// import TimersList from "./components/TimersList";
import TimerSummary from "./components/TimerSummary";

export default function Home() {
  return (
    <div className="font-sans mt-14 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <TimerSummary />
    </div>
  );
}
