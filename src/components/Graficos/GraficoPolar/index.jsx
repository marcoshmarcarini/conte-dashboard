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
            const snap = await getDocs(collection(db, 'solicitacao'))
            const snapData = []
            snap.forEach((doc) => {
                snapData.push({id: doc.id, ...doc.data()})
            })
            setGraph(snapData)
        }
      
        
        graphData()
    

    }, [])

    const countStatusPerCampanha = () => {
        const statusCount = {}

        graph.forEach(row => {
            const campanha = row.campanha
            const status = row.status

            if(!statusCount[campanha]){
                statusCount[campanha] = {
                    concluido: 0,
                    enviada: 0,
                    aguardando: 0,
                    em_andamento: 0,
                    nao_enviada: 0,
                }
            }

            statusCount[campanha][status]++        
        })

        return statusCount
    }

    const statusCountPerCampanha = countStatusPerCampanha()

    //Transformar os dados em um formato adequado para o gráfico polar.
    const campanhas = Object.keys(statusCountPerCampanha)

    

    const statusLabels = campanhas.length > 0 ? Object.keys(statusCountPerCampanha[campanhas[0]]) : []
    
    //Função para obter a cor de fundo com base no status
        const getBackgroundColorForStatus = status => {
            //Mapeie os status para as cores correnspondentes
            const colorMap = {
                concluido: 'rgba(255, 99, 132, 0.5)',
                enviada: 'rgba(54, 162, 235, 0.5)',
                aguardando: 'rgba(255, 206, 86, 0.5)',
                em_andamento: 'rgba(75, 192, 192, 0.5)',
                nao_enviada: 'rgba(153, 102, 255, 0.5)',
            };
            return colorMap[status]
        }

    const datasets = statusLabels.map(label => ({
        label,
        data: campanhas.map(campanha => statusCountPerCampanha[campanha][label]),
        backgroundColor: getBackgroundColorForStatus(label),
    }))

    const data = {
        labels: campanhas,
        datasets,
    }

    
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            display: false
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


    return(
        <>
            <div className={`container`}>
                <div className={styles.graphAreaPolar}>
                    <PolarArea options={options} data={data} />
                </div>
            </div>
        </>
    )
}