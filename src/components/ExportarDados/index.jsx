import Image from "next/image"
import styles from '@/components/ExportarDados/ExportarDados.module.css'
var tableExport = require('table-export') /* Só diz que está vazio, mas não está */


export default function ExportarDados(){

    const handleExportar = () => {
        
        const datadeHoje = new Date().toDateString()
        tableExport('tabela-dados', `Export-${datadeHoje}`, 'csv')
        return console.log('Os dados foram exportados com sucesso.')
    }

    const laranja = `e67e22`


    return(
        <>
            <button type="button" onClick={handleExportar} className={styles.botaoExportar}>
                <Image width="26" height="26" src={`https://img.icons8.com/metro/26/${laranja}/download.png`} alt="download" />
            </button>
        </>
    )
}