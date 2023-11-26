import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user } = useUserContext();

    useRedirectActiveUser(user, '/dashboard');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
        } catch(e) {
            console.log(e);
        };
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
        </>
    )
};

export default Login;
