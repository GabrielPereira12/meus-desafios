import React, { useState } from 'react'
import './style.css'

const Home = () => {

    const [theme, setTheme] = useState({
        size: "md",
        color: "blue",
        background: "light"
    })

    const {size, color, background} = theme

    const onChange = (event) => {
        const { name, value } = event.target
        setTheme(prevState => ({...prevState, [name]: value}))
    }

    console.log(theme)

    return (
        <div 
        data-theme-size={size} 
        data-theme-color={color} 
        data-theme-background={background} 
        id="body" className="size background color">
            <div className="example-text">
                <h1>Theme <span className="primary-color">Switcher</span></h1>
                <p>Some sample text</p>
                <p className="primary-color">Some sample colured text</p>
            </div>

            <div className="font-selector">
                <h2>Font size:</h2>
                <form onChange={onChange}>
                    <label htmlFor='xs' id="small-font-example" className="primary-color">aA</label>
                    <input type="radio" name="size" id="xs" value="xs"/>
                    <input type="radio" name="size" id="sm" value="sm"/>
                    <input type="radio" name="size" id="md" value="md" defaultChecked/>
                    <input type="radio" name="size" id="lg" value="lg"/>
                    <input type="radio" name="size" id="xl" value="xl"/>
                    <label htmlFor='xl' id="large-font-example" className="primary-color">aA</label>
                </form>
            </div>

            <div className="color-selector">
                <h2>Color:</h2>
                <form onChange={onChange}>
                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#0078d7"}}/>
                        <input type="radio" name="color" id="blue" value="blue" defaultChecked />
                        <span className="emoji">&#x1F499;</span>
                    </label>

                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#ffd03d"}}/>
                        <input type="radio" name="color" id="yellow" value="yellow"/>
                        <span className="emoji">&#x2B50;</span>
                    </label>

                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#f495bf"}}/>
                        <input type="radio" name="color" id="pink" value="pink"/>
                        <span className="emoji">&#x1F338;</span>
                    </label>

                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#886ce4"}}/>
                        <input type="radio" name="color" id="purple" value="purple"/>
                        <span className="emoji">&#x1F52E;</span>
                    </label>

                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#f7630c"}}/>
                        <input type="radio" name="color" id="orange" value="orange"/>
                        <span className="emoji">&#x1F525;</span>
                    </label>

                    <label className="color-container">
                        <div className="circle" style={{backgroundColor: "#13a10e"}}/>
                        <input type="radio" name="color" id="green" value="green"/>
                        <span className="emoji">&#x1F952;</span>
                    </label>
                </form>
            </div>

            <div className="background-selector">
                <h2>Background:</h2>
                <form onChange={onChange}>
                    <label className="background-box" id="light-theme">
                        <input type="radio" name="background" id="light" value="light" defaultChecked />
                        <span style={{color: "#000000"}}>Light</span>
                    </label>

                    <label className="background-box" id="dim-theme">
                        <input type="radio" name="background" id="dim" value="dim"/>
                        <span style={{color: "#ffffff"}}>Dim</span>
                    </label>
                    
                    <label className="background-box" id="dark-theme">
                        <input type="radio" name="background" id="dark" value="dark"/>
                        <span style={{color: "#ffffff"}}>Dark</span>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Home;