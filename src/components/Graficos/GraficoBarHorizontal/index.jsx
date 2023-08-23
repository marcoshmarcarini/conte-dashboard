"use client"
import React,{useState, useEffect, useRef} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './GraficoBarHorizontal.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend} from 'chart.js'
import {Bar} from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export default function GraficoBarHorizontal(){
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
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
            position: 'left',
            display: false,
            labels: {
                display: false
            }
            },
            title: {
            display: true,
            text: 'Campanha x Valor',
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
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
            ],
        }]
    }


    return(
        <>
            <div className={`container`}>
                <div className={styles.graphArea}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </>
    )
}