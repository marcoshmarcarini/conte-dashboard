'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import MainMenu from '@/components/MainMenu'
import Rodape from '@/components/Rodape'


export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (
      session.user.email === 'gustavo@comconteudo.com.br' ||
      session.user.email === 'thais@comconteudo.com.br' ||
      session.user.email === 'priscila@comconteudo.com.br' ||
      session.user.email === 'neide@comconteudo.com.br' ||
      session.user.email === 'atendimento@comconteudo.com.br'
    ) {
      router.push('/admin')
    } else {
      router.push('/solicitacao')
    }
  })





  return (
    <>
      <MainMenu />
      {/* <FireStore /> */}
      <Rodape />
    </>
  )

}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

