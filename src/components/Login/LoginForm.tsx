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
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/slice/LoginSlice';
import { useNavigate } from 'react-router-dom';

function LoginUser() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const data = useSelector(
        (state: any) => state?.auth
    )
    console.log(data);

    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);

        dispatch(loginSuccess({ email }));
        navigate("/visiter")

    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form">
                        <TextField
                            onChange={handleEmail}
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
                            onChange={handlePassword}
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
                            onClick={handleLoginSubmit}
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