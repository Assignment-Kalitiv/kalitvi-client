import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid';
import { connection } from '../../config/config'
import { useSelectorAuth } from "../redux/store";
import { authActions } from '../redux/slices/authSlice';
import EditUserForm from "../forms/EditUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import { alertActions } from "../redux/slices/alertSlice";

const Users = () => {

    const [users, setUsers] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const userData = useSelectorAuth();
    const selectedRef = useRef(null)
    const dispatch = useDispatch();

    const handleOpenEditDialog = (e, cellValue) => {
        selectedRef.current = cellValue
        setOpenEdit(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false)
    }

    const handleOpenDeleteDialog = (e, cellValue) => {
        selectedRef.current = cellValue
        setOpenDelete(true)
    }

    const handleCloseDeleteDialog = () => {
        setOpenDelete(false)
    }

    const handleSubmitEditForm = async (event) => {
        event.preventDefault();
        const selectedId = selectedRef.current.id;
        const formData = new FormData(event.currentTarget);
        const response = await connection.editUser(selectedId, formData.get('fname'), formData.get('lname'))
        if (response.ok) {
            const data = await response.json();
            setUsers(prevUsers => {
                const newUsers = prevUsers.map(user => user.id != selectedId ? user : data);
                return newUsers;
            })
            selectedRef.current = null;
            handleCloseEditDialog()
            dispatch(alertActions.set({ message: "User was edited", severity: "success" }))
        } else {
            const message = await response.text()
            dispatch(alertActions.set({ message, severity: "error" }))
        }
    }

    const handleSubmitDeleteForm = async (event) => {
        event.preventDefault();
        const selectedId = selectedRef.current.id;
        const response = await connection.deleteUser(selectedRef.current.id)
        if (response.ok) {
            setUsers(prevUsers => {
                const newUsers = prevUsers.filter(user => user.id != selectedId);
                return newUsers;
            })
            selectedRef.current = null;
            dispatch(authActions.logout())
        } else {
            const message = await response.text()
            dispatch(alertActions.set({ message, severity: "error" }))
        }
    }

    const columns = [
        { field: 'firstname', headerName: 'First name', flex: 1 },
        { field: 'lastname', headerName: 'Last name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: '', headerName: 'Actions', renderCell: (cellValue) => {
                return userData.id == cellValue.id ? <Box>
                    <IconButton color="error" aria-label="delete" onClick={(e) => handleOpenDeleteDialog(e, cellValue)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={(e) => handleOpenEditDialog(e, cellValue)}>
                        <EditIcon />
                    </IconButton>
                </Box> : null
            }
        }
    ];

    const getUsers = async () => {
        const response = await connection.getUsers();
        const newUsers = await response.json();
        setUsers(newUsers)
    }

    useEffect(() => {
        getUsers();
    }, [])

    return <>
        <DataGrid rows={users} columns={columns} />
        {openEdit && <EditUserForm onClose={handleCloseEditDialog} onSubmit={handleSubmitEditForm} selectedUser={selectedRef} />}
        {openDelete && <DeleteUserForm onClose={handleCloseDeleteDialog} onSubmit={handleSubmitDeleteForm} />}
    </>
}

export default Users