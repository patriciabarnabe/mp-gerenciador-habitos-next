"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function deleteHabit(habit: string) {
  await kv.hdel("habits", habit);

  //Recarregar a página inicial com dados vindo diretamente do banco de dados e não do cache
  revalidatePath("/");
}

type ToggleHabitParams = {
  habit: string;
  habitStreak: Record<string, boolean> | null;
  date: string | null;
  done?: boolean; //Tipo booleano opcional, ou seja, boolean ou undefined
};

export async function toggleHabit({
  habit,
  habitStreak,
  date,
  done,
}: ToggleHabitParams) {
  if (!habitStreak || !date) return;

  //Sequência atualizada de hábitos
  const updatedHabitStreak = {
    //O hábito que está sendo passado, vai passar a ser o que ele já tinha, exceto a informação de data que será atualizada
    [habit]: {
      ...habitStreak,
      [date]: done === undefined ? true : !done, //Na primeira vez ele será marcado como verdadeiro, e das vezes em diante ele vai ser marcado com o oposto do que ele era (funcionalidade de toggle)
    },
  };

  await kv.hset("habits", updatedHabitStreak);
  revalidatePath("/");
}
