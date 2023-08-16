'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import FireStore from '@/components/FireStore'
import MainMenu from '@/components/MainMenu'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
    <MainMenu />
    <div>
      <FireStore />
    </div>
   </>
  )
}
