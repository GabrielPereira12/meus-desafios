import { useContext } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage'
import FaceLoginPage from './pages/FaceLoginPage';
import { AuthProvider, AuthContext } from './contexts/auth';

export const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/login" />
        }

        return children
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/faceLogin" element={<FaceLoginPage/>} />
                    <Route exact path="/" element={<Private><HomePage/></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}