import { createContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)

    const accessToken = localStorage.getItem('lm_token')

    const fetchUser = async () => {
        const userRes = await fetch(`${baseurl}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const userData = await userRes.json();

        setAuthUser(userData);
    };

    useEffect(() => {
        if (!accessToken) {
            setAuthUser(null);
            return;
        }
        fetchUser();

    }, [accessToken])

    const logout = () =>{
        localStorage.removeItem('lm_token')
        setAuthUser(null)
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout}}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;