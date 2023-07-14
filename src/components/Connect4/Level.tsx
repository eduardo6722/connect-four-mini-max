import { GameLevels } from './Connect4';

function Level({ onClick }) {
  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full max-w-[310px] p-2 md:h-[600px]'>
      <button
        className='w-full h-[92px] md:h-[152px] text-[28px] md:text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick(GameLevels.easy)}
      >
        Fácil
      </button>
      <button
        className='w-full h-[92px] md:h-[152px] text-[28px] md:text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick(GameLevels.medium)}
      >
        Médio
      </button>
      <button
        className='w-full h-[92px] md:h-[152px] text-[28px] md:text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick(GameLevels.hard)}
      >
        Difícil
      </button>
    </div>
  );
}

export default Level;
