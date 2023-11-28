import { useState } from "react";
import { register } from "../config/firebase";
import { Formik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .required("E-mail é obrigatório")
        .email("E-mail inválido"),
    password: yup
        .string()
        .trim()
        .required("Senha é obrigatória")
        .min(6, ""),
});

const Register = () => {
    return (
        <>
            <h1>Register</h1>
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
                        <button type="submit" disabled={isSubmitting}>Register</button>
                    </form>
                )}
            </Formik>
        </>
    )
};

export default Register;
