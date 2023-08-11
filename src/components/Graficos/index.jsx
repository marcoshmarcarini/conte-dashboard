"use client"
import React,{useState, useEffect, useRef} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './Graficos.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend} from 'chart.js'
import {Bar} from "react-chartjs-2"
//import { faker } from '@faker-js/faker'



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export default function Graficos(){
    const [notas, setNotas] = useState([])
    const [graph, setGraph] = useState([])
    const graphRef = useRef(null)
    

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, 'notas'))
            const notasData = []
            snapshot.forEach((doc) => {
                notasData.push({id: doc.id, ...doc.data()})
            })
            setNotas(notasData)
        }
        fetchData()
    }, [])


    //Gráfico
    useEffect(() => {
        const graphData = async () => {
            const snap = await getDocs(collection(db, 'notas'))
            const snapData = []
            snap.forEach((doc) => {
                snapData.push({id: doc.id, ...doc.data})
            })
            setGraph(snapData)
        }
        graphRef.current = graph
        console.log(graphRef.current)
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
            text: 'Chart.js Bar Chart',
            },
        },
    }

    const labels = graph.map(row => row.campanha)
    
    const data = {
        labels,
        datasets: [{
            label: 'Valor por Campanha',
            data: graph.map(row => row.valor)
        }]
    }


    /* console.log(graph)
    const ctx = document.querySelector('#myChart')
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: graph.map(row => row.campanha),
            datasets: [
                {
                    label: 'Valor por Campanha',
                    data: graph.map(row => row.valor)
                }
            ]
        }
    }) */


    return(
        <>
            <div>
                <h4>Componente com Gráficos</h4>
                <p>A ideia é que os gráficos sejam chamados e gerados com os dados do firebase.</p>
                <div>
                    {notas.map((nota) => {
                        return(
                            <ul key={nota.id}>
                                <li>Campanha: {nota.campanha}</li>
                                <li>Tipo: {nota.tipo}</li>
                                <li>Fornecedor: {nota.fornecedor}</li>
                                <li>Valor: R$ {Number(nota.valor).toFixed(2).replace('.',',')}</li>
                            </ul>
                        )
                    })}
                </div>
                <div className={styles.graphArea}>
                    <canvas id="mygraph"></canvas>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </>
    )
}