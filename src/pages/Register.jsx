import { Link } from "react-router-dom";
import { register } from "../config/firebase";
import { Formik } from "formik";
import * as yup from 'yup';
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";



const validationSchema = yup.object({
    email: yup
        .string()
        .required("E-mail é obrigatório")
        .email("E-mail inválido"),
    password: yup
        .string()
        .trim()
        .required("Senha é obrigatória")
        .min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const Register = () => {
    return (
        <Box sx={{mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>

            <Avatar sx={{mx: "auto", bgcolor: "#444"}}>
                <AddAPhotoIcon />
            </Avatar>

            <Typography variant="h5" component="h1">Register</Typography>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async ({ email, password }, { setSubmitting, setErrors, resetForm }) => {
                    try {
                        const credentialUser = await register({ email, password });
                        console.log(credentialUser);
                        resetForm();
                    } catch (e) {
                        if (e.code === 'auth/email-already-in-use') {
                            setErrors({
                                email: 'Usuário já cadastrado',
                            })
                        } else {
                            setErrors({
                                email: 'Erro desconhecido'
                            })
                        }
                    } finally {
                        setSubmitting(false)
                    }
                }}
            >
                {({ values, handleSubmit, handleChange, errors, touched, isSubmitting, handleBlur }) => (
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
                            error={errors.email && touched.email}   
                            helperText={errors.email && touched.email && errors.email}        
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
                            Inscrever
                        </LoadingButton>
                        <Button
                            fullWidth
                            component={Link}
                            to="/"
                        >
                            Já possui uma conta? Faça login
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
};

export default Register;
