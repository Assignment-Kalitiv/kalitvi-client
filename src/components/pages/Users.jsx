import { useEffect, useRef, useState } from "react"
import { connection } from '../../config/config'
import { DataGrid } from '@mui/x-data-grid';
import EditUserForm from "../forms/EditUserForm";


const Users = () => {

    const [users, setUsers] = useState([])
    const [openEdit, setOpenEdit] = useState(false)

    const selectedRef = useRef(null)

    const handleOpenEditDialog = (e, cellValue) => {
        selectedRef.current = cellValue
        setOpenEdit(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false)
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await connection.editUser(selectedRef.current.id, formData.get('fname'), formData.get('lname'))
        console.log(response);
        console.log(await response.text());
        // console.log(formData.get('fname'))
    }

    useEffect(() => {
        console.log('Users render');
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstname', headerName: 'First name', width: 200 },
        { field: 'lastname', headerName: 'Last name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: '', headerName: 'Actions', renderCell: (cellValue) => {
                return <div>
                    <button style={{ width: "100%" }} onClick={(e) => handleOpenEditDialog(e, cellValue)}>Edit</button>
                </div>
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
        {openEdit && <EditUserForm onClose={handleCloseEditDialog} onSubmit={handleSubmitForm} selectedUser={selectedRef} />}
    </>
}

export default Users