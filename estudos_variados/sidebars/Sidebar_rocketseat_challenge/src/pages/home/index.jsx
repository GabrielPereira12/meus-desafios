import './style.css'

const Home = () => {


    return (
        <div id="home">

                <input type="checkbox" id="checkbox"/>
                <label htmlFor="checkbox">
                    <img src="../../../src/images/menu.svg"/>
                </label>
            
            <div className="sidebar">

                <img className="sbi-logo" src="../../../src/images/logo.svg"/>

                <div className="search-box sbi-search">
                    <button>
                            <img src="../../../src/images/search.svg"/>
                    </button>
                    <input type="text" id="text" placeholder="Buscar"/>
                </div>

                <ul>
                    <li className="sbi">
                        <a href="#">
                            <img src="../../../src/images/grid.svg"/>
                            <span>Dashboard</span> 
                        </a>
                    </li>

                    <li className="sbi">
                        <a href="#">
                            <img src="../../../src/images/pet.svg"/>
                            <span>Pets</span> 
                        </a>
                    </li>

                    <li className="sbi">
                        <a href="#">
                            <img src="../../../src/images/user.svg"/>
                            <span>Clientes</span> 
                        </a>
                    </li>

                    <li className="sbi">
                        <a href="#">
                            <img src="../../../src/images/vet.svg"/>
                            <span>Vets</span>
                        </a>
                    </li>

                    <li className="sbi">
                        <a href="#">
                            <img src="../../../src/images/settings.svg"/>
                            <span>Ajustes</span> 
                        </a>
                    </li>

                </ul>

                <div className="user">
                    <img src="../../../src/images/photo.jpg" className="user-avatar"/>
                    <span className="user-name">Eleanor Pena</span>
                    <span className="user-occupation">Veterinária</span>

                    <img src="../../../src/images/log-out.svg"/>
                </div>
            </div>
            <main>
                <span>Dashboard</span>
            </main>
            

        </div>
    )
}

export default Home;