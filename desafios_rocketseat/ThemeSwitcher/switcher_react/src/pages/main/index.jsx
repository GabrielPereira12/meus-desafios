import React from 'react'
import './style.css'

function Main () {

    const handleCheckbox = () => {
        let check = document.querySelector('input')
        let body = document.getElementById('body')
        
        if(check.checked) {
            body.style.backgroundColor = "var(--dark)"
        }else if (!check.checked) {
            body.style.backgroundColor = "var(--light)"
        }

        
        
    }

    return (
        <div id="body">
            <label className="switch">
                <input type="checkbox" onChange={handleCheckbox}/>
                <span className="slider round"></span>
                <img id="moon" src="../../../src/contents/svg/moon.svg"/>
                <img id="sun" src="../../../src/contents/svg/sun.svg"/>
            </label>
        </div>
    )
}

export default Main;