import Rodape from "@/components/Rodape";
import Historico from "@/components/Solicitacao/Historico";
import MainMenu from "@/components/Solicitacao/MainMenu";
import { getSession, useSession } from 'next-auth/react'

export default function historico() {
    const {data: session} = useSession()

    return (
        <>
            <header>
                <MainMenu />
            </header>
            <section>
                <Historico />
            </section>
            <footer>
                <Rodape />
            </footer>
        </>
    )
}


/* Para as demais páginas funcionarem em uma sessão deve-se utilizar o getServerSideProps */
export const getServerSideProps = async(context) => {
    const session = await getSession(context)
  
    if(!session){
      return{
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {
        session,
      }
    }
}