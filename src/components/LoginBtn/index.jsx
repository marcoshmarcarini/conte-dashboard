'use client'
import { useSession, signOut } from "next-auth/react";

export default function LoginBtn(){
    const {data: session} = useSession()
    console.log(session)

    
    if(session.user.email){
        
        console.log(session.user.name)
        return(
            <>
                <div className={`flex items-center gap-3`}>
                    <p className={`text-slate-500 text-sm`}>
                        Olá, {session.user.name}
                    </p> 
                    <button
                        className={`border border-orange-500 rounded-sm p-2 text-white bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 transition transform`} 
                        onClick={() => signOut()}>
                            Encerrar
                    </button>
                </div>
                
            </>
        )
    }
    return{
        redirect: '/login'
    }
}