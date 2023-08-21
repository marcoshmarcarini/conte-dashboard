import MainMenu from "@/components/MainMenu";
import GraficoBar from "@/components/Graficos/GraficoBar";
import GraficoDonut from "@/components/Graficos/GraficoDonut";
import CampanhaPaga from "@/components/Graficos/CampanhaPaga";
import styles from '@/styles/Dashboard.module.css';
import GraficoPolar from "@/components/Graficos/GraficoPolar";
import Rodape from "@/components/Rodape/rodape";


export default function dashboard(){
    return(
        <>
            <MainMenu />
            <div className={`py-[25px]`}>
                <h2 className={`py-3 text-center text-xl`}>Gráficos</h2>
                <div className={`${styles.paginaDashboard}`}>
                    <GraficoBar />
                    <GraficoDonut />
                    <CampanhaPaga />
                    <GraficoPolar />
                </div>
            </div>
            <Rodape />
        </>
    )
}