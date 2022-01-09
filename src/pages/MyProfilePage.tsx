import React from 'react';

import { SideBar } from '../components/SideBar'
import '../styles/pages/MyProfilePage.scss'

import { useAuth } from '../hooks/useAuth'

import {FcGoogle} from 'react-icons/fc'

export function MyProfilePage() {

    const {user} = useAuth()

    return(
        <div id="MyProfilePage">
            <aside>
                <SideBar/>
            </aside>
            <main>
                <div className="informations-content">
                    <h1 className="title">{user?.name}</h1>
                    <div className="level-content">
                        <p className="level-text">Level: {user?.level}</p>
                        <p className="completed-cycle-text" >Exercícios feitos: {user?.completedCycles}</p>
                        <p className="xp-text">Xp: {user?.xp}</p>
                    </div>
                </div>
                <div className="photo-content">
                    <img src={user?.photo} alt="foto de perfil" />
                    <div className="login-content">
                        <p>Entrou usando</p>
                        <p><FcGoogle/></p>
                    </div>
                </div>
            </main>
        </div>
    )
}