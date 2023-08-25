import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { SignipSchema } from '../../shema/signinShema';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const auth = useAuth();
  const [open, setOpen] = useState(auth.isError);

  const from = location.state?.from?.pathname || '/';

  const initialValues = {
    username: '',
    password: ''
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      auth.signin(values.username, values.password, () => {
        navigate(from);
        navigate(0);
      });
    },
    validationSchema: SignipSchema
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: 300, mx: 'auto' }}>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              required
              id="username"
              label="Username"
              {...formik.getFieldProps('username')}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {auth?.error?.data?.errorsMessages}
        </Alert>
      </Snackbar>
    </>
  );
}
