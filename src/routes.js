import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Filme from './pages/Filme';
import Erro from './pages/Erro';
import Favoritos from './pages/Favoritos';

// components
import Header from './components/Header'

// Componente de Rotas
function RoutesApp() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/filme/:id' element={ <Filme/> } />
                <Route path='/favoritos' element={ <Favoritos/> } />

                <Route path='*' element={ <Erro/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;