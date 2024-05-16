import Image from "next/image";
import DayState from "./components/DayState";

export default function Home() {
  //Os hábitos foram criados como um objeto por causa do uso do Redis por meio do Vercel KV no backend. O Redis é um banco de dados de chave-valor, então ficará mais fácil se uilizarmos um objeto ao invés de um array, por exemplo
  const habits = {
    "estudar japonês": {
      "2024-05-17": true,
      "2024-05-16": false,
      "2024-05-15": true,
    },
    treinar: {
      "2024-05-17": false,
      "2024-05-16": true,
      "2024-05-15": true,
    },
  };

  //Sequência de dias deve aparecer os últimos 7 dias, ou seja, o dia de hoje deve estar na 6º posição do array de weekdays

  //Descobrir qual dia é hoje utilizando a biblioteca de datas do JS
  const today = new Date();

  //Pegar o dia da semana com a função getDay() que retorna um indíce de 0 até 6, simbolizando um array com os dias da semana
  const todayWeekday = today.getDay();

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  //Quebrar o array de dias da semana em duas partes: os dias que faltam para a semana terminar a partir de amanhã, e os dias que já se passaram desde o começo da semana até hoje. Depois iremos inverter as posições e concatenar os dias de maneira que o dia atual apareça na última (6º) posição do array
  const sortedWeekdays = weekdays
    .slice(todayWeekday + 1)
    .concat(weekdays.slice(0, todayWeekday + 1));

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {/*Se objeto habits estiver vazio/nulo OU se não existir nenhuma chave/propriedade dentro do objeto habits, renderize o código a seguir depois do && */}
      {habits === null ||
        (Object.keys(habits).length === 0 && (
          <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
            você não possui hábitos cadastrados
          </h1>
        ))}
      {/*Mapeamento para pegar e mostrar os hábitos existentes em tela. Utilizamos Object.entries() para verificar tantos as chaves quantos os valores do objeto habits*/}
      {habits !== null &&
        Object.entries(habits).map(([habit, habitStreak]) => (
          <div key={habit} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xl font-light text-white font-sans">
                {habit}
              </span>
              <button>
                <Image
                  src="/images/trash.svg"
                  alt="Ícone de lixeira vermelha"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
              {sortedWeekdays.map((day) => (
                <div
                  key={day}
                  className="flex flex-col items-center gap-4 last:font-bold"
                >
                  <span className="font-display text-md text-white text-center">
                    {day}
                  </span>
                  <DayState day={undefined} />
                </div>
              ))}
            </section>
          </div>
        ))}
    </main>
  );
}
