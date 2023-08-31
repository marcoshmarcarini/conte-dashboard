import MainMenu from "@/components/VendaNova/MainMenu"
import Rodape from "@/components/Rodape"
import Firestore from "@/components/VendaNova/Firestore"
import { getSession, useSession } from 'next-auth/react'
import styles from '@/styles/Vendanova.module.css'


export default function vendanova(){
    const {data: session} = useSession()
    return(
        <>
            <header>
              <MainMenu />
            </header>
              <section>
                <Firestore />
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
        session
      }
    }
}
  