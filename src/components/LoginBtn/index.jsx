import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router"; // Importe o useRouter
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/LoginBtn/LoginBtn.module.css"
import { useEffect, useState } from "react";

export default function LoginBtn() {
  const { data: session } = useSession();
  const router = useRouter(); // Instancie o useRouter
  const username = session?.user?.name
  const email = session?.user?.email
  const pic = session?.user?.image
  const home = '/'
  const dashboard = '/dashboard'
  const notasFiscais = '/#notas-fiscais'

  const [menu, setMenu] = useState({
    tela: 'none', animation: ''
  })
  
  const fadeIn = `
          from{
              transform: translate(-20px, 60px);
              opacity: 0;
          }
          to{
              transform: translate(-20px, 70px);
              opacity: 1;
          }`
  const fadeOut = `
          from{
              transform: translate(-20px, 70px);
              opacity: 1;
          }
          to{
              transform: translate(-20px, 60px);
              opacity: 0;
          }`

  useEffect(() => {
    handleAbreMenu
  }, [])

  useEffect(() => {
    handleFechaMenu
  }, [])

  

  const handleAbreMenu = () => {
    setMenu({
      tela: 'flex', animation: `${fadeIn} 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
    })
  }

  const handleFechaMenu = () => {
    setMenu({
      tela: 'none', animation: `${fadeOut} 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
    })
  }


  if (email) {
    return (
      <>
        <div className={`flex items-center gap-3 ${styles.profileData}`}>
          <p className={`text-slate-500 text-sm`}>
            Olá, {username}
          </p>
          <Image src={pic} width={50} height={50} alt="profile" className={`${styles.profilePic}`}/>
          <button
            className={`border border-orange-500 rounded-sm p-2 text-white bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 transition transform`}
            onClick={() => {
              signOut();
              router.push("/"); // Use o roteador para redirecionar
            }}
          >
            Encerrar
          </button>
        </div>
        <div className={styles.menuMobile}>
                <div className={`flex items-center gap-3`}>
                  <p className={`text-slate-500 text-sm`}>
                    Olá, {username}
                  </p>
                  <Image src={pic} width={50} height={50} alt="profile" className={`${styles.profilePic}`}/>
                </div>
                <div className={`flex flex-col items-end`}>
                  <div className={`${styles.menuBtn} toggle-menu `} onClick={menu.tela == 'none' ? handleAbreMenu : handleFechaMenu}>
                      <Image width="50" height="50" src="https://img.icons8.com/ios-filled/50/ff8112/menu--v6.png" alt="menu--v6" />
                  </div>
                  
                  <div className={`${styles.listMenuMobile}`} style={{display: menu.tela, animation: menu.animation}}>
                      <ul>
                          <li><Link href={home}>Lançamentos</Link></li>
                          <li><Link href={dashboard}>Dashboard</Link></li>
                          <li><Link href={notasFiscais} >Notas Fiscais</Link></li>
                          <li>
                            <button
                              className={`border border-orange-500 rounded-sm p-2 text-white bg-orange-400 hover:bg-white hover:text-orange-400 hover:border-orange-400 transition transform`}
                              onClick={() => {
                                signOut();
                                router.push("/"); // Use o roteador para redirecionar
                              }}
                            >
                              Encerrar
                            </button>
                          </li>
                      </ul>
                  </div>
                </div>
        </div>
      </>
    );
  } else {
    // Redirecionamento condicional no lado do cliente
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }
}