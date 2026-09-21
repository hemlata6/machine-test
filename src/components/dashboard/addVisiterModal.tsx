import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { addVisitor } from "../redux/slice/visiterSlice";

interface AddVisiterProps {
    handleClose: () => void
}

const AddVisiterModal = ({ handleClose }: AddVisiterProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = React.useState({
        name: '',
        phone: '',
        unitnumber: '',
        visitDate: "",
    });

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

        const newVisitor = {
            id: Date.now(),
            name: data.name,
            phone: data.phone,
            unit: data.unitnumber,
            visitDate: data.visitDate,
            status: "Pending",
        };

        dispatch(addVisitor(newVisitor));

        handleClose();
    };

    return (
        <React.Fragment>
            <DialogTitle>Add Visitor</DialogTitle>
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
                    Add Visiter
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

export default AddVisiterModal; 