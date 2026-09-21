import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUser() {

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    });


    const handleChange = (event: any) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem('userEmail', formValue.email);
        localStorage.setItem('userPassword', formValue.password);
        localStorage.setItem('authToken', "true");
        navigate("/visiter");
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleLoginSubmit}>
                        <TextField
                            onChange={handleChange}
                            value={formValue.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            onChange={handleChange}
                            value={formValue.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button

                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid>
                            <Link href="">Forgot password?</Link>
                        </Grid>
                        <Grid className="footer">
                            <Typography component="h5">
                                Don't have an account? <Link href="">Sign Up</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default LoginUser;