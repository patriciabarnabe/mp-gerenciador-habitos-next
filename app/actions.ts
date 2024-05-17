"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function deleteHabit(habit: string) {
  await kv.hdel("habits", habit);

  //Recarregar a página inicial com dados vindo diretamente do banco de dados e não do cache
  revalidatePath("/");
}
