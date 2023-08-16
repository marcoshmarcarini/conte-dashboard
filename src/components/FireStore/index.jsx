'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from '../../utils/firebase';
import { addDoc, collection, deleteDoc, getDocs, doc, orderBy, query, updateDoc } from 'firebase/firestore';

import styles from './FireStore.module.css';


export default function FireStore() {
  const [novaNota, setNovaNota] = useState({
    campanha: '', tipo: '', pppi: '',
    fornecedor: '', descricao: '', valor: '',
    notafiscal: '', processo: '', statusNota: 'naolancada',
    pagoPrefeitura: false, pagoFornecedor: false, timeStamp: null
  });
  const [notas, setNotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editarNota, setEditarNota] = useState(null);

  const AddNota = async (e) => {
    e.preventDefault();

    if (editarNota) {
      const notaRef = doc(db, 'notas', editarNota.id);
      await updateDoc(notaRef, {
        campanha: editarNota.campanha,
        tipo: editarNota.tipo,
        pppi: editarNota.pppi,
        fornecedor: editarNota.fornecedor,
        descricao: editarNota.descricao,
        valor: editarNota.valor,
        notafiscal: editarNota.notafiscal,
        processo: editarNota.processo,
        statusNota: editarNota.statusNota,
        pagoPrefeitura: editarNota.pagoPrefeitura,
        pagoFornecedor: editarNota.pagoFornecedor,
      });

      setEditarNota(null);
      closeModal();
    } else if (novaNota.campanha !== '' /* && ... */) {
      await addDoc(collection(db, 'notas'), {
        campanha: novaNota.campanha,
        tipo: novaNota.tipo,
        pppi: novaNota.pppi,
        fornecedor: novaNota.fornecedor,
        descricao: novaNota.descricao,
        valor: novaNota.valor,
        notafiscal: novaNota.notafiscal,
        processo: novaNota.processo,
        statusNota: novaNota.statusNota,
        pagoPrefeitura: novaNota.pagoPrefeitura,
        pagoFornecedor: novaNota.pagoFornecedor,
        timeStamp: new Date()
      });

      MostrarNotas();

      setNovaNota({
        campanha: '', tipo: '', pppi: '',
        fornecedor: '', descricao: '', valor: '',
        notafiscal: '', processo: '', statusNota: 'naolancada',
        pagoPrefeitura: false, pagoFornecedor: false
      });
    } else {
      console.log('Algo deu errado');
    }
  };

  useEffect(() => {
    MostrarNotas();
  }, []);

  const MostrarNotas = async () => {
    const colecao = collection(db, 'notas');
    const q = query(
      colecao,
      orderBy('campanha', 'asc'),
      orderBy('pppi', 'asc'),
      orderBy('timeStamp', 'desc')
    );
    const snap = await getDocs(q);
    const snapData = [];
    snap.forEach((doc) => {
      snapData.push({ id: doc.id, ...doc.data() });
    });
    setNotas(snapData);
  };

  const deletarNota = async (id) => {
    await deleteDoc(doc(db, 'notas', id));
    MostrarNotas();
  };

  const openModal = (nota) => {
    setEditarNota({
      id: nota.id,
      campanha: nota.campanha,
      tipo: nota.tipo,
      pppi: nota.pppi,
      fornecedor: nota.fornecedor,
      descricao: nota.descricao,
      valor: nota.valor,
      notafiscal: nota.notafiscal,
      processo: nota.processo,
      statusNota: nota.statusNota,
      pagoPrefeitura: nota.pagoPrefeitura,
      pagoFornecedor: nota.pagoFornecedor,
      timeStamp: nota.timeStamp,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditarNota(null);
    setIsModalOpen(false);
  };

 
  return (
    <div className={`flex flex-col justify-center items-center gap-5 py-5 `}>
        <form className={`container mr-auto ml-auto gap-5 flex flex-col justify-center items-center h-screen`}>
            <div className={`columns-1 gap-5 md:columns-2`}>
                <div className={`${styles.formCol1}`}>
                    <div className={`${styles.formControl}`}>
                        <input 
                            type="text" 
                            value={novaNota.campanha} 
                            placeholder={`Campanha`} 
                            onChange={(e) => setNovaNota({...novaNota, campanha: e.target.value})}
                        />

                        <input 
                            type="text" 
                            value={novaNota.tipo}   
                            placeholder={`Tipo`}    
                            onChange={(e) => setNovaNota({...novaNota, tipo: e.target.value})}  
                        />

                        <input 
                            type="number" 
                            value={novaNota.pppi} 
                            placeholder={`PP/PI`} 
                            onChange={(e) => setNovaNota({...novaNota, pppi: e.target.value})}
                        />

                        <input 
                            type="text" 
                            value={novaNota.fornecedor} 
                            placeholder={`Fornecedor`} 
                            onChange={(e) => setNovaNota({...novaNota, fornecedor: e.target.value})}
                        />

                        <input 
                            type="text" 
                            value={novaNota.descricao} 
                            placeholder={`Descrição`} 
                            onChange={(e) => setNovaNota({...novaNota, descricao: e.target.value})}
                        />

                    </div> 
                </div>
                    
                <div className={`${styles.formCol1} mt-[10px]`}>
                    <div className={`${styles.formControl}`}>
                        <input 
                            type="number" 
                            value={novaNota.valor} 
                            placeholder={`Valor`} 
                            onChange={(e) => setNovaNota({...novaNota, valor: e.target.value})}
                        />
                        <input 
                            type="text" 
                            value={novaNota.notafiscal} 
                            placeholder={`Nota Fiscal`} 
                            onChange={(e) => setNovaNota({...novaNota, notafiscal: e.target.value})}
                            />
                        <input 
                            type="number" 
                            value={novaNota.processo} 
                            placeholder={`Processo`} 
                            onChange={(e) => setNovaNota({...novaNota, processo: e.target.value})}
                        />
                    </div>

                    <select value={novaNota.statusNota} onChange={(e) => setNovaNota({...novaNota, statusNota: e.target.value})}>
                        <option value="aguardando">Aguardando Nota</option>
                        <option value="enviada">Nota Enviada</option>
                        <option value="emandamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="naoenviada">Não Enviada</option>
                    </select>

                    <div>
                        <input 
                            type="checkbox" 
                            name="Pago" 
                            value={novaNota.pagoPrefeitura} 
                            id="pagoPrefeitura" 
                            checked={novaNota.pagoPrefeitura} 
                            onChange={(e) => setNovaNota({...novaNota, pagoPrefeitura: e.target.checked})} 
                        />
                        <label htmlFor="pagoPrefeitura">Pago Prefeitura</label>
                    </div>

                    <div>
                        <input 
                            type="checkbox" 
                            name="Pago" 
                            value={novaNota.pagoFornecedor} 
                            id="pagoFornecedor" 
                            checked={novaNota.pagoFornecedor} 
                            onChange={(e) => setNovaNota({...novaNota, pagoFornecedor: e.target.checked})} 
                        />
                        <label htmlFor="pagoFornecedor">Pago Fornecedor/Veículo</label>
                    </div>

                </div> 
            </div>
                    
            <div className={`${styles.formSubmit}`}>
                <input 
                    type="submit" 
                    value="Adicionar Nota" 
                    onClick={AddNota} 
                />
            </div>

        </form>

        <div className={`container ${styles.notasList} flex flex-col gap-5 justify-center items-center`} id={`notas-fiscais`}>
            <h2 className={`text-center font-bold text-lg`}>Notas Fiscais</h2>
            <table className={`table-fixed border-collapse border border-slate-500`}>
                <thead>
                    <tr>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Campanha</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Tipo</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>PP/PI</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Fornecedor</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Descrição</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Valor</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Nota Fiscal</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Processo</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Status</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Pago PMPK</th>
                        <th className={`border border-slate-600 text-center pl-2 pr-2`}>Pago For/Vei</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {notas.map((nota, id) => (
                        <tr key={id}>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.campanha}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.tipo}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.pppi}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.fornecedor}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.descricao}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>R${Number(nota.valor).toFixed(2).replace('.', ',')}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.notafiscal}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.processo}</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>
                                {
                                    nota.statusNota == 'aguardando' ? 'Aguardando Nota' :
                                    nota.statusNota == 'enviada' ? 'Nota Enviada' :
                                    nota.statusNota == 'emandamento' ? 'Em Andamento' : 
                                    nota.statusNota == 'concluido' ? 'Concluído' :
                                    nota.statusNota == 'naoenviada' ? 'Não Enviada' :
                                    ''
                                }   
                            </td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.pagoPrefeitura === true ? 'Sim' : 'Não' }</td>
                            <td className={`border border-slate-700 text-center pl-2 pr-2`}>{nota.pagoFornecedor === true ? 'Sim' : 'Não'}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className={styles.btnRemove} 
                                    onClick={() => deletarNota(nota.id)}
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
                                    onClick={() => openModal(nota)}
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
        <div className={`modal`}>
        <div>
      

      {isModalOpen && (
        <div
          id="modal"
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-orange-300 bg-opacity-50 transform scale-100 transition-transform duration-300"
        >
          {/* Modal content */}
          <div className="bg-white w-1/2 h-1/2 p-12">
            {/* Close modal button */}
            <button
              id="closebutton"
              type="button"
              className="focus:outline-none"
              onClick={closeModal}
            >
              {/* Hero icon - close button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {/* Test content */}
            <form className={`container mr-auto ml-auto gap-5`}>
                <div className={`columns-1 gap-5 md:columns-2`}>
                    <div className={`${styles.formCol1}`}>
                        <div className={`${styles.formControl}`}>
                            <input 
                                type="text" value={editarNota?.campanha || ''} 
                                placeholder={`Campanha`} 
                                onChange={(e) => setNovaNota({...editarNota, campanha: e.target.value})}
                            />
                            <input  
                                type="text" value={editarNota?.tipo || ''} 
                                placeholder={`Tipo`} 
                                onChange={(e) => setNovaNota({...editarNota, tipo: e.target.value})}
                            />
                            <input 
                                type="number" 
                                value={editarNota?.pppi || ''} placeholder={`PP/PI`} 
                                onChange={(e) => setNovaNota({...editarNota, pppi: e.target.value})}
                            />
                            <input 
                                type="text" value={editarNota?.fornecedor || ''} 
                                placeholder={`Fornecedor`} 
                                onChange={(e) => setNovaNota({...editarNota, fornecedor: e.target.value})}
                            />
                            <input 
                                type="text" value={editarNota?.descricao || ''} 
                                placeholder={`Descrição`} 
                                onChange={(e) => setNovaNota({...editarNota, descricao: e.target.value})}
                            />
                        </div> 
                    </div>
                        
                    <div className={`${styles.formCol1} mt-[10px]`}>
                        <div className={`${styles.formControl}`}>
                            <input 
                                type="number" value={editarNota?.valor || ''} 
                                placeholder={`Valor`} 
                                onChange={(e) => setNovaNota({...editarNota, valor: e.target.value})}
                            />
                            <input 
                                type="text" 
                                value={editarNota?.notafiscal || ''} 
                                placeholder={`Nota Fiscal`} 
                                onChange={(e) => setNovaNota({...editarNota, notafiscal: e.target.value})}
                            />
                            <input 
                                type="number" 
                                value={editarNota?.processo || ''} 
                                placeholder={`Processo`} 
                                onChange={(e) => setNovaNota({...editarNota, processo: e.target.value})}
                            />
                        </div>
                        <select value={editarNota?.statusNota || ''} onChange={(e) => setNovaNota({...editarNota, statusNota: e.target.value})}>
                            <option value="aguardando">Aguardando Nota</option>
                            <option value="enviada">Nota Enviada</option>
                            <option value="emandamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                            <option value="naoenviada">Não Enviada</option>
                        </select>
                        <div>
                            <input 
                                type="checkbox" 
                                name="Pago" 
                                value={novaNota.pagoPrefeitura} 
                                id="pagoPrefeitura" 
                                checked={novaNota.pagoPrefeitura} 
                                onChange={(e) => setNovaNota({...novaNota, pagoPrefeitura: e.target.checked})} 
                            />
                            <label htmlFor="pagoPrefeitura">Pago Prefeitura</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                name="Pago" 
                                value={novaNota.pagoFornecedor} 
                                id="pagoFornecedor" 
                                checked={novaNota.pagoFornecedor} 
                                onChange={(e) => setNovaNota({...novaNota, pagoFornecedor: e.target.checked})} 
                            />
                            <label htmlFor="pagoFornecedor">Pago Fornecedor/Veículo</label>
                        </div>
                    </div> 
                </div>
                        
                <div className={`${styles.formSubmit}`}>
                    <input 
                        type="submit" 
                        value="Atualizar Nota" 
                        onClick={AddNota} 
                    />
                </div>
            </form>
          </div>
        </div>
      )}
    </div>   
        </div>
    </div>
  );
}