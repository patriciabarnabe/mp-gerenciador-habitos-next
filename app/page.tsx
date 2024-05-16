export default function Home() {
  //Os hábitos foram criados como um objeto por causa do uso do Redis por meio do Vercel KV no backend. O Redis é um banco de dados de chave-valor, então ficará mais fácil se uilizarmos um objeto ao invés de um array, por exemplo
  const habits = {
    estudar: {
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
          <div key={habit}>
            {habit} - {JSON.stringify(habitStreak)}
          </div>
        ))}
    </main>
  );
}
