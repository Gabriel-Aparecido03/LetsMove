import { createContext, useState, ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'

import { signInWithPopup } from 'firebase/auth'
import { get, ref, child, set } from 'firebase/database'
import { provider, auth, database } from '../services/firebase'

import { Home } from '../pages/Home';


type AuthContextProviderProps = {
    children: ReactNode;
}

type User = {
    name: string,
    photo: string,
    id: string,
    level: number,
    xp: number,
    completedCycles: number
}

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: any
}

export const AuthContext = createContext({} as AuthContextType)
export function AuthContextProvider(props: AuthContextProviderProps) {

    const databaseRef = ref(database)
    const navigate = useNavigate()
    const [user, setUser] = useState<User>()


    useEffect(() => {
        
        const isLogged = () =>{
            const userCurrent = auth.currentUser

            if(!userCurrent) {
                 //return navigate('/')
            }
            else {
                checkedInDatabase(userCurrent.uid)
            }
        }

        return isLogged()
    },[])

    async function signInWithGoogle() {
        await signInWithPopup(auth, provider)
            .then((result: any) => {

                if (!result.user.displayName || !result.user.photoURL) {
                    return false
                }

                const userPreview = {
                    name: result.user.displayName,
                    photo: result.user.photoURL,
                    id: result.user.uid,
                }

                get(child(databaseRef, `users/${userPreview.id}`)).then((snapshot) => {

                    if (snapshot.val()) {
                        setUser(snapshot.val())
                        navigate(`/Workout/${snapshot.val().id}`)
                    }

                    else {

                        const newUser :User = {
                            name: userPreview.name,
                            photo: userPreview.photo,
                            id: userPreview.id,
                            level: 0,
                            xp: 0,
                            completedCycles: 0
                        }

                        set(ref(database, `users/` + newUser.id), newUser)
                        setUser(newUser)

                        navigate(`/Myprofile/${newUser.id}`)
                    }
                })
            })
    }

    function checkedInDatabase(id: string) {
        get(child(databaseRef, `users/${id}`)).then((snapshot) => {
            setUser(snapshot.val())
        })
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            <div>{props.children}</div>
        </AuthContext.Provider>
    )
}