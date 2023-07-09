function Level({ onClick }) {
  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full max-w-[310px] h-[600px]'>
      <h1 className='text-xl font-bold'>Selecione o nível</h1>
      <button
        className='w-full h-[152px] text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick('easy')}
      >
        Fácil
      </button>
      <button
        className='w-full h-[152px] text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick('normal')}
      >
        Médio
      </button>
      <button
        className='w-full h-[152px] text-[48px] font-bold bg-[#616161] hover:bg-[#424242] shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick('hard')}
      >
        Difícil
      </button>
    </div>
  );
}

export default Level;
