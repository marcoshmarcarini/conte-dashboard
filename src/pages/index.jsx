'use client'
//import Image from 'next/image'
import { Inter } from 'next/font/google'
import FireStore from '@/components/FireStore'
import MainMenu from '@/components/MainMenu'
import Rodape from '@/components/Rodape/rodape'
import { getSession, useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession()
  
    return(
      <>
        <MainMenu />
        <FireStore />
        <Rodape />
      </>
    )
  
  
}

export const getServerSideProps = async(context) => {
  const session = await getSession(context)
  if(!session){
    return{
      redirect: {
        destination: '/login',
        pemanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

