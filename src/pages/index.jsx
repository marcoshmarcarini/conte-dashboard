'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import FireStore from '@/components/FireStore'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <>
    <div>
      <FireStore />
    </div>
   </>
  )
}
