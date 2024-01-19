import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { authActions } from '../redux/slices/authSlice';

const Navigator = ({ routes }) => {

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    function onChangeFn(event, newValue) {
        setValue(newValue);
    }

    useEffect(() => {
        navigate(routes[0].to)
        setValue(0)
    }, [routes])

    return (<Box>
        <Tabs value={value} onChange={onChangeFn}>
            {routes.map(route => <Tab component={NavLink} to={route.to} label={route.label} value={route.value} key={route.value} />)}
            {/* <Tab compomonent={Button} onClick={() => dispatch(authActions.logout())} label='exit' /> */}
        </Tabs>

        <Outlet></Outlet>
    </Box>)

}

export default Navigator