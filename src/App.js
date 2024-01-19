import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigator from './components/navigator/Navigator';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Users from './components/pages/Users';
import Register from './components/pages/Register';
import { useEffect, useMemo, useState } from 'react';
import { pages } from './util/pages'
import { useSelectorAuth } from './components/redux/store';

function getRoutes(isLogged) {
    return isLogged ? pages.auth : pages.noauth;
}

function App() {

    // const [logged, setLogged] = useState(true);
    const logged = useSelectorAuth();
    const routes = useMemo(() => getRoutes(logged), [logged])

    // const handleChange = (e) => {
    //     setLogged(e.target.checked)
    // }

    return (
        <>
            {/* <input type='checkbox' checked={logged} onChange={handleChange} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigator routes={routes} />} >
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/logout' element={<Logout />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
