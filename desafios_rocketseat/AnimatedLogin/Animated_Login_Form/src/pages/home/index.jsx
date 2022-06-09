import React, { useState } from 'react'
import './style.css'

const Home = () => {
    const [password, setPassword] = useState()
    const [strength, setStrength] = useState(0)
    const [validations, setValidations] = useState([])

    const validatePassword = (event) => {
        setPassword(event.target.value)

        setValidations([
            (password.length > 5),
            (password.search(/[A-Z]/) > -1),
            (password.search(/[0-9]/) > -1),
            (password.search(/[$&+,:;=?@#]/) > -1)
        ])

        setStrength(validations.reduce((acc, cur) => acc + cur))
    }

    return (
        <div id="home-body">
            <form>

            <div className="field">
                <input type="email" name="email" id="email" className="input" placeholder=" "/>
                <label htmlFor="email" className="label">Email</label>
            </div>

            <div className="field">
                <input type="password" name="password" id="password" className="input" placeholder=" " onChange={validatePassword}/>
                <label htmlFor="password" className="label">Password</label>
            </div>

            <div className="strength">
                <span className="bar bar-1" className:bar-show={strength > 0}></span>
                <span className="bar bar-2" className:bar-show={strength > 1}></span>
                <span className="bar bar-3" className:bar-show={strength > 2}></span>
                <span className="bar bar-4" className:bar-show={strength > 3}></span>
            </div>

            <ul>
                <li>must be at least 5 characteres</li>
                <li>must contain a capital letter</li>
                <li>must contain a number </li>
                <li>must contain one of $&+,:;=?@#</li>
            </ul>
            </form>
        </div>
    )
}

export default Home