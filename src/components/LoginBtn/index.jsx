import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn(){
    const {data: session} = useSession()
    if(session){
        return(
            <>
                Logado como {session.user.email} <br />
                <button onClick={() => signOut()}>Encerrar</button>
            </>
        )
    }
    return(
        <>
            Não logado <br />
            <button onClick={() => signIn()}>Entrar</button>
        </>
    )
}