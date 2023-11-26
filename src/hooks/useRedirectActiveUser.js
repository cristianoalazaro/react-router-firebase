import { useNavigate } from "react-router-dom";
import UserContextProvider from "../context/UserContext"
import { useEffect } from "react";

export const useRedirectActiveUser = (user, path) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(path);
        };
    },[user]);
};