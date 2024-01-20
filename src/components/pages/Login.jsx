import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { authActions } from '../redux/slices/authSlice';
import { connection } from '../../config/config';
import { navigationActions } from '../redux/slices/navigationSlice';
import { pages } from '../../util/pages';
import { alertActions } from '../redux/slices/alertSlice';

const Login = () => {

    const [userData, setUserData] = useState({ email: '', password: '' })
    const submitDisable = Object.values(userData).some(value => value == '')
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await connection.login(userData);
        if (response.ok) {
            const userData = await response.json()
            dispatch(authActions.login(userData))
            dispatch(alertActions.set({ message: "Welcome back", severity: "success" }))
        } else {
            const message = await response.text()
            dispatch(alertActions.set({ message, severity: "error" }))
        }
    }

    return <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent={'center'} spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        defaultValue={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type='email'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        defaultValue={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type='password'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button type="submit" disabled={submitDisable} variant='contained' fullWidth>Submit</Button>
                </Grid>
                <Grid sx={{ mt: 1 }}>
                    <small>Have no an account? <a href="#" onClick={() => dispatch(navigationActions.set(pages.noauth[1].value))}>Register Here</a></small>
                </Grid>
            </Grid>
        </Box>
    </Container>
}

export default Login