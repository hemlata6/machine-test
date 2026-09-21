import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { editVisiter } from "../redux/slice/visiterSlice";

interface EditVisiterProps {
    handleClose: () => void
    editData: any
}

const EditVisiterModal = ({ handleClose, editData }: EditVisiterProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState({
        name: '',
        phone: '',
        unitnumber: '',
        visitDate: "",
    });

    useEffect(() => {
        if (editData) {
            setData({
                name: editData.name || '',
                phone: editData.phone || '',
                unitnumber: editData.unit || '',
                visitDate: editData.visitDate || "",
            });
        }
    }, [editData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const updateVisiter = {
            id: editData.id,
            name: data.name,
            phone: data.phone,
            unit: data.unitnumber,
            visitDate: data.visitDate,
           status: editData.status,
        };

        dispatch(editVisiter(updateVisiter));

        handleClose();
    };

    return (
        <React.Fragment>
            <DialogTitle>Edit Visitor</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: 2 }}>
                    Please enter the visitor's details here.
                </DialogContentText>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                        value={data.name}
                        onChange={handleChange}
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={data.phone}
                        onChange={handleChange}
                        autoFocus
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={data.unitnumber}
                        onChange={handleChange}
                        autoFocus
                        required
                        margin="dense"
                        id="unitnumber"
                        name="unitnumber"
                        label="Unit Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={
                                data.visitDate
                                    ? dayjs(data.visitDate)
                                    : null
                            }
                            onChange={(newValue) => {
                                setData((prev) => ({
                                    ...prev,
                                    visitDate: newValue
                                        ? newValue.format("YYYY-MM-DD")
                                        : "",
                                }));
                            }}

                            label="Basic date picker" sx={{ width: '100%', mt: 1 }} />
                    </LocalizationProvider>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: "blueviolet" }}>
                    Cancel
                </Button>
                <Button type="submit" form="subscription-form" sx={{ backgroundColor: "blueviolet", color: "#fff" }}>
                    Edit Visiter
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

export default EditVisiterModal; 