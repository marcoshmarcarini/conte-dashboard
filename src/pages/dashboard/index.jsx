import MainMenu from "@/components/MainMenu";
import GraficoBar from "@/components/GraficoBar";
import GraficoDonut from "@/components/GraficoDonut";
import CampanhaPaga from "@/components/CampanhaPaga";
import styles from '@/styles/Home.module.css';


export default function dashboard(){
    return(
        <>
            <MainMenu />
            <div>
                <h2>Página do Dashboard</h2>
                <div className={`${styles.paginaInicial}`}>
                    <GraficoBar />
                    <GraficoDonut />
                    <CampanhaPaga />
                </div>
            </div>
        </>
    )
}