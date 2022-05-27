import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')

        if(recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false)
    }, [])

    const regist = (name, email, password) => {
        const data = {
            name: name,
            email: email,
            password: password
        }
        localStorage.setItem('user', JSON.stringify(data))
    }

    const login = (email, password) => {
        let userPassword = JSON.parse(localStorage.getItem('user')).password

        let userEmail = JSON.parse(localStorage.getItem('user')).email

        if (password === userPassword && userEmail === email) {
            setUser('user')

            navigate('/')

        }else return alert("Senha ou Email errados!")

    }

    const logout = () => {
        console.log("logout")
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, regist, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}