import { kv } from "@vercel/kv";
import Link from "next/link";
import ArrowIcon from "@/app/components/ArrowIcon";

//De acordo com o mês, devemos renderizar os dias corretamente no calendário. Referência: https://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object
function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstWeekday = date.getDay();
  const numberOfEmptyDays = Array(firstWeekday).fill(null);
  const days = [...numberOfEmptyDays];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

export default async function Habit({
  params: { name },
}: {
  params: { name: string };
}) {
  const decodedHabitName = decodeURI(name);

  //Procurar o hábito no banco de dados
  const habitStreak = await kv.hget("habits", decodedHabitName);

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-white text-2xl font-light text-center font-display">
        {decodedHabitName}
      </h1>
      <Link
        href="/"
        className="flex items-center font-sans text-xs text-neutral-300 gap-1"
      >
        <ArrowIcon width={20} height={20} />
        Voltar
      </Link>

      <section className="w-full my-2 rounded-md bg-neutral-800">
        <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
          <button>
            <ArrowIcon width={24} height={24} className="stroke-neutral-400" />
          </button>
          <button>
            <span>Maio de 2024</span>
          </button>
          <button>
            <ArrowIcon
              width={24}
              height={24}
              className="rotate-180 stroke-neutral-400"
            />
          </button>
        </div>
        <div className="grid w-full grid-cols-7 mt-2">
          {weekdays.map((day) => (
            <div key={day} className="flex flex-col items-center p-2">
              <span className="font-display text-md font-light text-neutral-200">
                {day}
              </span>
            </div>
          ))}
          {daysInMonth.map((day, index) => (
            <div key={index} className="flex flex-col items-center p-2">
              <span className="font-sans text-xs font-light text-neutral-400">
                {day?.getDate()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
