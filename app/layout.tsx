import type { Metadata } from "next";
import { Inter, Dosis } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

//Criando fontes variáveis que serão utilizadas em conjunto com o Tailwind no arquivo tailwind.config.js
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dosis = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

export const metadata: Metadata = {
  title: "Meta Diária",
  description: "Gerenciador de Hábitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dosis.variable} ${inter.variable} flex flex-col items-center mt-10 bg-neutral-900`}
      >
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo checked - meta diária"
            width={200}
            height={200}
          />
        </Link>

        {children}
      </body>
    </html>
  );
}
