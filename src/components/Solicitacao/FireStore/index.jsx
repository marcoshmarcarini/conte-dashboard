'use client'
import React, { useState } from "react";
import { db, storage } from '../../../utils/firebase';
import { addDoc, collection} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import styles from './FireStore.module.css';
import Image from "next/image";


export default function FireStore() {
  const [novaNota, setNovaNota] = useState({
    /* Infos da Empresa */
    nomeFantasia: '', razaoSocial: '', cnpj: '',
    emailValido: '',
    /* Infos de Solicitação */
    campanha: '', tipo: '', pppi: '', dataVeiculacao: '',
    valor: '', notafiscal: '', 
    /* Anexos */
    anexoNF: [], link: '',
    /* Infos Bancárias */
    numBanco: '', agencia: '', conta: '', pix: '',
    /* Timestamp para facilitar a consulta */
    timeStamp: null,
    /* Status da nota */
    status: ''
  })

  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = (e) => {
    const files = e.target.files
    setSelectedFiles([...selectedFiles, ...files])
}

  const [dnone, setDnone] = useState('none')

  //Adicionar Nova Nota
  const AddNota = async (e) => {
    e.preventDefault();

    if (novaNota.campanha !== '' /* && ... */) {
        const storageRef = ref(storage, 'anexos')
        
        const uploadedFileURLs = await Promise.all(
            selectedFiles.map(async (file) => {
                const fileRef = ref(storageRef, file.name)
                await uploadBytes(fileRef, file)
                return getDownloadURL(fileRef)
            })
        )

      await addDoc(collection(db, 'solicitacao'), {
        /* Infos da Empresa */
        nomeFantasia: novaNota.nomeFantasia, razaoSocial: novaNota.razaoSocial, 
        cnpj: novaNota.cnpj, emailValido: novaNota.emailValido,
        /* Infos de Solicitação */
        campanha: novaNota.campanha, tipo: novaNota.tipo, pppi: novaNota.pppi, 
        dataVeiculacao: novaNota.dataVeiculacao, valor: novaNota.valor, 
        notafiscal: novaNota.notafiscal, 
        /* Anexos */
        anexoNF: uploadedFileURLs, link: novaNota.link,
        /* Infos Bancárias */
        numBanco: novaNota.numBanco, agencia: novaNota.agencia, 
        conta: novaNota.conta, pix: novaNota.pix,
        /* Timestamp para facilitar a consulta */
        timeStamp: new Date(),
        /* Status da Nota */
        status: 'Recebido'
      });

      setNovaNota({
        /* Infos da Empresa */
        nomeFantasia: '', razaoSocial: '', cnpj: '',
        emailValido: '',
        /* Infos de Solicitação */
        campanha: '', tipo: '', pppi: '', dataVeiculacao: '',
        valor: '', notafiscal: '', 
        /* Anexos */
        anexoNF: [], link: '',
        /* Infos Bancárias */
        numBanco: '', agencia: '', conta: '', pix: '',
        });

        setSelectedFiles([])
    } else {
      console.log('Algo deu errado');
    }
  };


  /* Botão Info */

  const handleDnone = () => {
    setDnone('block')
  }

  const handleDnoneOut = () =>{
    setDnone('none')
  }

  return (
    <div className={`flex flex-col justify-center items-center gap-5`}>
        
        <form className={`${styles.formulario} container mr-auto ml-auto gap-10 flex flex-col justify-center items-center h-screen w-screen `}>
            <h2 className={`text-center font-bold text-lg`}>Solicitação de Pagamento</h2>
            <div className={`flex justify-beetween items-center gap-5 ${styles.formContent}`}>
                <div className={`${styles.formCol1} p-2  `}>
                    <div className={`${styles.formControl} w-full`}>
                        <input 
                            type="text" 
                            name="nomeFantasia" 
                            className={` rounded-sm shadow-orange-100 shadow-md `}  
                            value={novaNota.nomeFantasia} 
                            placeholder={`Nome Fantasia`} 
                            onChange={(e) => setNovaNota({...novaNota, nomeFantasia: e.target.value})}
                        />
                        <input 
                            type="text" 
                            name="razaoSocial" 
                            className={` rounded-sm shadow-orange-100 shadow-md `} 
                            value={novaNota.razaoSocial} placeholder={`Razão Social`} 
                            onChange={(e) => setNovaNota({...novaNota, razaoSocial: e.target.value})}
                        />
                        <input 
                            type="text" 
                            name="cnpj" 
                            className={` rounded-sm shadow-orange-100 shadow-md `} 
                            value={novaNota.cnpj} 
                            placeholder={`CNPJ`} 
                            onChange={(e) => setNovaNota({...novaNota, cnpj: e.target.value})}
                        />
                        <input 
                            type="email" 
                            name="emailValido" 
                            className={` rounded-sm shadow-orange-100 shadow-md `} 
                            value={novaNota.emailValido} placeholder={`Email Válido`} 
                            onChange={(e) => setNovaNota({...novaNota, emailValido: e.target.value})}
                        />
                    </div>
                </div>

                <div className={`${styles.formCol1} p-2  `}>
                    <div className={`${styles.formControl} w-full`}>
                        <input 
                            type="text"
                            className={` rounded-sm shadow-orange-100 shadow-md `}  
                            value={novaNota.campanha} 
                            placeholder={`Nome da Campanha`} 
                            onChange={(e) => setNovaNota({...novaNota, campanha: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.tipo}   
                            placeholder={`Tipo de material ou mídia`}    
                            onChange={(e) => setNovaNota({...novaNota, tipo: e.target.value})}  
                        />

                        <input 
                            type="number"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.pppi} 
                            placeholder={`Nº PP ou PI`} 
                            onChange={(e) => setNovaNota({...novaNota, pppi: e.target.value})}
                        />

                        <div className={`flex gap-5 items-center justify-between`}>
                            <label htmlFor="dataVeiculacao">Data da Veiculação</label>
                            <input 
                                type="date"
                                className={`rounded-sm shadow-orange-100 shadow-md`}  
                                value={novaNota.dataVeiculacao} 
                                placeholder={`Data da Veiculação`} 
                                onChange={(e) => setNovaNota({...novaNota, dataVeiculacao: e.target.value})}
                                id="dataVeiculacao"
                            />
                        </div>

                        <div className={`flex gap-5 items-center justify-between`}> 
                            <input 
                                type="number"
                                className={`rounded-sm shadow-orange-100 shadow-md`} 
                                value={novaNota.valor} 
                                placeholder={`Valor da Nota Fiscal`} 
                                onChange={(e) => setNovaNota({...novaNota, valor: e.target.value})}
                            />
                            <input 
                                type="text"
                                className={`rounded-sm shadow-orange-100 shadow-md`}  
                                value={novaNota.notafiscal} 
                                placeholder={`Nota Fiscal`} 
                                onChange={(e) => setNovaNota({...novaNota, notafiscal: e.target.value})}
                            />
                        </div>

                        <div className={`flex gap-5 items-center justify-between`}>
                            <label htmlFor="anexos">Anexos</label>
                            <input 
                                type="file" 
                                id="anexos"
                                accept=".doc,.docx,.xlx,.xlxs,.pdf,.jpg,.png,.mp4"
                                multiple="true"
                                onChange={handleFileChange}

                            />
                            <div 
                                className={styles.infoAnexo}
                                onMouseEnter={handleDnone}
                                onMouseLeave={handleDnoneOut}
                            >
                                <Image 
                                    width="20" 
                                    height="20" 
                                    src="https://img.icons8.com/ios-filled/20/e67e22/info.png" 
                                    alt="info" 
                                />
                            </div>
                            <div style={{display: dnone}} className={styles.infoCard}>
                                <p>Nota Fiscal, Certidões Negativas, FGTS, entre outras...</p>
                            </div>
                        </div>

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.link} 
                            placeholder={`Link com comprovantes`} 
                            onChange={(e) => setNovaNota({...novaNota, link: e.target.value})}
                        /> 
                    </div> 
                </div>
                    
                <div className={`${styles.formCol1}  p-2 `}>
                    <div className={`${styles.formControl} w-full`}>
                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`} 
                            value={novaNota.numBanco} 
                            placeholder={`Nº do Banco`} 
                            onChange={(e) => setNovaNota({...novaNota, numBanco: e.target.value})}
                        />
                        
                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.agencia} 
                            placeholder={`Agência`} 
                            onChange={(e) => setNovaNota({...novaNota, agencia: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.conta} 
                            placeholder={`Conta`} 
                            onChange={(e) => setNovaNota({...novaNota, conta: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.pix} 
                            placeholder={`PIX`} 
                            onChange={(e) => setNovaNota({...novaNota, pix: e.target.value})}
                        />    
                    </div>
                </div> 
            </div>
                    
            <div className={`${styles.formSubmit} rounded-md`}>
                <input 
                    type="submit" 
                    value="Solicitar Pagamento" 
                    onClick={AddNota} 
                />
            </div>

        </form>
    </div>
  )
}