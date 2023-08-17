"use client"
import React,{useState, useEffect, useRef} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './GraficoPolar.module.css'
import {Chart as ChartJS, RadialLinearScale, ArcElement , Tooltip, Legend} from 'chart.js'
import {PolarArea} from "react-chartjs-2"

ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
)

export default function GraficoPolar(){
    const [graph, setGraph] = useState([])
    

    //Gráfico Data
    useEffect(() => {
        const graphData = async () => {
            const snap = await getDocs(collection(db, 'notas'))
            const snapData = []
            snap.forEach((doc) => {
                snapData.push({id: doc.id, ...doc.data()})
            })
            setGraph(snapData)
        }
      
        
        graphData()
    

    }, [])
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Valor',
            },
            scales:{
                x: {
                    border: {
                      color: 'red'
                    },
                }
            },
            
        },   
    }

    //Gráfico de Barra
    const labels = graph.map(row => row.campanha)
    const statusNota = graph.map((row) => row.statusNota )
    const campanhaNota = graph.map((row) => row.campanha)
    console.log(campanhaNota)
    var qtdeConcluido = 0
    var qtdeEnviada = 0
    var qtdeAguardando = 0
    var qtdeEmAndamento = 0
    var qtdeNaoEnviada = 0
    var arrayStatus = []
    /* 
        Quando o nome da campanha for igual ao nome da campanha do array de 
        status da nota na posição i, incrementa o valor.
    */


    for(let i = 0; i < statusNota.length; i++){
        if(statusNota[i] == 'concluido'){
            qtdeConcluido = qtdeConcluido + 1
        }  
    }

    for(let i = 0; i < statusNota.length; i++){
        if(statusNota[i] == 'enviada'){
            qtdeEnviada = qtdeEnviada + 1
        }   
    }

    for(let i = 0; i < statusNota.length; i++){
        if(statusNota[i] == 'aguardando'){
            qtdeAguardando = qtdeAguardando + 1
        }   
    }

    for(let i = 0; i < statusNota.length; i++){
        if(statusNota[i] == 'emandamento'){
            qtdeEmAndamento = qtdeEmAndamento + 1
        }
    }

    for(let i = 0; i < statusNota.length; i++){
        if(statusNota[i] == 'naoenviada'){
            qtdeNaoEnviada = qtdeNaoEnviada + 1
        }  
    }

    arrayStatus.push(qtdeConcluido, qtdeEnviada, qtdeEmAndamento, qtdeAguardando, qtdeNaoEnviada)



    console.log(arrayStatus)


    const data = {
        labels,
        datasets: [{
            label: 'Valor',
            data: arrayStatus,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ],
              borderWidth: 1,
        }]
    }


    return(
        <>
            <div>
                <div className={styles.graphArea}>
                    <PolarArea options={options} data={data} />
                </div>
            </div>
        </>
    )
}