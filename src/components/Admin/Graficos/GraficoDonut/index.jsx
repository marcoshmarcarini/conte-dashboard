"use client"
import React,{useState, useEffect} from 'react'
import {collection, getDocs, query, where} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './GraficoDonut.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend, ArcElement} from 'chart.js'
import {Doughnut} from "react-chartjs-2"


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)


export default function GraficoDonut(){
    const [graph, setGraph] = useState([])


    //Gráfico Data
    //Valores Gerais
    useEffect(() => {
        const graphData = async () => {
            const colecao = collection(db, 'solicitacao')
            const q = query(colecao, where('status', '==', 'Com Prefeitura'))
            const snapQuery = await getDocs(q)
            const snapDataQuery = []

            snapQuery.forEach((doc) => {
                snapDataQuery.push({ id: doc.id, ...doc.data() })
            })
            setGraph(snapDataQuery)
        }
        
        graphData()
    
    }, [])
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            display: false,
            font: {
                family: "'Helvetica Neue', sans-serif",
                size: 20,
            }
            },
            title: {
            display: true,
            text: 'Campanhas Com Prefeitura',
            font: {
                family: "'Helvetica Neue', sans-serif",
                size: 25,
            }
            },
        },
    }

    //Gráfico de Barra
    const labels = graph.map(row => row.campanha)
    const value = graph.map(row => row.valor)
    
    const data = {
        labels,
        datasets: [{
            label: 'Valor',
            data: value,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }]
    }


    return(
        <>
            <div className={`container`}>
                <div className={styles.graphAreaDonut}>
                    <Doughnut options={options} data={data} />
                </div>
            </div>
        </>
    )
}