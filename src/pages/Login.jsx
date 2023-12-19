import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as yup from 'yup';
import { Avatar, Box, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="email" 
                            placeholder="Insira seu e-mail" 
                            value={values.email} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                        {errors.email && touched && errors.email}
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Insira sua senha" 
                            value={values.password} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                        />
                        {errors.password && touched && errors.password}
                        <button type="submit" disabled={isSubmitting}>Login</button>
                    </form>
                )}

            </Formik>
        </Box>
    )
};

export default Login;
