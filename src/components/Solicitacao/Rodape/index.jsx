import Image from "next/image"
import styles from '@/components/Solicitacao/Rodape/Rodape.module.css'

export default function Rodape(){
    return(
        <div className={`${styles.rodapeArea}`}>
          <Image src={`/img/logo-deitada.svg`} width={100} height={30} alt="Agência Conteúdo"/>
        </div>
    )
}