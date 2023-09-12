'use client'
import React, { useState } from "react"
import { db, storage } from '@/utils/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import styles from "./Signin.module.css"

export default function Signin() {

    const [usuario, setUsuario] = useState({
        username: '', email: '', password: '', fotoPerfil: ''
    })

    const [selectedFoto, setSelectedFoto] = useState(null)

    const router = useRouter()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedFoto(file)
    }

    //Adicionar novo usuário
    const AddUsuario = async (e) => {
        e.preventDefault()

        if (usuario.username !== '' && usuario.email !== '' && usuario.password !== '') {
            const storageRef = ref(storage, `fotos_perfil/${selectedFoto.name}`)
            await uploadBytes(storageRef, selectedFoto)
            const fotoPerfilURL = await getDownloadURL(storageRef)


            await addDoc(collection(db, 'usuarios'), {
                username: usuario.username,
                email: usuario.email,
                password: usuario.password,
                fotoPerfil: fotoPerfilURL
            })

            //Restaurando Estado
            setUsuario({
                username: '', email: '', password: '', fotoPerfil: ''
            })
            setSelectedFoto(null)

            router.push('/login')

        }else{
            console.log('Algo deu errado!')
        }

    }


    return (
        <>
            <div className={`${styles.card}`}>
                <h2>Formulário de Inscrição</h2>
                <form action="" className={`flex flex-col gap-5`}>
                    <input
                        type="text"
                        name="username"
                        placeholder={`Nome de Usuário`}
                        onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={`E-mail`}
                        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder={`Password`}
                        onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                    />
                    <div className={`${styles.formControl}`}>
                        <label htmlFor="fotoPerfil">
                            <Image
                                width={25}
                                height={25}
                                src="https://img.icons8.com/ios-filled/25/ffffff/user-male-circle.png" alt="user-male-circle"
                            />
                            Foto de Perfil
                        </label>
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            name="fotoPerfil"
                            id="fotoPerfil"
                            placeholder={`Foto de Perfil`}
                            onChange={handleFileChange}
                        />
                    </div>
                    <input type="submit" value={`Realizar Inscrição`} onClick={AddUsuario} />
                    <div className={`${styles.txtForm}`}>
                        <p>
                            Já é inscrito? <Link href="/login">Clique aqui</Link> e faça seu login.
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}