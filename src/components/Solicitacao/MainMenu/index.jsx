import styles from '@/components/MainMenu/MainMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LoginBtn from '../../LoginBtn'

export default function MainMenu(){
    const [menuStyles, setMenuStyles] = useState({
        altura: '80px', logo: 150, corLogo: 'none',
        fundo: '#ffffff', corTexto: '#000000'
    })
    const home = '/'
    const dashboard = '/dashboard'
    const notasFiscais = '/#notas-fiscais'
    

    useEffect(() => {
        handleEncurta
    }, [])
    
    const handleEncurta = () =>{
        setMenuStyles({
            altura: '50px', logo: 100, fundo: '#ff8112', corTexto: '#ffffff',
            corLogo: 'brightness(0) invert(1) sepia(0) saturate(0) hue-rotate(0deg)',
        })
    }

    const handleAbre = () =>{
        setMenuStyles({
            altura: '80px', logo: 150, corLogo: 'none',
            fundo: '#ffffff', corTexto: '#000000'
        })
    }


    return(
        <>
            <nav className={styles.mainMenu} style={{height:menuStyles.altura, backgroundColor:menuStyles.fundo}}>
                <div className={styles.navBrand} style={{filter:menuStyles.corLogo}}>
                    <Image src={`img/logo-conte.svg`} width={menuStyles.logo} height={menuStyles.logo} alt={`Conteúdo Gestão de Ideias`} />
                </div>
                <div className={`${styles.listMenu}`}>
                    <ul>
                        <li><Link href={home} onClick={handleAbre} style={{color:menuStyles.corTexto}}>Lançamentos</Link></li>
                        <li><Link href={dashboard} style={{color:menuStyles.corTexto}}>Dashboard</Link></li>
                        <li><Link href={notasFiscais} onClick={handleEncurta} style={{color:menuStyles.corTexto}}>Notas Fiscais</Link></li>
                        <li><LoginBtn /></li>
                    </ul>
                </div>
                <div className={`${styles.loginBtnMobile}`}>
                    <ul>
                        <li><LoginBtn/></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}