'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getDocs, collection, query, orderBy, where } from "firebase/firestore"
import { db } from "@/utils/firebase"
import styles from "./Historico.module.css"

export default function Historico() {
    const [solicitacoes, setSolicitacoes] = useState([])
    const { data: session } = useSession()
    console.log(session.user.email)

    const recebido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center'
    const comPrefeitura = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center'
    const concluido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center'
    const erroDocumentacao = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-1 flex justify-center'

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            if (!session) {
                return {
                    redirect: '/'
                }
            }
            const colecao = collection(db, 'solicitacao')
            const q = query(
                colecao,
                orderBy('timeStamp', 'desc'),
                where('userID', '==', session.user.email)
            )
            const snapShot = await getDocs(q)
            const snapData = []
            snapShot.forEach((doc) => {
                snapData.push({ id: doc.id, ...doc.data() })
            })
            setSolicitacoes(snapData)
        }

        fetchSolicitacoes()
    }, [session])

    useEffect(() => {
        console.log(solicitacoes)
    }, [solicitacoes])


    return (
        <>
            <div className={styles.historicoContainer}>
                <div className={styles.historicoTitle}>Histórico de solicitações</div>
                <div className={styles.historicoContent}>
                    {solicitacoes.map((solicitacao, id) => (
                        <div key={id} className={`shadow ${styles.historicoCard}`}>
                            <p className={styles.historicoCampanha}>{solicitacao.campanha}</p>
                            <p className={styles.historicoValor}>R$ {Number(solicitacao.valor).toFixed(2).replace('.', ',')}</p>
                            <p className={` 
                                ${solicitacao.status === 'Recebido' ? recebido :
                                    solicitacao.status === 'Com Prefeitura' ? comPrefeitura :
                                        solicitacao.status === 'Concluído' ? concluido :
                                            solicitacao.status === 'Erro Documentação' ? erroDocumentacao :
                                            ''
                                } ${styles.historicoStatus}`
                            }>
                                {solicitacao.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

