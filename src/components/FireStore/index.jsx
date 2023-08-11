'use client'
import React, { useState, useEffect } from "react";
import {db} from '../../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';


import styles from './FireStore.module.css';

export default function FireStore() {
  //Estados
  const [novaNota, setNovaNota] = useState({
    campanha: '', tipo: '', pppi: 0,
    fornecedor: '', descricao: '', valor: 0,
    notafiscal: '', processo: 0, recebido: '',
    pago: '',
  })
  
  const [notas, setNotas] = useState([]);
    
  //Função para adicionar o item
  const AddNota = async (e) => {
    e.preventDefault();
    if(novaNota.campanha !== '' && novaNota.tipo !== '' && novaNota.pppi !== 0 &&
       novaNota.fornecedor !== '' && novaNota.descricao !== '' && novaNota.valor !== 0 &&
       novaNota.notafiscal !== '' && novaNota.processo !== 0 && novaNota.recebido !== '' &&
       novaNota.pago !== ''){
           //setNotas({...notas, novaNota}) 
        await addDoc(collection(db, 'notas'), {
            campanha: novaNota.campanha, tipo: novaNota.tipo, pppi: novaNota.pppi,
            fornecedor: novaNota.fornecedor, descricao: novaNota.descricao, valor: novaNota.valor,
            notafiscal: novaNota.notafiscal, processo: novaNota.processo, recebido: novaNota.recebido,
            pago: novaNota.pago,
        })
        setNovaNota({
            campanha: '', tipo: '', pppi: 0,
            fornecedor: '', descricao: '', valor: 0,
            notafiscal: '', processo: 0, recebido: '',
            pago: ''
        })
    }

    
  };
 
  return (
    <div className={`flex flex-col justify-center items-center h-screen gap-5`}>
        <form className={`container mr-auto ml-auto gap-5`}>
            <div className={`columns-1 gap-5 md:columns-2`}>
                <div className={`${styles.formCol1}`}>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="campanha">Campanha</label>
                        <input type="text" value={novaNota.campanha} onChange={(e) => setNovaNota({...novaNota, campanha: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="tipo">Tipo</label>
                        <input type="text" value={novaNota.tipo} onChange={(e) => setNovaNota({...novaNota, tipo: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="pppi">PP/PI</label>
                        <input type="number" value={novaNota.pppi} onChange={(e) => setNovaNota({...novaNota, pppi: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="fornecedor">Fornecedor</label>
                        <input type="text" value={novaNota.fornecedor} onChange={(e) => setNovaNota({...novaNota, fornecedor: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" value={novaNota.descricao} onChange={(e) => setNovaNota({...novaNota, descricao: e.target.value})}/>
                    </div> 
                </div>
                    
                <div className={`${styles.formCol1} mt-[10px]`}>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="valor">Valor</label>
                        <input type="number" value={novaNota.valor} onChange={(e) => setNovaNota({...novaNota, valor: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="notafiscal">Nota Fiscal</label>
                        <input type="text" value={novaNota.notafiscal} onChange={(e) => setNovaNota({...novaNota, notafiscal: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="processo">Processo</label>
                        <input type="number" value={novaNota.processo} onChange={(e) => setNovaNota({...novaNota, processo: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="recebido">Recebido</label>
                        <input type="text" value={novaNota.recebido} onChange={(e) => setNovaNota({...novaNota, recebido: e.target.value})}/>
                    </div>
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="pago">Pago</label>
                        <input type="text" value={novaNota.pago} onChange={(e) => setNovaNota({...novaNota, pago: e.target.value})}/>
                    </div>
                </div> 
            </div>
                    
            <div className={`${styles.formSubmit}`}>
                <input type="submit" value="Enviar" onClick={AddNota} />
            </div>
        </form>

      <div className={styles.notasList}>
        <h2>Notas Fiscais</h2>
        {notas.map((nota) => (
            <ul key={nota.id}>
                <li>{nota.campanha}</li>
                <li>{nota.tipo}</li>
                <li>{nota.pppi}</li>
                <li>{nota.fornecedor}</li>
                <li>{nota.descricao}</li>
                <li>{nota.valor}</li>
                <li>{nota.notafiscal}</li>
                <li>{nota.processo}</li>
                <li>{nota.recebido}</li>
                <li>{nota.pago}</li>
            </ul>  
        ))} 
      </div>
    </div>
  );
}












