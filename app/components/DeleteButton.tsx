"use client";

import Image from "next/image";
import { deleteHabit } from "../actions";

export default function DeleteButton({ habit }: { habit: string }) {
  return (
    <button onClick={() => deleteHabit(habit)}>
      <Image
        src="/images/trash.svg"
        alt="Ícone de lixeira vermelha"
        width={20}
        height={20}
      />
    </button>
  );
}

//Queremos utilizar o evento onClick no botão de deletar, mas essa função é do tipo cliente, ou seja, é triggada através da ação do usuário e precisa ser armazenada no browser. Para isso, precisamos usar o client component, mas o arquivo onde estava essa parte do código (page.tsx da pastta app) é um server components, então precisamos criar esse novo client component (filho) separadamente para ser chamado dentro do server component (pai)

//É uma boa prática fazer essa extração pontual das ações/eventos de browser para client components, ao invés de transformar tudo em um client component. Se fizessemos isso, estaríamos perdendo toda o diferencial e a vantagem do server components do NextJS. Quanto menos código precisar ser enviado para o cliente, mais leve será a minha aplicação, logo, a estratégia é tentar utilizar menos client components possível
