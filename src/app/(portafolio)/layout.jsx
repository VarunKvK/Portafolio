import {Lato} from 'next/font/google'
import '../globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <main className='dark:bg-[#282F30] bg-[#f1f1f1f]'>
        {children}
         </main>
        </body>
    </html>
  );
}
