import React,{useState} from 'react'

import { ref,set,get,child } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import '../styles/pages/Home.scss'

import logo from '../assets/images/logo.png'
import principalWoman from '../assets/images/principal-woman.jpg'
import { FcGoogle } from 'react-icons/fc'

export function Home() {
    const {signInWithGoogle}= useAuth()

    const  handleSignIn = ()=>{
        signInWithGoogle()
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