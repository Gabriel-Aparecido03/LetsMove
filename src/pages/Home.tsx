import React from 'react'
import { getAuth,signInWithPopup } from 'firebase/auth'

import { provider } from '../services/firebase'

import '../styles/pages/Home.scss'

import logo from '../assets/images/logo.png'
import principalWoman from '../assets/images/principal-woman.jpg'

import { FcGoogle } from 'react-icons/fc'

export function Home() {

    const handleSignIn = ()=>{
        const auth = getAuth()
        console.log('..')
        signInWithPopup(auth,provider)
        .then((result:any ) =>{
            console.log(result)
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
        </div>
    )
}