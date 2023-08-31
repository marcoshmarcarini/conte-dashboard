import { signIn, useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/Login.module.css"
import { useRouter } from "next/router"

export default function login(){
    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const [pwd, setPwd] = useState('password')
    const [visible, setVisible] = useState('block')
    const [hide, setHide] = useState('none')
    
    const {data: session} = useSession()

    const router = useRouter()
    

    const onSubmit = async (e) =>{
        e.preventDefault()
        
        const res = await signIn('credentials',{
            email: userInfo.email,
            password: userInfo.password,
        })
        console.log(res)
    }

    const handleVisible = () => {
        setPwd('text')
        setVisible('none')
        setHide('block')
    }
    const handleHide = () => {
        setPwd('password')
        setVisible('block')
        setHide('none')
    }
    

    return(
        <>
            <div className={`flex justify-center items-center h-screen`}>
                <div className={styles.bkLogin}>
                    <Image src='/img/bk-purple.svg' width={1920} height={1080} alt="bk"/>
                </div>
                <form 
                    onSubmit={onSubmit} 
                    className={`${styles.formularioLogin}`}
                    method="Post"
                >
                    <div className={styles.formControl}>
                        <input 
                            type="email" 
                            name="email" 
                            value={userInfo.email} 
                            placeholder="E-mail" 
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <input 
                            type={pwd} 
                            name="password" 
                            value={userInfo.password} 
                            placeholder="Senha"
                            onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                        />
                        <div className={styles.pwdVisibleOrHide}>
                            <Image 
                                width="24" 
                                height="24" 
                                src="https://img.icons8.com/material-rounded/24/ffffff/visible.png" 
                                alt="visible" 
                                onClick={handleVisible}
                                style={{display: visible}}
                            />
                            <Image 
                                width="24" 
                                height="24" 
                                src="https://img.icons8.com/material-rounded/24/ffffff/hide.png" 
                                alt="hide" 
                                onClick={handleHide}
                                style={{display: hide}}
                            />
                        </div>
                    </div>
                    <input 
                        type="submit" 
                        name="enviar" 
                        value={`Entrar`}
                        className={`${styles.btnSubmitLogin}`}
                    />

                    {/* <div>
                        <p>Acesse rapidamente</p>
                        <button onClick={() => signIn("google")}>Entrar</button>
                    </div> */}
                </form>
                
            </div>
        </>
    )   
}

export const getServerSideProps = async (context) => {
    
    const session = await getSession(context)
   /* 
        Com essa lógica, posso ir adicionando as rotas de cada cliente e criando para cada um uma 
        rota e levando eles para cada uma que eu quero. E dando acesso diferente também. 
   */ 
   if(session){
    const userEmail = session.user.email
        if(userEmail === 'marcoshmarcarini@hotmail.com'){
            return{
                redirect: {
                    destination: '/solicitacao',
                    permanent: false
                }
            }
        }else{
            return{
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
   }

   return{
        props: {session}
   }
}