import {createContext,useState,ReactNode,useEffect} from 'react';

import { useNavigate } from 'react-router-dom'

import {signInWithPopup} from 'firebase/auth'
import {get,ref,child,set} from 'firebase/database'
import {provider,auth,database} from '../services/firebase'

import { Home } from '../pages/Home';


type AuthContextProviderProps = {
    children: ReactNode;
}

type User = {
    name:string,
    photo:string,
    id:string,
    level:number,
    xp:number,
    completedCycles:number
}

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: any
}

export const AuthContext = createContext({} as AuthContextType)
export function AuthContextProvider(props:AuthContextProviderProps) {
    
    const navigate = useNavigate()
    const [user,setUser] = useState<User>()


    useEffect(()=>{
        const user = auth.currentUser
    })

    async function signInWithGoogle() {
        await signInWithPopup(auth,provider)
        .then((result:any ) =>{

        if(!result.user.displayName || !result.user.photoURL) {
            return false
        }

        const userPreview = {
            name: result.user.displayName,
            photo:result.user.photoURL,
            id:result.user.uid,
        }

        const databaseRef = ref(database)

        get(child(databaseRef,`users/${userPreview.id}`)).then((snapshot)=>{

            if(snapshot.val()) {
                setUser(snapshot.val())
                navigate(`/Myprofile/${snapshot.val().id}`)
            }

            else {
                set(ref(database,`users/`+userPreview.id),{
                    name:userPreview.name,
                    photo:userPreview.photo,
                    id:userPreview.id,
                    level:0,
                    xp:0,
                    completedCycles:0
                })

                setUser({
                    name:userPreview.name,
                    photo:userPreview.photo,
                    id:userPreview.id,
                    level:0,
                    xp:0,
                    completedCycles:0
                })

                navigate(`/Myprofile/${userPreview.id}`)
            }
        })
    })
}
    

    return(
        <AuthContext.Provider value={{user,signInWithGoogle}}>
            <div>{props.children}</div>
        </AuthContext.Provider>
    )
}