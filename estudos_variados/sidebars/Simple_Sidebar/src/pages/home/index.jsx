import './icons.css';
import './style.css';

const Home = () => {


    return (
        <div id="body">

            <input type="checkbox" id="check"/>
            <label htmlFor="check">
                <i className="fas fa-bars" id="button"></i>
                <i className="fas fa-cross" id="cancel"></i>
            </label>

            <div className="sidebar">

                <header>My App</header>

                <ul>
                    <li><a href="#"><i className="fas fa-qrcode">Dashboard</i></a></li>

                    <li><a href="#"><i className="fas fa-link">Shortcuts</i></a></li>

                    <li><a href="#"><i className="fas fa-stream">Overview</i></a></li>

                    <li><a href="#"><i className="fas fa-calendar-week">Events</i></a></li>

                    <li><a href="#"><i className="fas fa-question-circle">About</i></a></li>

                    <li><a href="#"><i className="fas fa-sliders-h">Services</i></a></li>

                    <li><a href="#"><i className="fas fa-envelope">Contact</i></a></li>
                </ul>
            </div>

            <section>
                
            </section>
        </div>
    )
}

export default Home;