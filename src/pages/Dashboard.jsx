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
        <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Dashboard;
