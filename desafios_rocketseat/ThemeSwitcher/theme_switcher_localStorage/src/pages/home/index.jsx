import './style.css'

const Home = () => {
    
    
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
                                <a id="light" href="#">Light</a>
                            </li>

                            <li className="dropdown-item">
                                <a id="dark" href="#">Dark</a>
                            </li>

                            <li className="dropdown-item">
                                <a id="solar" href="#">Solar</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item"><a href="#">Login</a></li>
                </ul>
            </nav>

            <header>
                    <img src="../../../src/images/logo-150x150.svg" className="logo" />
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