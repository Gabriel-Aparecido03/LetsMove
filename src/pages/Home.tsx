import React from 'react'

import { signInWithPopup } from 'firebase/auth'
import { ref,set,get,child } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import { provider,database,auth } from '../services/firebase'

import "react-toastify/dist/ReactToastify.css";
import '../styles/pages/Home.scss'

import { ToastContainer, toast} from 'react-toastify'

import logo from '../assets/images/logo.png'
import principalWoman from '../assets/images/principal-woman.jpg'

import { FcGoogle } from 'react-icons/fc'

export function Home() {
    interface userType {
        name:string,
        photo:string,
        id:string,
        xp:number,
        completedCycles:number
    }

    const navigate = useNavigate()

    const errorToast= ()=> {
        toast.error('Desculpe houve um erro inesperado com os serviços de Autenticação da Google')
    }

    const handleSignIn = ()=>{

        signInWithPopup(auth,provider)
        .then((result:any ) =>{
            const user: userType = {
                name: result.user.displayName,
                photo:result.user.photoURL,
                id:result.user.uid,
                xp:0,
                completedCycles:0
            }
            user.name? handleRegistred(user):errorToast()
        })
    }

    async function registrerInDatabase(user: userType) {
        await set(ref(database, "users/" + user.id),{
            name: user.name,
            photo:user.photo,
            id:user.id,
            xp:user.xp,
            completedCycles:user.completedCycles
        })

        navigate(`Myprofile/${user.id}`)
    }

    function handleRegistred(user: userType) {
        const databaseRef = ref(database)

        get(child(databaseRef,`users/${user.id}`)).then((snapshot) =>{
            snapshot.exists() ? navigate(`Workout/${user.id}`) : registrerInDatabase(user)
        })
    }

    return(
       
        <div id="home">
            <aside>
                <div className="aside-content">
                    <img src={principalWoman} alt="mulher fazendo exercícios com halteres" />
                </div>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logo} alt="loga da LetsMove" />
                    <button onClick={handleSignIn}><FcGoogle/> <strong>Faça acesso com uma conta Google</strong></button>
                </div>
            </main>
            <ToastContainer
                autoClose={2000}
                position="top-center"
                className="toast-container"
                toastClassName="dark-toast"
            />
        </div>
    )
}