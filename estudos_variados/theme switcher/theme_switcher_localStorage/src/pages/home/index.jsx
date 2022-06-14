import React, { useState, useEffect } from 'react'
import './style.css'

const Home = () => {
    const theme = localStorage.getItem('theme')
    const isSolar = localStorage.getItem('isSolar')

    const [logo, setLogo] = useState("../../../src/images/logo-black.png")
    const [solarName, setSolarName] = useState("Solarize")

    useEffect(() => {
        if (theme) {
        let body = document.getElementById('body');

        body.classList.add(theme)
        isSolar && body.classList.add('solar')
        }

        if (isSolar) setSolarName("Normalize")
    }, [])
    

    const handleLightMode = () => {
        let body = document.getElementById('body');
        body.classList.replace('dark', 'light')
        localStorage.setItem('theme', 'light')

        setLogo("../../../src/images/logo-black.png")
    }

    const handleDarkMode = () => {
        let body = document.getElementById('body');
        body.classList.replace('light', 'dark')

        localStorage.setItem('theme', 'dark')
        setLogo("../../../src/images/logo-white.png")
    }

    const handleSolarMode = () => {
        let body = document.getElementById('body');
        if (body.classList.contains('solar')) {
            body.classList.remove('solar')

            setSolarName("Solarize")

            localStorage.removeItem('isSolar')
        }
        else {
            body.classList.add('solar')

            setSolarName("Normalize")

            localStorage.setItem('isSolar', true)
        }
    }
    
    return (
        <div id="body">
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item"><a href="#">Home</a></li>
                    <li className="nav-item"><a href="#">Sobre</a></li>
                    
                    {// dropdown menu
                    }
                    <li className="nav-item has-dropdown">
                        <a href="#">Theme</a>
                        <ul className="dropdown">
                            <li className="dropdown-item">
                                <a id="light" href="#" onClick={handleLightMode}>Light</a>
                            </li>

                            <li className="dropdown-item">
                                <a id="dark" href="#" onClick={handleDarkMode}>Dark</a>
                            </li>

                            <li className="dropdown-item">
                                <a id="solar" href="#" onClick={handleSolarMode}>{solarName}</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item"><a href="#">Login</a></li>
                </ul>
            </nav>

            <header>
                    <img src={logo} className="logo" />
                    <h1>Front-End Web Development,<br/>Fired Up</h1>

                    <p>HTML, React, JavaScript, Node.js</p>
            </header>

            <main>
                <h2>Impsum</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quasi quae tenetur, dignissimos eveniet quis maxime perspiciatis odio quo sint porro totam iste vitae facilis incidunt velit praesentium, adipisci fuga!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, perspiciatis iure. Laudantium nesciunt nulla aspernatur, nostrum amet beatae illum adipisci tempore inventore doloribus eligendi facilis cumque corporis quos? Similique, vero?</p>
                
                <h2>Sailor lorem</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis non veniam officia repellat, possimus incidunt facilis ullam labore. Sapiente, quaerat perferendis odit saepe magni provident quo minus recusandae fugiat. Sequi!</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat amet, ipsam obcaecati impedit perferendis enim repellendus corrupti voluptatibus iusto unde voluptas, velit, laborum magni atque natus accusamus nemo ad delectus.</p>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis incidunt exercitationem eveniet quam illum doloremque, temporibus blanditiis, ullam maxime necessitatibus itaque laborum, totam repellendus dicta! Delectus incidunt illum rerum unde?</p>
            </main>

        </div>
    )
}

export default Home;