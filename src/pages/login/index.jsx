import { signIn, useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "@/styles/Login.module.css"


export default function login(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [pwd, setPwd] = useState('password')
    const [visible, setVisible] = useState('block')
    const [hide, setHide] = useState('none')
    
    const {data: session} = useSession()

    const onSubmit = (e) =>{
        e.preventDefault()
        
        signIn('credentials')
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
                >
                    <div className={styles.formControl}>
                        <input 
                            type="email" 
                            name="email" 
                            value={user} 
                            placeholder="E-mail" 
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <input 
                            type={pwd} 
                            name="password" 
                            value={password} 
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
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
                </form>
            </div>
        </>
    )   
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if(session){
        return {
            redirect: {
                destination: '/',
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