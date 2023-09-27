"use client"
import React, { useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './GraficoBar.module.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from "react-chartjs-2"
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })
console.log(roboto.style.fontFamily)

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export default function Grafico() {
    const [graph, setGraph] = useState([])


    //Gráfico Data
    useEffect(() => {
        const graphData = async () => {
            const colecao = collection(db, 'solicitacao')
            const q = query(colecao, where('status', '==', 'Recebido'))
            const snap = await getDocs(q)
            const snapData = []

            snap.forEach((doc) => {
                snapData.push({ id: doc.id, ...doc.data() })
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
                labels: {
                    font: {
                        family: "'Helvetica Neue', sans-serif",
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: 'Campanhas Recebidas',
                font: {
                    family: "'Helvetica Neue', sans-serif",
                    size: 25,
                }
            },
            scales: {
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
    const value = graph.map(row => +row.valor)


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


    return (
        <>
            <div className={`container`}>
                <div className={styles.graphArea}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </>
    )
}