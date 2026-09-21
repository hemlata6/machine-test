import { Box, Button, Dialog, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { deleteVisiter, fetchVisitors } from "../redux/slice/visiterSlice";
import type { AppDispatch } from "../../store";
import AddVisiterModal from "./addVisiterModal";
import EditVisiterModal from "./editVisiterModal";

const VisitorDashboard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector(
        (state: any) => state.visiter.visiters
    )
    const [addVisiterModal, setAddVisiterModal] = useState(false);
     const [editVisiterModal, setEditVisiterModal] = useState(false);
      const [editData, setEditData] = useState({});

    useEffect(() => {
        dispatch(fetchVisitors());
    }, [])

    const handleAddVisiter = () => {
        setAddVisiterModal(true)
    }

    const handleClose = () => {
        setAddVisiterModal(false)
    }

    const handleDelete = (id: number) => {
        dispatch(deleteVisiter(id));
    }

    const handleEditRow = (row: any) => {
        setEditData(row);
        setEditVisiterModal(true);
    }

    const handleCloseEdit = () => {
        setEditVisiterModal(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            width: 150,
            editable: false,
        },
        {
            field: 'unit',
            headerName: 'Unit Number',
            width: 150,
            editable: false,
        },
        {
            field: 'visitDate',
            headerName: 'Visit Date',
            width: 110,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            editable: false,
             width: 200,
            renderCell: (params: any) => {
                return <Box>
                    <Button onClick={() => handleEditRow(params.row)} variant="contained" sx={{ backgroundColor: "blueviolet", color: "#fff" }}>
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(params.row.id)} variant="contained" color="error" sx={{ marginLeft: 1 }}>
                        Delete
                    </Button>
                </Box>;
            }
        }
    ];


    return (
        <React.Fragment>
            <Box sx={{ width: '100%', padding: 2, marginTop: 2, backgroundColor: '#fff', borderRadius: '8px' }}>
                <Grid container spacing={2} sx={{ marginBottom: 2, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                        <h2 style={{ textAlign: 'left' }}>Visitor Dashboard</h2>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleAddVisiter} sx={{ backgroundColor: "blueviolet", color: "#fff", textAlign: 'right' }}>
                            Add Visitor
                        </Button>
                    </Grid>
                </Grid>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <Dialog open={addVisiterModal} onClose={handleClose}>
                <AddVisiterModal handleClose={handleClose} />
            </Dialog>
              <Dialog open={editVisiterModal} onClose={handleCloseEdit}>
                <EditVisiterModal handleClose={handleCloseEdit} editData={editData} />
            </Dialog>
        </React.Fragment>
    )
}

export default VisitorDashboard;