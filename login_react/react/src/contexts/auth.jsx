import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom';

import Axios from 'axios'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let recoveredUser = JSON.parse(localStorage.getItem('user'))

        if(recoveredUser !== null) {
            if(recoveredUser.logado) setUser(true)
        }

        setLoading(false)
    }, [])

    const regist = (name, email, password) => {
        const userData = {
            userName: name,
            userEmail: email,
            userPassword: password,
        }

        Axios.post("http://localhost:3001/register", userData)
    }

    const registFace = (face) => {
        let userId = JSON.parse(localStorage.getItem('user')).userId
        console.log(userId)
        const userFaceData = {
            userFaceDescription: face,
            userId: userId
        }

        Axios.post("http://localhost:3001/faceRegister", userFaceData)
    }

    const login = (email, password) => {
            Axios.get("http://localhost:3001/getUsers").then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    let userId = response.data[i].userId
                    let userEmail = response.data[i].userEmail
                    let userPassword = response.data[i].userPassword

                    if (password === userPassword && email === userEmail) {
                        
                        localStorage.setItem('user', JSON.stringify({
                            userId: userId,
                            userEmail: userEmail,
                            logado: true
                        }))
                        setUser(true)

                        navigate('/')

                        break
                    }
                }  
            }) 
    }

    const logout = () => {
        setUser(false)
        localStorage.clear()
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, regist, registFace, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}