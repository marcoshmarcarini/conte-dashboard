"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import styles from './Velocimetro.module.css'
//import {Chart as ChartJS, CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend} from 'chart.js'
//import {Bar} from "react-chartjs-2"

import { Inter } from 'next/font/google'

const inter = Inter({ weight: '700', subsets: ['latin'], style: 'normal' })


export default function Velocimetro() {
    const [graph, setGraph] = useState([])

    useEffect(() => {
        const graphData = async () => {
            const colecao = collection(db, 'solicitacao')
            const q = query(colecao, where('status', '==', 'Concluído'))
            const snapQuery = await getDocs(q)
            const snapDataQuery = []

            snapQuery.forEach((doc) => {
                snapDataQuery.push({ id: doc.id, ...doc.data() })
            })
            setGraph(snapDataQuery)
        }
        graphData()
    })

    //Recebendo os dados do Gráfico
    const labels = graph.map(row => row.campanha)
    const value = graph.map(row => Number(row.valor))

    var somaValor = value.reduce((accumulator, currentVelue) => accumulator + currentVelue, 0)
    var valorMaximo = 500000
    const porcentagemPreenchimento = (somaValor / valorMaximo) * 100 * 10
    const strokeDasharray = `${porcentagemPreenchimento} ${1000 - porcentagemPreenchimento}`



    return (
        <>
            <div
                className={`flex flex-col justify-center items-center`}
            >
                <p className={`${styles.titulo} ${inter.className}`}>Montante Pago em R$</p>
                <svg width={300} height={300}>
                    <circle
                        cx={150}
                        cy={150}
                        r={130}
                        stroke="#eeeeee"
                        fill="transparent"
                        strokeWidth={30}
                    />
                    <circle
                        cx={150}
                        cy={150}
                        r={130}
                        stroke="#2ecc71"
                        fill="transparent"
                        strokeWidth={30}
                        fillOpacity={porcentagemPreenchimento / 100}
                        strokeDasharray={strokeDasharray}
                    />
                    {/* rgba(255, 159, 64, 1) */}
                </svg>
                <div className={styles.somaValor}>
                    <p>R$ {somaValor.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>

        </>
    )
}