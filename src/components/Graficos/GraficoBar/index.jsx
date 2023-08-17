"use client"
import React,{useState, useEffect, useRef} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './GraficoBar.module.css'
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

export default function Grafico(){
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
    const value = graph.map(row => row.valor)
    
    const data = {
        labels,
        datasets: [{
            label: 'Valor',
            data: value
        }]
    }


    return(
        <>
            <div>
                <div className={styles.graphArea}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </>
    )
}