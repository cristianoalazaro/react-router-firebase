import { Button } from "@mui/material";
import { logout } from "../config/firebase";
import { useUserContext } from "../context/UserContext";

const handleLogout = async() => {
    await logout();
} 

const Dashboard = () => {
    const { user } = useUserContext();

    return (
        <>
        <h1>Dashboard</h1>
        <h2>Bem-vindo: {user.email}</h2>
        <Button onClick={handleLogout} variant="contained">Logout</Button>
        </>
    );
};

export default Dashboard;
