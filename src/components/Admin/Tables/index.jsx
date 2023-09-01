'use client'
import React, {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link"
import {db} from "../../../utils/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import styles from "./Tables.module.css"
import ExportarDados from "@/components/ExportarDados"

export default function Tables(){

    const [solicitacoes, setSolicitacoes] = useState([])

    const MostrarSolicitacoes = async () => {
        const colecao = collection(db, 'solicitacao')
        console.log(colecao)
        const q = query(
            colecao,
            orderBy('timeStamp', 'desc')
        )
        const snap = await getDocs(q)
        const snapData = []
        snap.forEach((doc) => {
            snapData.push({id: doc.id, ...doc.data()})
        })
        setSolicitacoes(snapData)
    }

    useEffect(() => { MostrarSolicitacoes() }, [])

    

    console.log(solicitacoes)


    return(
        <>
            <div className={`container ${styles.notasList} flex flex-col gap-5 justify-center items-center m-auto h-screen`} id={`notas-fiscais`}>
                <h2 className={`text-center font-bold text-lg`}>Solicitações</h2>
                    <div className={`overflow-auto rounded-lg shadow hidden lg:block transition pl-2 pr-2`}>
                    <table className={`w-full`} id={`tabela-dados`}>
                        <caption className={`caption-top mt-2`}>
                            Informações sobre as solicitações de pagamento.
                        </caption>
                        <thead className={`bg-gray-50 border-b-2`}>
                            <tr>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Campanha</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Tipo</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>PP/PI</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Nota Fiscal</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Valor</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Data de Veiculação</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Nome Fantasia</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Razão Social</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>CNPJ</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>E-mail válido</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Dados Bancários</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Status</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Anexos</th>
                                <th className={`p-3 text-sm font-semibold tracking-wide text-center`} colSpan={2}><ExportarDados /></th>
                            </tr>
                        </thead>
                            
                        <tbody className={`divide-y divide-gray-100`}>
                            {solicitacoes.map((solicitacao, id) => (

                                <tr key={id} className={`${id % 2 == 0 ? 'bg-white text-gray-700' : 'bg-gray-400 text-white'}`}>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.campanha}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.tipo}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.pppi}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.notafiscal}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>R$ {Number(solicitacao.valor).toFixed(2).replace('.', ',')}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.dataVeiculacao}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.nomeFantasia}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.razaoSocial}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.cnpj}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>{solicitacao.emailValido}</td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center`}>
                                        Dados Bancários: <br />
                                        <ul className={`list-style-none`}>
                                            <li>{solicitacao.numBanco ? `Nº Banco: ${solicitacao.numBanco}` : ''}</li>
                                            <li>{solicitacao.agencia ? `Agência: ${solicitacao.agencia}` : ''}</li>
                                            <li>{solicitacao.conta ? `Conta: ${solicitacao.conta}` : ''}</li>
                                            <li>{solicitacao.pix ? `PIX: ${solicitacao.pix}` : ''}</li>
                                        </ul>
                                    </td>
                                    
                                    <td className={`p-3 text-sm whitespace-nowrap  text-center break-keep `}>
                                        <span className={`
                                            ${
                                                /* 
                                                    A lógica vai mudar aqui... Vou precisar só de 3 status
                                                    'Recebido', 'Com Prefeitura' e 'Concluído'
                                                */

                                                solicitacao.statusNota == 'aguardando' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center' :
                                                solicitacao.statusNota == 'enviada' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center' :
                                                solicitacao.statusNota == 'emandamento' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-orange-800 bg-orange-200 rounded-lg bg-opacity-1 flex justify-center' : 
                                                solicitacao.statusNota == 'concluido' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center' :
                                                solicitacao.statusNota == 'naoenviada' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-1 flex justify-center' :
                                                ''
                                            }
                                        
                                        `}>
                                        
                                        {
                                            solicitacao.statusNota == 'aguardando' ? 'Aguardando Nota' :
                                            solicitacao.statusNota == 'enviada' ? 'Nota Enviada' :
                                            solicitacao.statusNota == 'emandamento' ? 'Em Andamento' : 
                                            solicitacao.statusNota == 'concluido' ? 'Concluído' :
                                            solicitacao.statusNota == 'naoenviada' ? 'Não Enviada' :
                                            ''
                                        }  
                                        </span> 
                                    </td>
                                    <td className={`p-3 text-sm whitespace-wrap text-center flex gap-1 justify-center items-center `}>
                                        {solicitacao.anexoNF.map((anexo) => {
                                            return(
                                                <Link
                                                    href={anexo.toString()}
                                                    key={anexo.id}
                                                    target="_blank"
                                                >
                                                    <Image 
                                                        width={20}
                                                        height={20}
                                                        alt="document"
                                                        src={
                                                            String(anexo).match(/.doc/)   ? `https://img.icons8.com/fluency-systems-filled/20/e67e22/ms-word.png` :
                                                            String(anexo).match(/.docx/)  ? `https://img.icons8.com/fluency-systems-filled/20/e67e22/ms-word.png` :
                                                            String(anexo).match(/.xlx/)   ? `https://img.icons8.com/ios-glyphs/20/e67e22/ms-excel.png` :
                                                            String(anexo).match(/.xlxs/)  ? `https://img.icons8.com/ios-glyphs/20/e67e22/ms-excel.png` :
                                                            String(anexo).match(/.pdf/)   ? `https://img.icons8.com/fluency-systems-filled/20/e67e22/pdf.png` :
                                                            String(anexo).match(/.jpg/)   ? `https://img.icons8.com/sf-black-filled/20/e67e22/image.png` :
                                                            String(anexo).match(/.png/)   ? `https://img.icons8.com/sf-black-filled/20/e67e22/image.png` :
                                                            String(anexo).match(/.mp4/)   ? `https://img.icons8.com/fluency-systems-filled/20/e67e22/video.png` :
                                                            ''
                                                        }           
                                                    />
                                                    
                                                </Link>
                                            )
                                            
                                        })}
                                
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
                                    <td>
                                        <button 
                                            type="button" 
                                            className={styles.btnRemove} 
                                            onClick={() => openModal(solicitacao)}
                                        > 
                                            <Image 
                                                width="20" 
                                                height="20" 
                                                src="https://img.icons8.com/ios-filled/20/ffffff/available-updates.png" 
                                                alt="available-updates" 
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
                                <div className={`text-gray-500`}>{solicitacao.pppi}</div>
                                <div>
                                    <span className={
                                        `
                                            ${
                                                solicitacao.statusNota == 'aguardando' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 flex' :
                                                solicitacao.statusNota == 'enviada' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-50 flex' :
                                                solicitacao.statusNota == 'emandamento' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-orange-800 bg-orange-200 rounded-lg bg-opacity-50 flex' : 
                                                solicitacao.statusNota == 'concluido' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-50 flex' :
                                                solicitacao.statusNota == 'naoenviada' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-50 flex' :
                                                ''
                                            }
                                            
                                        `
                                    }>
                                            
                                        {
                                            solicitacao.statusNota == 'aguardando' ? 'Aguardando Nota' :
                                            solicitacao.statusNota == 'enviada' ? 'Nota Enviada' :
                                            solicitacao.statusNota == 'emandamento' ? 'Em Andamento' : 
                                            solicitacao.statusNota == 'concluido' ? 'Concluído' :
                                            solicitacao.statusNota == 'naoenviada' ? 'Não Enviada' :
                                            ''
                                        }  
                                    </span>  
                                </div>
                                
                            </div>
                            <div className={`text-sm text-gray-700`}>{solicitacao.descricao}</div>
                            <div className={`text-sm font-medium text-black`}>R${Number(solicitacao.valor).toFixed(2).replace('.', ',')}</div>
                            <div className={`flex justify-end items-center`}>
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
                                <div>
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
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}