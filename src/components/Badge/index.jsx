'use client'
import { useEffect, useState } from "react"
import { db } from "@/utils/firebase"
import {collection, getDocs, updateDoc} from "firebase/firestore"
import styles from "./Badge.module.css"

export default function Badge(){

    const [status, setStatus] = useState('Recebido')
    const [badge, setBadge] = useState('p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center')
    const [solicitacao, setSolicitacao] = useState([])


    const recebido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center'
    const comPrefeitura = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center'
    const concluido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center'



    const handleClickRecebido = () => {
        setBadge('p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center')
        setStatus('Com Prefeitura')
    }


    const LerSolicitacoes = async () => {
        const colecao = collection(db, 'solicitacao')
        const snapshot = await getDocs(colecao)
        const snapData = []
        snapshot.forEach((doc) => {
            snapData.push({id: doc.id, ...doc.data()})
            console.log(snapData)
        })

        setSolicitacao(snapData)
        
    }

    useEffect(() => {LerSolicitacoes}, [])




    return(
        <>
           {solicitacao.map((data, id) => (
                <button key={id}>
                    {data.status}
                </button>
           ))}
                
           
        </>
    )
}