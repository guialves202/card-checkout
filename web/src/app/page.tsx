import Image from 'next/image'
import Header from "./components/header";

export default function Home() {
  return (
    <main className='h-[100vh]'>
      <Header></Header>
      <div className='grid grid-cols-2 grid-rows-1 h-[88%] justify-around w-full px-10 py-[8rem]'>
        <Image
          src="./bank.svg"
          width={600}
          height={600}
          alt='bank'
          className='block'
        />

        <div className='flex flex-col w-[90%] gap-5'>
          <h1 className='text-5xl'>Tenha N Possibilidades de produtos para N Possibilidades na vida</h1>
          <h2 className='text-2xl'>O que você precisa pra ficar no controle da sua vida financeira tem no app do Nubank.</h2>
        </div>
      </div>
    </main>
  );
}
