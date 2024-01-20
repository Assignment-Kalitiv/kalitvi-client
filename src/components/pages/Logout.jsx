import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useDispatch } from "react-redux";
import { authActions } from '../redux/slices/authSlice';
import { connection } from '../../config/config';
import { alertActions } from '../redux/slices/alertSlice';

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await connection.logout();
        if (response.ok) {
            console.log(await response.text());
            dispatch(authActions.logout())
            dispatch(alertActions.set({ message: "Goodbye", severity: "info" }))
        } else {
            const message = await response.text()
            dispatch(alertActions.set({ message, severity: "error" }))
        }
    }

    return <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container justifyContent={'center'} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
                <Button onClick={handleLogout} variant='contained'>Confirm Logout</Button>
            </Grid>
        </Grid>
    </Box>
}

export default Logout