import React from 'react';

import '../styles/components/SideBar.scss'

import { useNavigate } from 'react-router-dom'

import  logo  from '../assets/images/logo.png'

import { AiOutlineHome } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

export function SideBar() {

    const navigate = useNavigate

    const handleNavigateToHome = ()=> {
        
    }
    return(
        <aside className="side-bar">
             <img src={logo} alt="imagem do logo"  />
            <div className="side-bar-content">
                <div className="icons-content">
                    <ul>
                        <li><AiOutlineHome /></li>
                        <li><BsFillPersonFill/></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}