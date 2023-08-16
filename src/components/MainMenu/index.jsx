import styles from '@/components/MainMenu/MainMenu.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MainMenu(){
    const [altura, setAltura] = useState('80px')
    const home = '/'
    const dashboard = '/dashboard'
    const notasFiscais = '/#notas-fiscais'

    useEffect(() => {
        handleEncurta
        
    }, [])
    
    const handleEncurta = () =>{
        setAltura('50px')
    }

    const handleAbre = () =>{
        setAltura('80px')
    }

    return(
        <>
            <nav className={styles.mainMenu} style={{height:altura}}>
                <div className={styles.navBrand}>
                    NavBrand
                </div>
                <div className={styles.listMenu}>
                    <ul>
                        <li><Link href={home} onClick={handleAbre}>Home</Link></li>
                        <li><Link href={dashboard}>Dashboard</Link></li>
                        <li><Link href={notasFiscais} onClick={handleEncurta}>Notas Fiscais</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}