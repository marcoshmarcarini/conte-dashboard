'use client'
import { useState, useEffect } from "react";
import MainMenu from "@/components/Admin/MainMenu";
import Rodape from "@/components/Rodape";

import GraficoBar from "@/components/Graficos/GraficoBar";
import GraficoDonut from "@/components/Graficos/GraficoDonut";
import CampanhaPaga from "@/components/Graficos/CampanhaPaga";
import Velocimetro from "@/components/Graficos/Velocimetro";
import styles from '@/styles/Dashboard.module.css';


import GraficoBarHorizontal from "@/components/Graficos/GraficoBarHorizontal";
import CampanhaPagaMobile from "@/components/Graficos/CampanhaPagaMobile"


export default function dashboard() {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: typeof window !== 'undefined' ? window.innerWidth : 0,
            height: typeof window !== 'undefined' ? window.innerHeight : 0
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])


    return (
        <>
            <MainMenu />
            <div className={`container m-auto py-[25px]`}>
                <h2 className={`py-3 text-center text-xl`}>Dashboard</h2>
                <div className={`${styles.paginaDashboard}`}>
                    <div className={`${styles.part1}`}>
                        {
                            screenSize.width < 991 ?
                                <GraficoBarHorizontal /> :
                                <GraficoBar />
                        }
                        <GraficoDonut />
                    </div>
                    <div className={`${styles.part2}`}>
                        {
                            screenSize.width < 991 ?
                                <CampanhaPagaMobile /> :
                                <CampanhaPaga />
                        }
                        <Velocimetro />
                    </div>
                </div>
            </div>
            <Rodape />
        </>
    )
}
