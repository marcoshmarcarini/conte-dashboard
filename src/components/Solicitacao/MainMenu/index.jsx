import styles from './MainMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import LoginBtn from '../LoginBtn'


export default function MainMenu(){
    const home = '/solicitacao'
    const dashboard = '/solicitacao/historico'


    return(
        <>
            <nav className={styles.mainMenu}>
                <div className={styles.navBrand}>
                    <Link href={home}>
                        <Image src={`/img/logo-conte.svg`} width={100} height={100} alt={`Conteúdo Gestão de Ideias`} />
                    </Link>
                </div>
                <div className={`${styles.listMenu}`}>
                    <ul>
                        <li><Link href={home}>Solicitações</Link></li>
                        <li><Link href={dashboard}>Histórico</Link></li>
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