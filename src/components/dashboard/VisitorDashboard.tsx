import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slice/LoginSlice";
import axios from 'axios';

const VisitorDashboard = () => {

    const dispatch = useDispatch();
    const email = localStorage.getItem("userEmail")
    const data = useSelector(
        (state: any) => state.auth
    )
    const [list, setList] = useState([]);
    console.log("list", list);

    useEffect(() => {
        if (email !== "") {
            dispatch(loginSuccess(email));
        }
    }, [email])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
            console.log('res', res);
            
            if (res.status === 200) {
                setList(res.data)
            }


        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            width: 150,
            editable: true,
        },
        {
            field: 'visitdate',
            headerName: 'Visit Date',
            type: 'number',
            width: 110,
            editable: true,
        }
    ];

    const rows = [
        { id: 1, name: email, phone: 123456 }
    ];

    return (
        <React.Fragment>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={list}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </React.Fragment>
    )
}

export default VisitorDashboard;