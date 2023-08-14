"use client"
import React,{useState, useEffect} from 'react'
import {collection, getDocs, query, where} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './CampanhaPaga.module.css'
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


export default function CapanhasPagas(){
    const [graph, setGraph] = useState([])
    
    //Aparecer somente as campanhas pagas.
    
    //Gráfico Data
    //Valores Gerais
    useEffect(() => {
        const graphData = async () => {
            const q = query(collection(db, 'notas'), where('pago', '==', "Sim"))
            const snapQuery = await getDocs(q)
            const snapDataQuery = []

            snapQuery.forEach((doc) => {
                snapDataQuery.push({id: doc.id, ...doc.data()})
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
            },
            title: {
                display: true,
                text: 'Campanhas Pagas X Valor',
            },
        },
    }

    //Gráfico de Barra
    const labels = graph.map(row => row.campanha)
    const value = graph.map(row => Number(row.valor))   

    var somaValor = 0

    console.log(value)

    for(let i = 0; i<labels.length; i++){
        somaValor += value[i]
    }

    console.log(`Total: R$ ${somaValor}`)
    
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
            <div>
                <div className={styles.graphArea}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </>
    )
}