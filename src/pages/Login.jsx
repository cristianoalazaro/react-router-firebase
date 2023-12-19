import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as yup from 'yup';
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
    email: yup
        .string()
        .required("E-mail obrigatório")
        .email("E-mail inválido"),
    password: yup
        .string()
        .trim()
        .required("Senha obrigatória")
        .min(6, "Senha deve ter no mínimo 6 caracteres")
});

const Login = () => {
    const { user } = useUserContext();

    useRedirectActiveUser(user, '/dashboard');

    return (
        <Box sx={{mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>

            <Avatar sx={{mx: "auto", bgcolor: "#444"}}>
                <AddAPhotoIcon />
            </Avatar>

            <Typography variant="h5" component="h1">Login</Typography>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async ({ email, password }, { setSubmitting, setErrors, resetForm }) => {
                    try {
                        const credentialUser = await login({email, password});
                        console.log(credentialUser);
                        resetForm();
                    }catch(e) {
                        if(e.code === 'auth/invalid-login-credentials') {
                            return setErrors({
                                email: "Usuário não registrado!", 
                                password: "Usuário não registrado!" })
                        }
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({ values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting }) => (
                    <Box 
                        onSubmit={handleSubmit}
                        sx={{mt: 1}}
                        component='form'
                    >
                        <TextField 
                            type="text"
                            name="email" 
                            placeholder="email@exemplo.com" 
                            value={values.email} 
                            onChange={handleChange} 
                            onBlur={handleBlur}    
                            id="email"
                            label="Entre com seu e-mail"  
                            fullWidth   
                            sx={{mb: 3}}    
                            error={errors.email && touched}   
                            helperText={errors.email && touched && errors.email}        
                            />
                        {/*errors.email && touched && errors.email*/}
                        <TextField 
                            type="password" 
                            name="password"
                            placeholder="******" 
                            value={values.password} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            id="password"
                            label="Entre com sua senha"  
                            fullWidth                  
                            sx={{mb: 3}}               
                            error={errors.password && touched.password}   
                            helperText={errors.password && touched.password && errors.password}        
                        />
                        {/*errors.password && touched && errors.password*/}

                        <LoadingButton
                            type="submit" 
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                            sx={{mb: 3}}
                        >
                            Acessar
                        </LoadingButton>

                        <Button
                            fullWidth
                            component={Link}
                            to="/register"
                        >
                            Não tem conta? Registre-se
                        </Button>
                    </Box>
                )}

            </Formik>
        </Box>
    )
};

export default Login;
