import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const DeleteUserForm = ({ onClose, onSubmit }) => {

    return <Dialog open onClose={onClose}>
        <DialogTitle>
            Deletion confirmation
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete your account?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" onClick={onSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>
}

export default DeleteUserForm