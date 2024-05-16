export default function NewHabit() {
  //Função assíncrona (roda do lado do servidor) do Server Action que irá conectar-se com o servidor
  async function newHabit(formData: FormData) {
    //Falar explicitamente que esse código deverá rodar no servidor (instrução/diretiva para o uso da Server Action)
    "use server";

    const habit = formData.get("habit"); //Pegando o valor do input de habit pelo seu name
  }

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-4xl font-light text-center font-display text-white">
        novo hábito
      </h1>
      <form action={newHabit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="habit"
          id="habit"
          className="p-2 font-sans text-xl text-white rounded-md bg-neutral-800"
        />
        <button
          type="submit"
          className="bg-[#45EDAD] font-display text-neutral-900 font-regular text-2xl p-2 rounded-md mt-8"
        >
          cadastrar
        </button>
        <button className="bg-neutral-800 text-[#F85858] font-display font-regular text-2xl p-2 rounded-md">
          cancelar
        </button>
      </form>
    </main>
  );
}

//Server Component do NextJS 13: componente está sendo renderizado no servidor. Isso quer dizer que eu consigo chamar funções que funcionam do lado do servidor, inclusive chamadas para APIs. Sendo assim, ao invés desse formulário salvar e trabalhar com o estado em alguma variável de estado (use state) como acontece no lado do cliente (Client Component) no React puro, vamos enviar esse formulário direto para o servidor utilizando uma Server Action que permite comunicação direta com o servidor. Isso é semelhante a uma chamada para API, mas não é de fato uma requisição fetch, pois estamos simplesmente fazendo um submit do formulário por meio dessa funcionalidade do NextJS.
