'use client';

import ArrowBack from '@/components/icons/ArrowBack';
import { useRouter } from 'next/navigation';

function HowToPlay() {
  const { back } = useRouter();

  return (
    <div className='w-full flex min-h-screen justify-center items-center'>
      <div className='p-8 rounded-lg max-w-[800px] mx-auto'>
        <div className='flex items-center justify-between gap-2 mb-8'>
          <button
            className='bg-[red] hover:bg-[#ec0000] duration-300 rounded-md h-[36px] px-2'
            onClick={back}
          >
            <ArrowBack />
          </button>
          <h2 className='text-2xl font-bold'>Como jogar Connect 4</h2>
          <div />
        </div>
        <p className='mb-4'>
          Connect 4 é um jogo de estratégia para dois jogadores. O objetivo é
          ser o primeiro a formar uma linha contínua de quatro peças da mesma
          cor (vertical, horizontal ou diagonal) em um tabuleiro 6x7.
        </p>
        <h3 className='text-lg font-bold mb-2'>Regras:</h3>
        <ul className='list-disc pl-6 mb-4'>
          <li>
            Cada jogador tem uma cor de peça, normalmente vermelho (🔴) ou
            amarelo (🟡).
          </li>
          <li>
            Os jogadores alternam turnos colocando uma peça em qualquer uma das
            colunas disponíveis.
          </li>
          <li>
            A peça cairá para a posição mais baixa possível na coluna
            selecionada.
          </li>
          <li>
            O jogo continua até que um jogador consiga formar uma linha contínua
            de quatro peças da mesma cor.
          </li>
          <li>
            Se todas as colunas estiverem preenchidas e ninguém tiver formado
            uma linha contínua de quatro peças, o jogo termina em empate.
          </li>
        </ul>
        <h3 className='text-lg font-bold mb-2'>Como jogar:</h3>
        <ol className='list-decimal pl-6'>
          <li>
            Decida quem será o jogador 1 (🔴) e quem será o jogador 2 (🟡).
          </li>
          <li>
            O jogador 1 começa selecionando uma coluna e colocando sua peça na
            posição mais baixa.
          </li>
          <li>O jogador 2 então faz o mesmo, alternando os turnos.</li>
          <li>
            Continue alternando os turnos até que um jogador vença ou o jogo
            termine em empate.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default HowToPlay;
