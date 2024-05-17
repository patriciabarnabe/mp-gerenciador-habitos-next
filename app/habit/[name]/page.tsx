import { kv } from "@vercel/kv";
import Link from "next/link";
import ArrowIcon from "@/app/components/ArrowIcon";
import Calendar from "@/app/components/Calendar";

export default async function Habit({
  params: { name },
}: {
  params: { name: string };
}) {
  const decodedHabitName = decodeURI(name);

  //Procurar o hábito no banco de dados
  const habitStreak: Record<string, boolean> | null = await kv.hget(
    "habits",
    decodedHabitName
  );

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-white text-3xl font-regular text-center font-display">
        {decodedHabitName}
      </h1>
      <Link
        href="/"
        className="flex items-center font-sans text-md text-neutral-300 gap-1"
      >
        <ArrowIcon width={24} height={24} />
        Voltar
      </Link>

      <Calendar habit={decodedHabitName} habitStreak={habitStreak} />
    </main>
  );
}

//OBS: Server Components vs Client Components -> Para implementar a mudança de mês ao clicar nas setas do calendário, precisaremos utilizar Client Components, uma vez que o evento será triggado por meio de uma interação do usuário, portanto, isso não deverá ser feita do lado do servidor com server components, mas sim do lado do cliente que está realizando a ação em tela. O mesmo se aplica para qualquer evento que esteja relacionado diretamente com algum evento do browser parecido como digitação, hooks etc. Em outras palavras, esses tipos de eventos acontecem no browser, logo, para isso funcionar, o usuário precisa ter acesso ao código do projeto, ou seja, o código precisa estar disponibilizado no browser (client component) e não no servidor (server component). Para seguir essa regra, será criado o client component separado chamado <Calendar/> que será desacoplado do server component desse arquivo
