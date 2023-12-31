import styles from '@/styles/Solicitacao.module.css'
import { getSession, useSession } from 'next-auth/react'
import MainMenu from '@/components/Solicitacao/MainMenu'
import FireStore from '@/components/Solicitacao/FireStore'
import Rodape from '@/components/Solicitacao/Rodape'



export default function solicitacao(){
    const {data: session} = useSession()
    return(
        <>
            <div className={styles.solicitacaoContent}>
              <header>
                <MainMenu />
              </header>
                <section>
                  <FireStore />
                </section>
              <footer>
                <Rodape />
              </footer>
            </div>
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
        session
      }
    }
}