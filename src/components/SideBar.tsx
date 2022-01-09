import React from 'react';

import '../styles/components/SideBar.scss'

import { useNavigate } from 'react-router-dom'

import  logo  from '../assets/images/logo.png'

import { useAuth } from '../hooks/useAuth'

import { AiOutlineHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

export function SideBar() {

    const {user} = useAuth()

    const navigate = useNavigate()

    const handleNavigateToHome = ()=> {
        navigate(`/Workout/${user?.id}`)
    }

    const handleNavigateToProfile =()=>{
        navigate(`/Myprofile/${user?.id}`)
    }
    return(
        <aside className="side-bar">
             <img onClick ={handleNavigateToHome} src={logo} alt="imagem do logo"  />
            <div className="side-bar-content">
                <div className="icons-content">
                    <ul>
                        <li><AiOutlineHome onClick={handleNavigateToHome}/></li>
                        <li><BsFillPersonFill onClick={handleNavigateToProfile}/></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}