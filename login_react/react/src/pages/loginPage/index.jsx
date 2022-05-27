import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import './style.css'

const LoginPage = () => {
    const { authenticated, login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (email !== "" && password !== "") {
            login(email, password)
        }else alert("Preencha os campos")
    }

    return (
        <div id="login">
            <h1 className="title">Login do sistema</h1>
            <p>{String(authenticated)}</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha
                    </label>
                    <input type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                    <button onClick={() => {
                        navigate('/faceLogin')
                    }}>Face login</button>
                </div>
                <div className="actions">
                    <button onClick={() => {
                        navigate('/regist')
                    }}>Registar-se</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage