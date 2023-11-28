import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";

const Login = () => {
    const { user } = useUserContext();

    useRedirectActiveUser(user, '/dashboard');

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async ({ email, password }) => {
                    try {
                        const credentialUser = await login({email, password});
                        console.log(credentialUser);
                    }catch(e) {
                        console.log(e);
                    }
                }}
            >
                {({ values, handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            name="email" 
                            placeholder="Insira seu e-mail" 
                            value={values.email} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Insira sua senha" 
                            value={values.password} 
                            onChange={handleChange} 
                        />
                        <button type="submit">Login</button>
                    </form>
                )}

            </Formik>
        </>
    )
};

export default Login;
