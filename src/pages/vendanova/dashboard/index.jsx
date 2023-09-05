'use client'
import { useState, useEffect } from "react";
import MainMenu from "@/components/VendaNova/MainMenu";
import GraficoBar from "@/components/Graficos/GraficoBar";
import GraficoDonut from "@/components/Graficos/GraficoDonut";
import CampanhaPaga from "@/components/Graficos/CampanhaPaga";
import styles from '@/styles/Dashboard.module.css';
import GraficoPolar from "@/components/Graficos/GraficoPolar";
import Rodape from "@/components/Rodape";
import GraficoBarHorizontal from "@/components/Graficos/GraficoBarHorizontal";
import CampanhaPagaMobile from "@/components/Graficos/CampanhaPagaMobile"
import { getSession } from "next-auth/react";

 
export default function dashboard(){
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    
    function getCurrentDimension(){
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
    
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
  }, [screenSize])
   

    return(
        <>
            <MainMenu />
                <div className={`py-[25px]`}>
                    <h2 className={`py-3 text-center text-xl`}>Gráficos</h2>
                    <div className={`${styles.paginaDashboard}`}>
                        {
                            screenSize.width < 991 ? 
                            <GraficoBarHorizontal /> : 
                            <GraficoBar />
                        } 
                            <GraficoDonut />
                        {
                            screenSize.width < 991 ?  
                            <CampanhaPagaMobile /> : 
                            <CampanhaPaga />
                        }
                            <GraficoPolar />
                    </div>
                </div>
            <Rodape />
        </>
    )
}


export const getServerSideProps = async(context) => {
    const session = await getSession(context)
  
    if(!session){
      return{
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {
        session
      }
    }
}