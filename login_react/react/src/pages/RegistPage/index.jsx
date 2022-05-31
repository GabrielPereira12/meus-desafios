import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import './style.css'

const RegistPage = () => {
    const { regist } = useContext(AuthContext)
    const navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const notBlank = (e) => {
        if (e === "") {
            return false
        }else return true
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (notBlank(name) && notBlank(email) && notBlank(password) && notBlank(confirmPassword)) {
            console.log("Todos os inputs foram preenchidos!")

            if (password !== confirmPassword) {
                alert("As senhas não batem!")
            }else {
                regist(name, email, password)

                navigate('/faceRegist')
            }
        }else alert("Preencha todos os campos!")
    }

    return (
        <div id="regist">
            <h1>Registar no Sistema</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <input type="tel" name="name" id="name" 
                    onChange={(event) => setName(event.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" 
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" 
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>
                
                <div className="field">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" 
                    onChange={(event) => setConfirmPassword(event.target.value)}/>
                </div>

                <div className="actions">
                    <button type="submit">Registar</button>
                    <button onClick={() => {
                        navigate('/login')
                    }}>Logar</button>
                </div>
            </form>
        </div>
    )
}

export default RegistPage