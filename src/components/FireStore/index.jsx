'use client'
import React, { useState, useEffect } from "react";
import {db} from '../../utils/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';


import styles from './FireStore.module.css';

export default function FireStore() {
  //Estados
  const [novaNota, setNovaNota] = useState({
    campanha: '', tipo: '', pppi: null,
    fornecedor: '', descricao: '', valor: null,
    notafiscal: '', processo: null, statusNota: '',
    pagoPrefeitura: false, pagoFornecedor: false
  })
  
  const [notas, setNotas] = useState([]);
    
    //Função para adicionar o item
    const AddNota = async (e) => {
        e.preventDefault();
        if(novaNota.campanha !== '' && novaNota.tipo !== '' && novaNota.pppi !== 0 &&
        novaNota.fornecedor !== '' && novaNota.descricao !== '' && novaNota.valor !== 0 &&
        novaNota.notafiscal !== '' && novaNota.processo !== 0 && novaNota.statusNota !== '' ||
        novaNota.pagoPrefeitura !== false || novaNota.pagoFornecedor !== false){
            console.log(novaNota)
            //setNotas({...notas, novaNota}) 
            await addDoc(collection(db, 'notas'), {
                campanha: novaNota.campanha, tipo: novaNota.tipo, pppi: novaNota.pppi,
                fornecedor: novaNota.fornecedor, descricao: novaNota.descricao, valor: novaNota.valor,
                notafiscal: novaNota.notafiscal, processo: novaNota.processo, statusNota: novaNota.status,
                pagoPrefeitura: novaNota.pagoPrefeitura, pagoFornecedor: novaNota.pagoFornecedor,
            })
            setNovaNota({
                campanha: '', tipo: '', pppi: null,
                fornecedor: '', descricao: '', valor: null,
                notafiscal: '', processo: null, statusNota: '',
                pagoPrefeitura: false, pagoFornecedor: false
            })
        }
    }

    //Buscar as Notas
    useEffect(() => {
        const MostrarNotas = async () => {
            const snap = await getDocs(collection(db, 'notas'))
            const snapData = []
            snap.forEach((doc) => {
                snapData.push({id: doc.id, ...doc.data()})
            })
            setNotas(snapData)
            console.log(notas)
        }

        MostrarNotas()
        
    }, [])
    
 
  return (
    <div className={`flex flex-col justify-center items-center gap-5 py-5`}>
        <form className={`container mr-auto ml-auto gap-5`}>
            <div className={`columns-1 gap-5 md:columns-2`}>
                <div className={`${styles.formCol1}`}>
                    <div className={`${styles.formControl}`}>
                        <input type="text" value={novaNota.campanha} placeholder={`Campanha`} onChange={(e) => setNovaNota({...novaNota, campanha: e.target.value})}/>
                        <input type="text" value={novaNota.tipo} placeholder={`Tipo`} onChange={(e) => setNovaNota({...novaNota, tipo: e.target.value})}/>
                        <input type="number" value={novaNota.pppi} placeholder={`PP/PI`} onChange={(e) => setNovaNota({...novaNota, pppi: e.target.value})}/>
                        <input type="text" value={novaNota.fornecedor} placeholder={`Fornecedor`} onChange={(e) => setNovaNota({...novaNota, fornecedor: e.target.value})}/>
                        <input type="text" value={novaNota.descricao} placeholder={`Descrição`} onChange={(e) => setNovaNota({...novaNota, descricao: e.target.value})}/>
                    </div> 
                </div>
                    
                <div className={`${styles.formCol1} mt-[10px]`}>
                    <div className={`${styles.formControl}`}>
                        <input type="number" value={novaNota.valor} placeholder={`Valor`} onChange={(e) => setNovaNota({...novaNota, valor: e.target.value})}/>
                        <input type="text" value={novaNota.notafiscal} placeholder={`Nota Fiscal`} onChange={(e) => setNovaNota({...novaNota, notafiscal: e.target.value})}/>
                        <input type="number" value={novaNota.processo} placeholder={`Processo`} onChange={(e) => setNovaNota({...novaNota, processo: e.target.value})}/>
                    </div>
                    <select>
                        <option value={novaNota.statusNota} onChange={(e) => setNovaNota({...novaNota, statusNota: e.target.value})} selected>Selecione o Status</option>
                        <option value="lancada">Lançada</option>
                        <option value="emandamento">Em Andamento</option>
                    </select>
                    <div>
                        <input type="checkbox" name="Pago" value="Prefeitura" id="pagoPrefeitura" checked={novaNota.pagoPrefeitura} onChange={(e) => setNovaNota({...novaNota, pagoPrefeitura: e.target.checked})} />
                        <label htmlFor="pagoPrefeitura">Pago Prefeitura</label>
                    </div>
                    <div>
                        <input type="checkbox" name="Pago" value="Fornecedor/Veículo" id="pagoFornecedor" checked={novaNota.pagoFornecedor} onChange={(e) => setNovaNota({...novaNota, pagoFornecedor: e.target.checked})} />
                        <label htmlFor="pagoFornecedor">Pago Fornecedor/Veículo</label>
                    </div>
                </div> 
            </div>
                    
            <div className={`${styles.formSubmit}`}>
                <input type="submit" value="Enviar" onClick={AddNota} />
            </div>
        </form>

        <div className={styles.notasList}>
            <h2>Notas Fiscais</h2>
            <table className={`table-fixed border-collapse border border-slate-500`}>
                <thead>
                    <tr>
                        <th className={`border border-slate-600`}>Campanha</th>
                        <th className={`border border-slate-600`}>Tipo</th>
                        <th className={`border border-slate-600`}>PP/PI</th>
                        <th className={`border border-slate-600`}>Fornecedor</th>
                        <th className={`border border-slate-600`}>Descrição</th>
                        <th className={`border border-slate-600`}>Valor</th>
                        <th className={`border border-slate-600`}>Nota Fiscal</th>
                        <th className={`border border-slate-600`}>Processo</th>
                        <th className={`border border-slate-600`}>Status</th>
                        <th className={`border border-slate-600`}>Pago PMPK</th>
                        <th className={`border border-slate-600`}>Pago For/Vei</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {notas.map((nota) => (
                        <tr key={nota.id}>
                            <td className={`border border-slate-700`}>{nota.campanha}</td>
                            <td className={`border border-slate-700`}>{nota.tipo}</td>
                            <td className={`border border-slate-700`}>{nota.pppi}</td>
                            <td className={`border border-slate-700`}>{nota.fornecedor}</td>
                            <td className={`border border-slate-700`}>{nota.descricao}</td>
                            <td className={`border border-slate-700`}>R$ {nota.valor.replace('.', ',')}</td>
                            <td className={`border border-slate-700`}>{nota.notafiscal}</td>
                            <td className={`border border-slate-700`}>{nota.processo}</td>
                            <td className={`border border-slate-700`}>{nota.status}</td>
                            <td className={`border border-slate-700`}>{nota.pagoPrefeitura}</td>
                            <td className={`border border-slate-700`}>{nota.pagoFornecedor}</td>
                        </tr>
                    ))} 
                </tbody>
                    
            </table>
        </div>
    </div>
  );
}












