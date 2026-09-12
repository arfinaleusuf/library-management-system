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
            return;
        }
        fetchUser();

    }, [accessToken])

    console.log(authUser);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;