import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false); //it's false because unsuscribe takes a little time and no return a promise

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log('user from firebase ',user);
            setUser(user);
        });
        return unsuscribe;
    },[]);

    if (user === false) {
        return <p>Loading app...</p>
    }

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
