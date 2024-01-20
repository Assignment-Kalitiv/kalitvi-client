import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Navigator from './components/navigator/Navigator';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Users from './components/pages/Users';
import Register from './components/pages/Register';
import { useMemo } from 'react';
import { pages } from './util/pages'
import { useSelectorAlert, useSelectorAuth } from './components/redux/store';
import { alertActions } from './components/redux/slices/alertSlice';

function getRoutes(userData) {
    return userData ? pages.auth : pages.noauth;
}

function App() {

    const dispatch = useDispatch();
    const alertData = useSelectorAlert();
    const userData = useSelectorAuth();
    const routes = useMemo(() => getRoutes(userData), [userData])

    return (
        <>
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
            <Snackbar open={alertData.show} autoHideDuration={5000} onClose={() => dispatch(alertActions.clear())}>
                <Alert
                    onClose={() => dispatch(alertActions.clear())}
                    severity={alertData.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertData.message}
                </Alert>
            </Snackbar>
        </>

    );
}

export default App;
