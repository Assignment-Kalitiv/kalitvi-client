import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from '../redux/slices/authSlice';
import { connection } from '../../config/config';

const Register = () => {

    const [userData, setUserData] = useState({ email: '', password: '', firstname: '', lastname: '' })
    const dispatch = useDispatch();

    const submitDisable = Object.values(userData).some(value => value == '')

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await connection.register(userData);
        if (response.ok) {
            dispatch(authActions.login())
        } else {
            console.log(await response.text());
        }
    }

    return <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent={'center'} spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                        defaultValue={userData.firstname}
                        required
                        fullWidth
                        id="fname"
                        label="First name"
                        name="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                        defaultValue={userData.lastname}
                        required
                        fullWidth
                        id="lname"
                        label="Last name"
                        name="lname"
                    />
                </Grid>
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
                        autoComplete='off'
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
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Button type="submit" disabled={submitDisable} variant='contained' fullWidth>Submit</Button>
                </Grid>
                <Grid sx={{ mt: 1 }}>
                    {/* TODO */}
                    <small>Already have an account? <Link to="/login">Login Here</Link></small>
                </Grid>
            </Grid>
        </Box>
    </Container>
}

export default Register