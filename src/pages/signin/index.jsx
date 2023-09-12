import Signin from "@/components/Signin"
import Image from "next/image"
import styles from "../../styles/Signin.module.css"

export default function signin() {
    return (
        <>

            <div className={`flex flex-col gap-5 justify-center items-center h-screen`}>
                <Image
                    src={`/img/bk-purple.svg`}
                    width={1920}
                    height={1080}
                    alt="Conteúdo"
                    className={`${styles.imageBk}`}
                />
                <Signin className={styles.card}/>
            </div>
        </>
    )
}

