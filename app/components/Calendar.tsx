//Diretiva para que esse componente seja do tipo client
"use client";
import { useEffect, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import DayState from "./DayState";

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

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Calendar({
  habit,
  habitStreak,
}: {
  habit: string;
  habitStreak: Record<string, boolean> | null;
}) {
  //Criação das variáveis de estado: Precisamos salvar e alterar o mês e o ano atual e, para isso, vamos usar a ideia de estado já que estamos trabalhando com algo que será alterado e salvo com o click do usuário
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(currentMonth, currentYear) //Valor inicial: os dias do mês atual
  );

  //Efeito para que toda vez que o mês ou o ano forem alterados, os dias do mês serão atualizados de acordo com o mês ou ano que foram alterados
  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year));
    //Toda vez que o mês/ano forem alteradados, selecionar o primeiro dia do mês para que essa informação seja utilizada na função getFullDateString()
    setSelectedDate(new Date(year, month, 1));
  }, [month, year]);

  //Funções para alterar os valores do mês ou ano para que isso reflita no efeito acima
  function goToPreviousMonth() {
    //Se for o primeiro mês do ano: altera-se o ano para o ano passado e altera o mês para dezembro. Caso contrário, apenas decrementar o index do mês
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  function goToNextMonth() {
    //Se for o último mês do ano: altera-se o ano para o ano seguinte e altera o mês para janeiro. Caso contrário, apenas incrementar o index do mês
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function getFullDateString() {
    //Com base nos dias que estão sendo mostrados no calendário, devemos pegar o mês e o ano
    const monthName = `${selectedDate.toLocaleString("pt-BR", {
      month: "long",
    })}`;
    const uppercaseMonthName = monthName[0].toUpperCase() + monthName.slice(1);
    return `${uppercaseMonthName} de ${selectedDate.getFullYear()}`;
  }

  function getDayString(day: Date) {
    //Pegar as chaves de cada dia do objeto de hábitos
    return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <section className="w-full rounded-md bg-neutral-800">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
        <button onClick={goToPreviousMonth}>
          <ArrowIcon width={24} height={24} className="stroke-neutral-400" />
        </button>
        <button>
          <span>{getFullDateString()}</span>
        </button>
        <button onClick={goToNextMonth}>
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
            <span className="font-sans text-md font-light text-neutral-400">
              {day?.getDate()}
            </span>
            {/*Se o dia existe (ele pode ser nulo), devemos renderizar o estado do dia*/}
            {day && (
              <DayState
                day={habitStreak ? habitStreak[getDayString(day)] : undefined}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
