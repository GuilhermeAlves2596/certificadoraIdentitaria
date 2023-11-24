/* eslint-disable @next/next/no-page-custom-font */

"use client"
import { useRouter } from 'next/router'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {


  return (
    <html lang="pt-br">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </head>

      <body className={inter.className}>
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  )
}
