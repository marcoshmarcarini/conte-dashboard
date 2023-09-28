'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { db } from "../../../utils/firebase"
import { collection, getDocs, orderBy, query, deleteDoc, updateDoc, doc, deleteField } from "firebase/firestore"
import styles from "./Tables.module.css"
import ExportarDados from "@/components/ExportarDados"


export default function Tables() {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [statusEdit, setStatusEdit] = useState({})
    const recebido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center'
    const comPrefeitura = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center'
    const concluido = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center'
    const erroDocumentacao = 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-1 flex justify-center'

    const MostrarSolicitacoes = async () => {
        const colecao = collection(db, 'solicitacao')
        console.log(colecao)
        const q = query(
            colecao,
            orderBy('timeStamp', 'asc')
        )
        const snap = await getDocs(q)
        const snapData = []
        snap.forEach((doc) => {
            snapData.push({ id: doc.id, ...doc.data() })
        })
        setSolicitacoes(snapData)
    }

    useEffect(() => {
        MostrarSolicitacoes()
    }, [])


    /* Deletar nota */
    const deletarNota = async (id) => {
        await deleteDoc(doc(db, 'solicitacao', id))
        MostrarSolicitacoes()
    }

    /* Comportamento do Status */
    const handleCollapseStatus = (id) => {
        setStatusEdit((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }))
    }

    const handleStatusChange = async (solicitacao, novoStatus) => {
        const solicitaRef = doc(db, 'solicitacao', solicitacao.id)

        await updateDoc(solicitaRef, { status: novoStatus })


        if (novoStatus === 'Erro Documentação') {
            await updateDoc(solicitaRef, {
                anexoNF: deleteField()
            })
        }

        await MostrarSolicitacoes()

    }

    /* const updateSolicitacaoInFirestore = async (solicitacao) => {
        const solicitaRef = doc(db, 'solicitacao', solicitacao)
        await updateDoc(solicitaRef, updateSolicitacoes)
    } */






    return (
        <>
            <div className={`container ${styles.notasList} flex flex-col gap-5 justify-center items-center m-auto`} id={`notas-fiscais`}>
                <h2 className={`text-center font-bold text-lg`}>Solicitações</h2>
                <div className={` rounded-lg shadow hidden lg:block transition pl-2 pr-2`}>
                    <table className={`table-auto`} id={`tabela-dados`}>
                        <caption className={`caption-top mt-2`}>
                            Informações sobre as solicitações de pagamento.
                        </caption>
                        <thead className={`bg-gray-50 border-b-2`}>
                            <tr>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Campanha</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Tipo</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>PP/PI</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Nota Fiscal</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Valor</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Data de Veiculação</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Nome Fantasia</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Razão Social</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>CNPJ</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>E-mail válido</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Dados Bancários</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Status</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`}>Anexos</th>
                                <th className={`p-3 text-sm font-semibold tracking-normal text-center ${styles.tdsize}`} colSpan={2}><ExportarDados /></th>
                            </tr>
                        </thead>

                        <tbody className={`divide-y divide-gray-100`}>
                            {solicitacoes.map((solicitacao, id) => (

                                <tr key={id} className={`${id % 2 == 0 ? 'bg-white text-gray-700' : 'bg-gray-400 text-white'}`}>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.campanha}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.tipo}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.pppi}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.notafiscal}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>R$ {Number(solicitacao.valor).toFixed(2).replace('.', ',')}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.dataVeiculacao}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.nomeFantasia}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.razaoSocial}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.cnpj}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>{solicitacao.emailValido}</td>
                                    <td className={`p-3 text-sm whitespace-normal text-center ${styles.tdsize}`}>
                                        Dados Bancários: <br />
                                        <ul className={`list-style-none`}>
                                            <li>{solicitacao.numBanco ? `Nº Banco: ${solicitacao.numBanco}` : ''}</li>
                                            <li>{solicitacao.agencia ? `Agência: ${solicitacao.agencia}` : ''}</li>
                                            <li>{solicitacao.conta ? `Conta: ${solicitacao.conta}` : ''}</li>
                                            <li>{solicitacao.pix ? `PIX: ${solicitacao.pix}` : ''}</li>
                                        </ul>
                                    </td>

                                    <td className={`p-3 text-sm whitespace-wrap  text-center break-keep ${styles.tdsize} `}>
                                        <span className={
                                            `${solicitacao.status === 'Recebido' ? recebido :
                                                solicitacao.status === 'Com Prefeitura' ? comPrefeitura :
                                                    solicitacao.status === 'Concluído' ? concluido :
                                                        solicitacao.status === 'Erro Documentação' ? erroDocumentacao :
                                                            ''
                                            } ${styles.status}`
                                        }
                                            onClick={() => handleCollapseStatus(solicitacao.id)}
                                        >
                                            {solicitacao.status}
                                        </span>
                                        {statusEdit[solicitacao.id] && (
                                            <div className={`${styles.badges}`}>
                                                <p onClick={() => handleStatusChange(solicitacao, 'Com Prefeitura')}>Com Prefeitura</p>
                                                <p onClick={() => handleStatusChange(solicitacao, 'Concluído')}>Concluído</p>
                                                <p onClick={() => handleStatusChange(solicitacao, 'Erro Documentação')}>Erro Documentação</p>
                                            </div>
                                        )}



                                    </td>
                                    <td
                                        className={` ${styles.tdAnexo} ${styles.tdsize}`}
                                    >
                                        {solicitacao.anexoNF ? (
                                            (
                                                <Link
                                                    href={solicitacao.anexoNF.toString()}
                                                    target="_blank"
                                                    className={`${styles.linkAnexo}`}
                                                >
                                                    <Image
                                                        width={30}
                                                        height={30}
                                                        alt="document"
                                                        src={

                                                            String(solicitacao.anexoNF).match(/.zip/) ? `https://img.icons8.com/fluency-systems-filled/48/ffffff/archive-folder.png` :
                                                                String(solicitacao.anexoNF).match(/.doc/) ? `https://img.icons8.com/fluency-systems-filled/50/ffffff/ms-word.png` :
                                                                    String(solicitacao.anexoNF).match(/.docx/) ? `https://img.icons8.com/fluency-systems-filled/50/ffffff/ms-word.png` :
                                                                        String(solicitacao.anexoNF).match(/.xlx/) ? `https://img.icons8.com/ios-glyphs/50/ffffff/ms-excel.png` :
                                                                            String(solicitacao.anexoNF).match(/.xlxs/) ? `https://img.icons8.com/ios-glyphs/50/ffffff/ms-excel.png` :
                                                                                String(solicitacao.anexoNF).match(/.pdf/) ? `https://img.icons8.com/fluency-systems-filled/50/ffffff/pdf.png` :
                                                                                    String(solicitacao.anexoNF).match(/.jpg/) ? `https://img.icons8.com/sf-black-filled/50/ffffff/image.png` :
                                                                                        String(solicitacao.anexoNF).match(/.png/) ? `https://img.icons8.com/sf-black-filled/50/ffffff/image.png` :
                                                                                            String(solicitacao.anexoNF).match(/.mp4/) ? `https://img.icons8.com/fluency-systems-filled/50/ffffff/video.png` :

                                                                                                ''
                                                        }
                                                    />
                                                </Link>
                                            )) : ''}

                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className={styles.btnRemove}
                                            onClick={() => deletarNota(solicitacao.id)}
                                        >
                                            <Image
                                                width="20"
                                                height="20"
                                                src="https://img.icons8.com/ios-filled/20/ffffff/delete-sign--v1.png"
                                                alt="delete-sign--v1"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={`lg:hidden`}><ExportarDados /></div>
                <div className={`grid grid-cols-1 gap-4 lg:hidden transition`}>
                    {solicitacoes.map((solicitacao, id) => (
                        <div key={id} className={`bg-white space-y-3 p-4 rounded-lg shadow`}>
                            <div className={`flex items-center space-x-2 text-sm`}>
                                <div className={`font-bold text-orange-500`}>{solicitacao.campanha}</div>
                                <div className={`text-gray-500 flex`}>
                                    <Image width={20} height={20} src="https://img.icons8.com/fluency-systems-filled/20/e67e22/new-document.png" alt="new-document" />
                                    {solicitacao.pppi}
                                </div>
                                <div className={`text-gray-500 flex`}>
                                    <Image width={20} height={20} src="https://img.icons8.com/fluency-systems-filled/20/e67e22/calendar.png" alt="calendar" />
                                    {solicitacao.dataVeiculacao}
                                </div>
                                <div>
                                    <span className={
                                        `${solicitacao.status === 'Recebido' ? recebido :
                                            solicitacao.status === 'Com Prefeitura' ? comPrefeitura :
                                                solicitacao.status === 'Concluído' ? concluido :
                                                    solicitacao.status === 'Erro Documentação' ? erroDocumentacao :
                                                        ''
                                        } ${styles.status}`
                                    }
                                        onClick={() => handleCollapseStatus(solicitacao.id)}
                                    >
                                        {solicitacao.status}
                                    </span>
                                </div>
                            </div>

                            <div className={`text-sm font-medium text-black`}>R${Number(solicitacao.valor).toFixed(2).replace('.', ',')}</div>
                            <div className={`text-sm text-gray-700`}><p>Clique nos ícones para baixar os anexos:</p></div>
                            <div className={`flex justify-end items-center`}>
                                <div className={`flex mr-auto`}>


                                    {solicitacao.anexoNF ? (

                                        <Link
                                            href={solicitacao.anexoNF.toString()}

                                            target="_blank"
                                            className={`${styles.linkAnexoMb}`}
                                        >
                                            <Image
                                                width={30}
                                                height={30}
                                                alt="document"
                                                src={
                                                    String(solicitacao.anexoNF).match(/.zip/) ? `https://img.icons8.com/fluency-systems-filled/48/e67e22/archive-folder.png` :
                                                            String(solicitacao.anexoNF).match(/.doc/) ? `https://img.icons8.com/fluency-systems-filled/50/e67e22/ms-word.png` :
                                                                String(solicitacao.anexoNF).match(/.docx/) ? `https://img.icons8.com/fluency-systems-filled/50/e67e22/ms-word.png` :
                                                                    String(solicitacao.anexoNF).match(/.xlx/) ? `https://img.icons8.com/ios-glyphs/50/e67e22/ms-excel.png` :
                                                                        String(solicitacao.anexoNF).match(/.xlxs/) ? `https://img.icons8.com/ios-glyphs/50/e67e22/ms-excel.png` :
                                                                            String(solicitacao.anexoNF).match(/.pdf/) ? `https://img.icons8.com/fluency-systems-filled/50/e67e22/pdf.png` :
                                                                                String(solicitacao.anexoNF).match(/.jpg/) ? `https://img.icons8.com/sf-black-filled/50/e67e22/image.png` :
                                                                                    String(solicitacao.anexoNF).match(/.png/) ? `https://img.icons8.com/sf-black-filled/50/e67e22/image.png` :
                                                                                        ''
                                                }
                                            />

                                        </Link>
                                    ) : ''}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className={`${styles.btnRemove} shadow`}
                                        onClick={() => deletarNota(solicitacao.id)}
                                    >
                                        <Image
                                            width="20"
                                            height="20"
                                            src="https://img.icons8.com/ios-filled/20/ffffff/delete-sign--v1.png"
                                            alt="delete-sign--v1"
                                        />
                                    </button>
                                </div>
                                {/* <div>
                                    <button
                                        type="button"
                                        className={`${styles.btnRemove} shadow`}
                                        onClick={() => openModal(solicitacao)}
                                    >
                                        <Image
                                            width="20"
                                            height="20"
                                            src="https://img.icons8.com/ios-filled/20/ffffff/available-updates.png"
                                            alt="available-updates"
                                        />
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}