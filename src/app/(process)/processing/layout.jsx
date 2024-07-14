import {Lato} from 'next/font/google'
import '../../globals.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
        {children}
         </main>
        </body>
    </html>
  );
}
