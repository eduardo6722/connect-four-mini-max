import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Connect4 - Minimax</title>
      </head>

      <body className={inter.className}>
        {children}
        <footer className='w-full md:absolute bottom-4 flex md:flex-row flex-col justify-center items-center gap-4 p-2'>
          <a
            href='https://www.github.com/eduardo6722'
            target='_blank'
            className='text-white hover:underline hover:text-[#4670e2] duration-300'
          >
            Desenvolvido por <strong>Eduardo G. de Freitas</strong>
          </a>
          <span className='hidden md:block'>|</span>
          <a
            href='https://github.com/eduardo6722/connect-four-mini-max'
            target='_blank'
            className='text-white hover:underline hover:text-[#4670e2] duration-300'
          >
            Github
          </a>
          <span className='hidden md:block'>|</span>
          Licença MIT
        </footer>
      </body>
    </html>
  );
}
