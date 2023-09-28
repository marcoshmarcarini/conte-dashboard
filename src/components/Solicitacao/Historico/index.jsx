'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { getDocs, collection, query, orderBy, where, addDoc, doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from "@/utils/firebase"
import styles from "./Historico.module.css"
import Image from "next/image"

export default function Historico() {
    const [solicitacoes, setSolicitacoes] = useState([])
    const { data: session } = useSession()
    const [novaNota, setNovaNota] = useState({
        anexoNF: [],
    })

    const [selectedFiles, setSelectedFiles] = useState([])
    const [updatingRequestId, setUpdatingRequestId] = useState(null)

    const router = useRouter()

    //Badges
    const recebido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center'
    const comPrefeitura = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center'
    const concluido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center'
    const erroDocumentacao = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-1 flex justify-center'


    const handleFileChange = (e) => {
        const files = e.target.files
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files])
    }

    const handleUpdateRequest = async (requestId, e) => {
        e.preventDefault()
        console.log('Handle Update Request chamado com requestId:', requestId);

        setUpdatingRequestId(requestId)


        if (!session || !session.user || !session.user.email) {
            console.error('ID do usuário ausente na sessão.')
            return
        }

        if (requestId) {
            const storageRef = ref(storage, 'anexos')

            const uploadedFileURLs = await Promise.all(
                selectedFiles.map(async (file) => {
                    const fileRef = ref(storageRef, file.name)
                    await uploadBytes(fileRef, file)
                    const downloadURL = await getDownloadURL(fileRef)
                    console.log('URL do arquivo enviado:', downloadURL);
                    return downloadURL
                })
            )

            console.log('URLs dos arquivos enviados:', uploadedFileURLs);

            await updateDoc(doc(db, 'solicitacao', requestId), {
                anexoNF: uploadedFileURLs,
                status: 'Recebido'
            })

            console.log('Documento atualizado com sucesso.');

            setUpdatingRequestId(null)
            setSelectedFiles([])
            setNovaNota({ anexoNF: [] })
            router.reload()
        } else {
            console.log('Algo deu Errado')
        }
    }

    /* const handleRetryDocumentacao = (requestId) => {
        setUpdatingRequestId(requestId)
    } */


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
    /* 
    ${styles.historicoCard } 
    styles.historicoCampanha
    
    */
    return (
        <>
            <div className={styles.historicoContainer}>
                <div className={styles.historicoTitle}>Histórico de solicitações</div>
                <div className={styles.historicoContent}>
                    {solicitacoes.map((solicitacao, id) => (
                        <div key={id} className={`  bg-white space-y-3 p-4 rounded-lg shadow`}>
                            <div className={`flex items-center space-x-2 text-sm`}>
                                <p className={`font-bold text-orange-500`}>{solicitacao.campanha}</p>
                            </div>
                            <div className={`flex items-center space-x-2 text-sm`}>
                                <p className={`text-gray-500 flex`}>
                                    <Image width={20} height={20} src="https://img.icons8.com/fluency-systems-filled/20/e67e22/new-document.png" alt="new-document" />
                                    {solicitacao.pppi}
                                </p>
                                <p className={`text-gray-500 flex`}>
                                    <Image width={20} height={20} src="https://img.icons8.com/fluency-systems-filled/20/e67e22/calendar.png" alt="calendar" />
                                    {solicitacao.dataVeiculacao}
                                </p>

                            </div>
                            <div className={`flex items-center space-x-2 text-sm justify-between`}>
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



                            {solicitacao.status === 'Erro Documentação' ? (
                                <div className={styles.historicoUpload}>
                                    <form>
                                        <p className={`mb-3`}>
                                            Reenviar Upload
                                        </p>
                                        <div className={`flex items-center space-x-2 text-sm justify-between`}>
                                            <label htmlFor={`anexos-${solicitacao.id}`}>
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    src="https://img.icons8.com/metro/30/e67e22/upload.png"
                                                    alt="upload"
                                                />
                                            </label>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept=".doc,.docx,.xlx,.xlxs,.pdf,.jpg,.png,.mp4"
                                                multiple={true}
                                                className={`hidden`}
                                                id={`anexos-${solicitacao.id}`}
                                            />
                                            <div className={`border rounded-md bg-orange-500 cursor-pointer py-2 px-3 text-white hover:bg-white hover:border-orange-500 hover:text-orange-500 transition`}>
                                                <button
                                                    onClick={(e) => handleUpdateRequest(solicitacao.id, e)}

                                                >
                                                    Enviar
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            ) : ''}

            </div>
                    ))}
        </div >
            </div >
        </>
    )
}

