import React from 'react'
import './css/login.css'
import { Button } from "@mui/material"
import { auth, provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Login() {

    const [state, dispatch] = useStateValue();

    const signin = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://iili.io/Hoq6f1I.png' />
                <h1>Sign into Tethered</h1>
                <Button onClick={signin}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login