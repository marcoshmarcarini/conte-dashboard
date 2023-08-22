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
  const [updatedNota, setUpdatedNota] = useState({
    campanha: '', tipo: '', pppi: '', fornecedor: '',
    descricao: '', valor: '', notafiscal: '', processo: '',
    statusNota: '', pagoPrefeitura: false, pagoFornecedor: false
  });
  const [alteraCorBtnModal, setAlteraCorBtnModal] = useState('000000')

  const AddNota = async (e) => {
    e.preventDefault();

    if (editarNota) {
      const notaRef = doc(db, 'notas', editarNota.id);
      await updateDoc(notaRef, {
        campanha: editarNota.campanha, tipo: editarNota.tipo, pppi: editarNota.pppi,
        fornecedor: editarNota.fornecedor, descricao: editarNota.descricao, valor: editarNota.valor,
        notafiscal: editarNota.notafiscal, processo: editarNota.processo, statusNota: editarNota.statusNota,
        pagoPrefeitura: editarNota.pagoPrefeitura, pagoFornecedor: editarNota.pagoFornecedor,
      });

      setEditarNota(null);
      closeModal();
    } else if (novaNota.campanha !== '' /* && ... */) {
      await addDoc(collection(db, 'notas'), {
        campanha: novaNota.campanha, tipo: novaNota.tipo, pppi: novaNota.pppi,
        fornecedor: novaNota.fornecedor, descricao: novaNota.descricao, valor: novaNota.valor,
        notafiscal: novaNota.notafiscal, processo: novaNota.processo, statusNota: novaNota.statusNota,
        pagoPrefeitura: novaNota.pagoPrefeitura, pagoFornecedor: novaNota.pagoFornecedor, timeStamp: new Date()
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
    setEditarNota(nota);
    setUpdatedNota({
        campanha: nota.campanha, tipo: nota.tipo, pppi: nota.pppi,
        fornecedor: nota.fornecedor, descricao: nota.descricao, valor: nota.valor,
        notafiscal: nota.notafiscal, processo: nota.processo, statusNota: nota.statusNota,
        pagoPrefeitura: nota.pagoPrefeitura, pagoFornecedor: nota.pagoFornecedor,
    })
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditarNota(null);
    setIsModalOpen(false);
    setAlteraCorBtnModal('000000')
  };

  const updateNotaInFirestore = async (notaId) => {
    const notaRef = doc(db, 'notas', notaId);
    await updateDoc(notaRef, updatedNota);

    // Close the modal and reset state
    setUpdatedNota({
      campanha: '', tipo: '', pppi: '',
      fornecedor: '', descricao: '', valor: '',
      notafiscal: '', processo: '', statusNota: '',
      pagoPrefeitura: false, pagoFornecedor: false,
    });
    setEditarNota(null);
    closeModal();

    // Refresh the list of notes
    MostrarNotas();
  };


  const handleAlteraCorBtnCloseModal = () => {
        setAlteraCorBtnModal('e67e22')
  }

  const handleAlteraCorBtnCloseModalMouseOut = () =>{
        setAlteraCorBtnModal('000000')
  }

 
  return (
    <div className={`flex flex-col justify-center items-center gap-5`}>
        <form className={`${styles.formulario} container mr-auto ml-auto gap-5 flex flex-col justify-center items-center h-screen w-screen `}>
            <div className={`flex justify-between items-center gap-5 ${styles.formContent}`}>
                <div className={`${styles.formCol1} p-2  `}>
                    <div className={`${styles.formControl} w-full`}>
                        <input 
                            type="text"
                            className={` rounded-sm shadow-orange-100 shadow-md `}  
                            value={novaNota.campanha} 
                            placeholder={`Campanha`} 
                            onChange={(e) => setNovaNota({...novaNota, campanha: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.tipo}   
                            placeholder={`Tipo`}    
                            onChange={(e) => setNovaNota({...novaNota, tipo: e.target.value})}  
                        />

                        <input 
                            type="number"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.pppi} 
                            placeholder={`PP/PI`} 
                            onChange={(e) => setNovaNota({...novaNota, pppi: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.fornecedor} 
                            placeholder={`Fornecedor`} 
                            onChange={(e) => setNovaNota({...novaNota, fornecedor: e.target.value})}
                        />

                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.descricao} 
                            placeholder={`Descrição`} 
                            onChange={(e) => setNovaNota({...novaNota, descricao: e.target.value})}
                        />

                    </div> 
                </div>
                    
                <div className={`${styles.formCol1}  p-2 `}>
                    <div className={`${styles.formControl} w-full`}>
                        <input 
                            type="number"
                            className={`rounded-sm shadow-orange-100 shadow-md`} 
                            value={novaNota.valor} 
                            placeholder={`Valor`} 
                            onChange={(e) => setNovaNota({...novaNota, valor: e.target.value})}
                        />
                        <input 
                            type="text"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.notafiscal} 
                            placeholder={`Nota Fiscal`} 
                            onChange={(e) => setNovaNota({...novaNota, notafiscal: e.target.value})}
                            />
                        <input 
                            type="number"
                            className={`rounded-sm shadow-orange-100 shadow-md`}  
                            value={novaNota.processo} 
                            placeholder={`Processo`} 
                            onChange={(e) => setNovaNota({...novaNota, processo: e.target.value})}
                        />
                    </div>

                    <div className={`${styles.formControl}`}>
                        <select
                            className={`rounded-sm shadow-orange-100 shadow-md mb-3`} 
                            value={novaNota.statusNota} 
                            onChange={(e) => setNovaNota({...novaNota, statusNota: e.target.value})}
                        >
                            <option value="aguardando">Aguardando Nota</option>
                            <option value="enviada">Nota Enviada</option>
                            <option value="emandamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                            <option value="naoenviada">Não Enviada</option>
                        </select>

                        <div className={`flex gap-1`}>
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

                        <div className={`flex gap-1`}>
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
            </div>
                    
            <div className={`${styles.formSubmit} rounded-md`}>
                <input 
                    type="submit" 
                    value="Adicionar Nota" 
                    onClick={AddNota} 
                />
            </div>

        </form>

        <div className={`container ${styles.notasList} flex flex-col gap-5 justify-center items-center `} id={`notas-fiscais`}>
            <h2 className={`text-center font-bold text-lg`}>Notas Fiscais</h2>
                <div className={`overflow-auto rounded-lg shadow hidden lg:block transition`}>
                <table className={`w-full`}>
                <caption className="caption-top">
                    Informações das Notas Fiscais.
                </caption>
                    <thead className={`bg-gray-50 border-b-2`}>
                        <tr>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Campanha</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Tipo</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>PP/PI</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Fornecedor</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Descrição</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Valor</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Nota Fiscal</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Processo</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Status</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Pago PMPK</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}>Pago For/Vei</th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}></th>
                            <th className={`p-3 text-sm font-semibold tracking-wide text-center`}></th>
                        </tr>
                    </thead>
                        
                    <tbody className={`divide-y divide-gray-100`}>
                        {notas.map((nota, id) => (

                            <tr key={id} className={`${id % 2 == 0 ? 'bg-white text-gray-700' : 'bg-gray-400 text-white'}`}>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.campanha}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.tipo}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.pppi}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.fornecedor}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.descricao}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>R${Number(nota.valor).toFixed(2).replace('.', ',')}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.notafiscal}</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.processo}</td>
                                <td className={`p-3 text-sm whitespace-nowrap  text-center break-keep `}>
                                    <span className={`
                                        ${
                                            nota.statusNota == 'aguardando' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-1 flex justify-center' :
                                            nota.statusNota == 'enviada' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-1 flex justify-center' :
                                            nota.statusNota == 'emandamento' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-orange-800 bg-orange-200 rounded-lg bg-opacity-1 flex justify-center' : 
                                            nota.statusNota == 'concluido' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-1 flex justify-center' :
                                            nota.statusNota == 'naoenviada' ? 'p-1 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-1 flex justify-center' :
                                            ''
                                        }
                                    
                                    `}>
                                    
                                    {
                                        nota.statusNota == 'aguardando' ? 'Aguardando Nota' :
                                        nota.statusNota == 'enviada' ? 'Nota Enviada' :
                                        nota.statusNota == 'emandamento' ? 'Em Andamento' : 
                                        nota.statusNota == 'concluido' ? 'Concluído' :
                                        nota.statusNota == 'naoenviada' ? 'Não Enviada' :
                                        ''
                                    }  
                                    </span> 
                                </td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.pagoPrefeitura === true ? 'Sim' : 'Não' }</td>
                                <td className={`p-3 text-sm whitespace-wrap text-center`}>{nota.pagoFornecedor === true ? 'Sim' : 'Não'}</td>
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
               <div className={`grid grid-cols-1 gap-4 lg:hidden transition`}>
                {notas.map((nota, id) => (
                    <div key={id} className={`bg-white space-y-3 p-4 rounded-lg shadow`}>
                        <div className={`flex items-center space-x-2 text-sm`}>
                            <div className={`font-bold text-orange-500`}>{nota.campanha}</div>
                            <div className={`text-gray-500`}>{nota.pppi}</div>
                            <div>
                                <span className={
                                    `
                                        ${
                                            nota.statusNota == 'aguardando' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 flex' :
                                            nota.statusNota == 'enviada' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-purple-800 bg-purple-200 rounded-lg bg-opacity-50 flex' :
                                            nota.statusNota == 'emandamento' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-orange-800 bg-orange-200 rounded-lg bg-opacity-50 flex' : 
                                            nota.statusNota == 'concluido' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-green-800 bg-green-200 rounded-lg bg-opacity-50 flex' :
                                            nota.statusNota == 'naoenviada' ? 'p-1.5 text-xs font-medium uppercase break-keep tracking-tight text-red-800 bg-red-200 rounded-lg bg-opacity-50 flex' :
                                            ''
                                        }
                                        
                                    `
                                }>
                                        
                                    {
                                        nota.statusNota == 'aguardando' ? 'Aguardando Nota' :
                                        nota.statusNota == 'enviada' ? 'Nota Enviada' :
                                        nota.statusNota == 'emandamento' ? 'Em Andamento' : 
                                        nota.statusNota == 'concluido' ? 'Concluído' :
                                        nota.statusNota == 'naoenviada' ? 'Não Enviada' :
                                        ''
                                    }  
                                </span>  
                            </div>
                            
                        </div>
                        <div className={`text-sm text-gray-700`}>{nota.descricao}</div>
                        <div className={`text-sm font-medium text-black`}>R${Number(nota.valor).toFixed(2).replace('.', ',')}</div>
                        <div className={`flex justify-end items-center`}>
                            <div>
                                <button 
                                    type="button" 
                                    className={`${styles.btnRemove} shadow`} 
                                    onClick={() => deletarNota(nota.id)}
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
                                    onClick={() => openModal(nota)}
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
        <div className={`modal`}>
        <div>
      

      {isModalOpen && (
        <div
          id="modal"
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-orange-300 bg-opacity-50 transform scale-100 transition-transform duration-300"
        >
          {/* Modal content */}
          <div className={`bg-white w-[700px] h-[450px] p-12 rounded-lg ${styles.modalContent}`}>
            {/* Close modal button */}
            <button
              id="closebutton"
              type="button"
              className="focus:outline-none"
              onClick={closeModal}
            >
              {/* Hero icon - close button */}
            <Image 
                width="25" 
                height="25" 
                src={`https://img.icons8.com/ios-filled/50/${alteraCorBtnModal}/delete-sign--v1.png`}
                alt="delete-sign--v1" 
                onMouseEnter={handleAlteraCorBtnCloseModal} 
                onMouseLeave={handleAlteraCorBtnCloseModalMouseOut}
                className={`${styles.btnCloseModal}`}
            />
            </button>
            {/* Test content */}
            <form className={`container mr-auto gap-5`}>
                <div className={`columns-1 gap-5 m-auto md:columns-2 `}>
                    <div className={`${styles.formCol1}`}>
                        <div className={`${styles.formControl} w-full `}>
                            <input 
                                type="text" value={updatedNota.campanha || ''} 
                                className={`rounded-sm shadow-orange-100 shadow-md `}
                                placeholder={`Campanha`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, campanha: e.target.value})}
                            />
                            <input  
                                type="text" value={updatedNota.tipo || ''} 
                                className={`rounded-sm shadow-orange-100 shadow-md `}
                                placeholder={`Tipo`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, tipo: e.target.value})}
                            />
                            <input 
                                type="number"
                                className={`rounded-sm shadow-orange-100 shadow-md `} 
                                value={updatedNota.pppi || ''} placeholder={`PP/PI`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, pppi: e.target.value})}
                            />
                            <input 
                                type="text" value={updatedNota.fornecedor || ''} 
                                className={`rounded-sm shadow-orange-100 shadow-md `}
                                placeholder={`Fornecedor`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, fornecedor: e.target.value})}
                            />
                            <input 
                                type="text" value={updatedNota.descricao || ''}
                                className={`rounded-sm shadow-orange-100 shadow-md `} 
                                placeholder={`Descrição`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, descricao: e.target.value})}
                            />
                        </div> 
                    </div>
                        
                    <div className={`${styles.formCol1} mt-[10px]`}>
                        <div className={`${styles.formControlModal}`}>
                            <input 
                                type="number" value={updatedNota.valor || ''}
                                className={`rounded-sm shadow-orange-100 shadow-md w-[150px]`} 
                                placeholder={`Valor`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, valor: e.target.value})}
                            />
                            <input 
                                type="text" 
                                value={updatedNota.notafiscal || ''}
                                className={`rounded-sm shadow-orange-100 shadow-md w-[150px]`} 
                                placeholder={`Nota Fiscal`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, notafiscal: e.target.value})}
                            />
                            <input 
                                type="number" 
                                value={updatedNota.processo || ''}
                                className={`rounded-sm shadow-orange-100 shadow-md w-[150px]`} 
                                placeholder={`Processo`} 
                                onChange={(e) => setUpdatedNota({...updatedNota, processo: e.target.value})}
                            />
                        </div>
                        <select 
                            value={updatedNota.statusNota || ''} 
                            onChange={(e) => setUpdatedNota({...updatedNota, statusNota: e.target.value})}
                            className={`rounded-sm shadow-orange-100 shadow-md w-[150px] ${styles.selectModal}`}
                        >
                            <option value="aguardando">Aguardando Nota</option>
                            <option value="enviada">Nota Enviada</option>
                            <option value="emandamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                            <option value="naoenviada">Não Enviada</option>
                        </select>
                        <div className={`flex flex-col justify-start mr-auto`}>
                            <div>
                                <input 
                                    type="checkbox" 
                                    name="Pago" 
                                    value={updatedNota.pagoPrefeitura} 
                                    id="pagoPrefeitura" 
                                    checked={updatedNota.pagoPrefeitura} 
                                    onChange={(e) => setUpdatedNota({...updatedNota, pagoPrefeitura: e.target.checked})} 
                                />
                                <label htmlFor="pagoPrefeitura">Pago Prefeitura</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    name="Pago" 
                                    value={updatedNota.pagoFornecedor} 
                                    id="pagoFornecedor" 
                                    checked={updatedNota.pagoFornecedor} 
                                    onChange={(e) => setUpdatedNota({...updatedNota, pagoFornecedor: e.target.checked})} 
                                />
                                <label htmlFor="pagoFornecedor">Pago Fornecedor/Veículo</label>
                            </div>
                        </div>
                        
                    </div> 
                </div>
                        
                <div className={`${styles.formSubmit} rounded-lg`}>
                    <input 
                        type="submit" 
                        value="Atualizar Nota" 
                        onClick={() => updateNotaInFirestore(editarNota.id)} 
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