import { useState } from "react";
import { register } from "../config/firebase";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const credentialUser = await register({ email, password });
            console.log(credentialUser);
        } catch(e) {
            console.log(e);
        };
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
        </>
    )
};

export default Register;
