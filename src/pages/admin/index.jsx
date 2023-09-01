import Tables from "@/components/Admin/Tables";
import MainMenu from "@/components/MainMenu";
import Rodape from "@/components/Rodape";
import { getSession, useSession } from "next-auth/react";


export default function admin(){
    const {data: session} = useSession()
    return(
        <>
            <header>
                <MainMenu />
            </header>
            <section className={`flex justify-center items-center`}>
                <Tables />
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