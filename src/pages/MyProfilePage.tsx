import React,{useState} from 'react';

import { SideBar } from '../components/SideBar'
import '../styles/pages/MyProfilePage.scss'

import { useAuth } from '../hooks/useAuth'

import {FcGoogle} from 'react-icons/fc'

export function MyProfilePage() {

    const {user} = useAuth()

    console.log(user)
    return(
        <div id="MyProfilePage">
            <aside>
                <SideBar/>
            </aside>
            <main>
                <div className="informations-content">
                    <h1 className="title">Gabriel Aparecido da Silva</h1>
                    <div className="level-content">
                        <p className="level-text">Level:10</p>
                        <p className="completed-cycle-text" >Exercícios feito: 24</p>
                        <p className="xp-text">720xp</p>
                    </div>
                </div>
                <div className="photo-content">
                    <img src="https://lh3.googleusercontent.com/a/AATXAJz_fK0qfxZUQhKV-HONCUdGtqInKzKjmpKJ-HjN=s96-c" alt="foto de perfil" />
                    <div className="loggin-content">
                        <p>Entrou usando</p>
                        <p><FcGoogle/></p>
                    </div>
                </div>
            </main>
        </div>
    )
}