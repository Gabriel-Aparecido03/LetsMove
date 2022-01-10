import React,{useState} from 'react'

import {SideBar} from '../components/SideBar'

import '../styles/pages/WorkoutPage.scss'
import StartingCycle from '../assets/images/starting-cycle.jpg'
import RunningCycle from '../assets/images/arm.jpg'

import { exercises } from '../resource/exercices'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import { child, push, ref, update,get } from 'firebase/database'

export function WorkoutPage() {
    const {user} = useAuth()

    const [isFirstClick,setIsFirstClick] = useState<boolean>(true)

    const[imageWorkout,setImageWorkout] = useState<string>(StartingCycle) 

    const[position,setPosition] = useState<number>(0)
    const [nameOfExercise,setNameOfExercise] = useState<string>('Prepare-se')
    const [instructionExercise,setInstructionsExercise] = useState<string>('')

    const[failedButtonClass,setFailedButtonClass] = useState<string>('failed-button-stopped')
    const[sucessButtonClass,setSucessButtonClass] = useState<string>('sucess-button-stopped')

    const[changeTextButton,setChangeTextButton] = useState<string>('Começar Ciclo')
    const[changeClassButton,setChangeClassButton] = useState<string>('start-countdown')
    
    const [isRunning,setisRunning] = useState<boolean>(true)
    
    const[seconds,setSeconds] = useState<number>(0)
    const [minutes,setMinutes] = useState<number>(0) 
    const[intervalStop,setIntervalStop] = useState<any>()

    const [xp,setXp] = useState<any>(user?.xp)
    const [level,setLevel] = useState<any>(user?.level)
    const [completedCycles,setCompletedCycles] = useState<any>(user?.completedCycles)

    const databaseRef = ref(database)

    function startCountdown() {
        if(isFirstClick === true) {
            nextExercise()
        }
        setIsFirstClick(false)
        
        if(isRunning === true) {
            setisRunning(false)
            setImageWorkout(RunningCycle)

            setChangeTextButton('Fazer um pausa')
            setChangeClassButton('stop-countdown')

            setFailedButtonClass('failed-button-running')
            setSucessButtonClass('sucess-button-running')
            
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
            setisRunning(true)
            setFailedButtonClass('failed-button-stopped')
            setSucessButtonClass('sucess-button-stopped')

            setChangeTextButton('Recomeçar ciclo')
            setChangeClassButton('start-countdown')

            clearInterval(intervalStop)
        }
        
    }

    const nextExercise = () => {
        setPosition(position+1)
        selectedExercise(position)
    }

    function selectedExercise(position:number) {
        const numExercises = exercises.length

        if(position > numExercises) {
            setisRunning(true)
            
            setMinutes(0)
            setSeconds(0)
            setPosition(1)
            clearInterval(intervalStop)
            
            setFailedButtonClass('failed-button-stopped')
            setSucessButtonClass('sucess-button-stopped')

            setChangeTextButton('Começar ciclo')
            setChangeClassButton('start-countdown')
            setImageWorkout(StartingCycle)
            setInstructionsExercise('')
            setNameOfExercise('Prepare-se')
           clearInterval(intervalStop)
           setIsFirstClick(true)
            return finishCycle()
        }

        setNameOfExercise(exercises[position].exercise)
        setInstructionsExercise(exercises[position].instructions)
    }

    function finishCycle() {
        let xpUser :any = xp
        let levelUser:any = level
        let completedCyclesUser: any = completedCycles
        
        let currentXp = xpUser + 80
        const xpPassed = levelUser * 80

        if(currentXp >= xpPassed) {
            currentXp = 0
            levelUser +=1
        }

        const userUpdated = {
            name:user?.name,
            photo:user?.photo,
            id:user?.id,
            xp:currentXp,
            completedCycles:completedCyclesUser+=1,
            level:levelUser
        }

        const newPostKey = push(child(ref(database), 'users')).key;
        const updates:any = {};
        updates['/users/' + user?.id + '/'] = userUpdated;
        console.log('...')
        update(ref(database), updates);

        updatedInformations()
    }

    function finishCycleWithoutXp() {
        setMinutes(0)
        setSeconds(0)
        setPosition(0)
        clearInterval(intervalStop)
        
        setFailedButtonClass('failed-button-stopped')
        setSucessButtonClass('sucess-button-stopped')

        setChangeTextButton('Começar ciclo')
        setChangeClassButton('start-countdown')
        setImageWorkout(StartingCycle)
        setInstructionsExercise('')
        setNameOfExercise('Prepare-se')


    }


    function updatedInformations() {
        get(child(databaseRef, `users/${user?.id}`)).then((snapshot) => {
            const userUpdated = (snapshot.val())

            setCompletedCycles(userUpdated.completedCycles)
            setXp(userUpdated.xp)
            setLevel(userUpdated.level)
        })
    }

    return(
        <div id="workout">
            <aside>
                <SideBar/>
            </aside>
            <main>
                <div className="profile-content">
                    <img className="photo-profile" src={user?.photo} alt="" />
                    <div className="personal-content">
                        <p className="name-profile">{user?.name}</p>
                        <p>Level:{level}</p>
                        <p>Xp: {xp}</p>
                        <p>Exercícios realiazados: {completedCycles}</p>
                        <div className="countdown-content">
                            <p className="countdown-painel">{minutes>9?minutes:'0'+minutes}:{seconds>9?seconds:'0'+seconds}</p>
                            <button 
                                onClick={startCountdown}
                                className={changeClassButton}
                            >{changeTextButton}</button>
                        </div>
                    </div>
                </div>
                <div className="exercise-content">
                    <div className="exercise-painel">
                    <div className="image-exercise-painel">
                        <img src={imageWorkout} alt="" />
                    </div>
                    <h2 className="title-exercise">{nameOfExercise}</h2>
                    <p className="instructions-exercise">{instructionExercise}</p>
                        <div className="buttons-content">
                            <button 
                            className={failedButtonClass}
                            onClick={isRunning?finishCycleWithoutXp:undefined}
                            >Falhei</button>
                            <button 
                            className={sucessButtonClass}
                            onClick={isRunning?nextExercise:undefined}
                            >Próximo</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}