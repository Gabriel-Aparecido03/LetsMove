import React,{useState,useEffect} from 'react'

import {SideBar} from '../components/SideBar'

import '../styles/pages/WorkoutPage.scss'
import StartingCycle from '../assets/images/starting-cycle.jpg'

import {exercises} from '../resource/exercices'
import { useAuth } from '../hooks/useAuth'

export function WorkoutPage() {
    const[changeTextButton,setChangeTextButton] = useState<string>('start-countdown')
    const [isStopped,setisStopped] = useState<boolean>(true)
    const[seconds,setSeconds] = useState<number>(0)
    const [minutes,setMinutes] = useState<number>(0) 
    const[intervalStop,setIntervalStop] = useState<any>()


    function startCountdown() {
        setisStopped(!isStopped)
        if(isStopped === true) {
            setIntervalStop(setInterval(()=>{
                let secondsTimer = 0
                let minutesTimer = 0
                
                setSeconds((seconds)=> secondsTimer = seconds + 1)
                if(secondsTimer >=60) {
                    setMinutes((minutes)=> minutesTimer = minutes + 1)
                    setSeconds((seconds)=> seconds - seconds)
                }
                if(minutesTimer >= 60) {
                    return false
                }
            },1000))
        }

        else {
            clearInterval(intervalStop)
        }
        
    }

    return(
        <div id="workout">
            <aside>
                <SideBar/>
            </aside>
            <main>
                <div className="profile-content">
                    <img className="photo-profile" src="https://lh3.googleusercontent.com/a/AATXAJz_fK0qfxZUQhKV-HONCUdGtqInKzKjmpKJ-HjN=s96-c" alt="" />
                    <div className="personal-content">
                        <p className="name-profile">Gabriel Aparecido da Silva</p>
                        <p>Level: 0</p>
                        <p>Xp: 720</p>
                        <p>Exercícios realiazados: 12</p>
                        <div className="countdown-content">
                            <p className="countdown-painel" onChange={()=>{console.log("erewrw")}}>{minutes>=9?minutes:'0'+minutes}:{seconds>=9?seconds:'0'+seconds}</p>
                            <button 
                                onClick={startCountdown}
                                className="start-countdown"
                            >Começar ciclo</button>
                        </div>
                    </div>
                </div>
                <div className="exercise-content">
                    <div className="exercise-painel">
                    <div className="image-exercise-painel">
                        <img src={StartingCycle} alt="" />
                    </div>
                    <h2 className="title-exercise">Prepare-se</h2>
                    <p className="instructions-exercise"></p>
                        <div className="buttons-content">
                            <button className="failed-button">Falhei</button>
                            <button className="sucess-button">Próximo</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}