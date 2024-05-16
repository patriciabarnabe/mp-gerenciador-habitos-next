import Image from "next/image";

export default function DayState({ day }: { day: boolean | undefined }) {
  //Variável para representar a imagem do status do dia. Uma outra maneira de representar os tipos é criando-o direto na criação da variável
  let image: [string, string, number?] = [
    "/images/dot.svg",
    "Ícone de ponto cinza",
    12,
  ];

  //Validar se o hábito foi marcado como concluído ou falho'
  if (day === true)
    image = ["/images/checked.svg", "Ícone de concluído verde", 20];
  if (day === false)
    image = ["/images/fail.svg", "Ícone de falha vermelho", 20];

  //Desestruturar o array acima para ser passado dinamicamente para o componente abaixo
  const [src, alt, size] = image;

  return (
    <div className="flex items-center justify-center w-9 h-9">
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}
