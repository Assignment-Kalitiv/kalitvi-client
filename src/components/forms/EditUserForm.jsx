import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const EditUserForm = ({ onClose, onSubmit, selectedUser }) => {

    const defaultUserValue = { firstName: selectedUser.current?.row.firstname, lastName: selectedUser.current?.row.lastname }

    const [userData, setUserData] = useState(defaultUserValue);
    const submitDisable = (userData.firstName == defaultUserValue.firstName) && userData.lastName == defaultUserValue.lastName || userData.firstName == '' || userData.lastName == ''

    const handleReset = () => {
        setUserData(defaultUserValue)
    }

    return <Dialog open onClose={onClose}>
        <DialogTitle>
            Edit Form
        </DialogTitle>
        <DialogContent>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container justifyContent={'center'} spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            defaultValue={userData.firstName}
                            required
                            fullWidth
                            id="fname"
                            label="First name"
                            name="fname"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            defaultValue={userData.lastName}
                            required
                            fullWidth
                            id="lname"
                            label="Last name"
                            name="lname"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button type="submit" disabled={submitDisable}>Submit</Button>
                        <Button onClick={onClose}>Close</Button>
                        <Button type='reset' onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
    </Dialog>
}

export default EditUserForm