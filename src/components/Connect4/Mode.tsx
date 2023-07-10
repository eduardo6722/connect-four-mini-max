import Image from 'next/image';

function Mode({ onClick }) {
  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full max-w-[720px] h-[600px]'>
      <button
        className='flex bg-[#616161] hover:bg-[#424242] flex-row gap-2 items-center shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick('human-vs-robot')}
      >
        <Image src='/img/user.png' width={120} height={120} alt='human' />
        <span className='font-bold'>VS</span>
        <Image src='/img/robot.png' width={120} height={120} alt='robot' />
      </button>
      <button
        className='flex bg-[#616161] hover:bg-[#424242] flex-row gap-2 items-center shadow-lg p-4 cursor-pointer hover:shadow-xl duration-300 rounded-lg'
        onClick={() => onClick('human-vs-human')}
      >
        <Image src='/img/user.png' width={120} height={120} alt='human' />
        <span className='font-bold'>VS</span>
        <Image src='/img/user.png' width={120} height={120} alt='human' />
      </button>
    </div>
  );
}

export default Mode;
