import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelectorNavigation } from '../redux/store';
import { navigationActions } from '../redux/slices/navigationSlice';

const Navigator = ({ routes }) => {

    const navigate = useNavigate();
    const tabIndex = +useSelectorNavigation();
    const dispatch = useDispatch();

    const changePage = (index) => {
        navigate(routes[index].to)
    }

    function onChangeFn(event, newValue) {
        dispatch(navigationActions.set(newValue))
    }

    useEffect(() => {
        changePage(tabIndex);
    }, [routes, tabIndex])

    return (<Box>
        <Tabs value={tabIndex} onChange={onChangeFn}>
            {routes.map(route => <Tab component={NavLink} to={route.to} label={route.label} value={route.value} key={route.value} />)}
        </Tabs>

        <Outlet></Outlet>
    </Box>)

}

export default Navigator