import styles from '@/components/MainMenu/MainMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function MainMenu(){
    const [altura, setAltura] = useState('80px')
    const [logo, setLogo] = useState(150)
    const [corLogo, setCorLogo] = useState('none')
    const [fundo, setFundo] = useState('#ffffff')
    const [corTexto, setCorTexto] = useState('#000')
    const home = '/'
    const dashboard = '/dashboard'
    const notasFiscais = '/#notas-fiscais'

    useEffect(() => {
        handleEncurta
        
    }, [])
    
    const handleEncurta = () =>{
        setAltura('50px')
        setFundo('#ff8112')
        setCorTexto('#ffffff')
        setCorLogo('brightness(0) invert(1) sepia(0) saturate(0) hue-rotate(0deg)')
        setLogo(100)
    }

    const handleAbre = () =>{
        setAltura('80px')
        setFundo('#ffffff')
        setCorTexto('#000')
        setCorLogo('none')
        setLogo(150)
        
    }

    return(
        <>
            <nav className={styles.mainMenu} style={{height:altura, backgroundColor:fundo}}>
                <div className={styles.navBrand} style={{filter:corLogo}}>
                    <Image src={`img/logo-conte.svg`} width={logo} height={logo} alt={`Conteúdo Gestão de Ideias`} />
                </div>
                <div className={styles.listMenu}>
                    <ul>
                        <li><Link href={home} onClick={handleAbre} style={{color:corTexto}}>Home</Link></li>
                        <li><Link href={dashboard} style={{color:corTexto}}>Dashboard</Link></li>
                        <li><Link href={notasFiscais} onClick={handleEncurta} style={{color:corTexto}}>Notas Fiscais</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}