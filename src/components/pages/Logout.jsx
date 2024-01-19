import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch } from "react-redux";
import { authActions } from '../redux/slices/authSlice';

const Logout = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout())
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