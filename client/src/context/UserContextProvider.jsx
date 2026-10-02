import { useContext, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export const UserContextProvider = ({ children }) => {

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [userLogin, setUserLogin] = useState(
        () => !!localStorage.getItem("accessToken")
    );


    // SIGNUP
const signup = async (userDetails) => {
        try {
            setIsLoading(true);
            setIsError(false);
            setErrorMsg("");

            const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await axios.post(`${URL}/auth/signup`, userDetails);

            setUser(response.data.user);

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setUserLogin(true);

            return true;

        } catch (err) {
            console.log(err.response?.data || "Signup error!");

            setIsError(true);

            setErrorMsg(
                err.response?.data?.message || "Signup Invalid"
            );

            setUserLogin(false);

            return false;

        } finally {
            setIsLoading(false);
        }
};


    // LOGIN
const login = async (credentials) => {
        try {
            setIsLoading(true);
            setIsError(false);
            setErrorMsg("");

            const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

            const response = await axios.post(`${URL}/auth/login`, credentials);

            setUser(response.data.user);

            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setUserLogin(true);

            return true;

        } catch (err) {
            console.log(err.response?.data || "Login error!");

            setIsError(true);

            setErrorMsg(
                err.response?.data?.message || "Login Invalid"
            );

            setUserLogin(false);

            return false;

        } finally {
            setIsLoading(false);
        }
};


// LOGOUT
const logout = async () => {
    // Step 1: Immediately clear frontend authentication
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
    setUserLogin(false);

    // Step 2: Call backend in the background
    try {
        const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await axios.post(
            `${URL}/auth/logout`,
            {},
            { withCredentials: true }
        );

        console.log(response.data || "Successfully logged out!");

    } catch (err) {
        console.log(
            err.response?.data?.message || "Backend logout error!"
        );
    }
};


    return (
        <UserContext.Provider
            value={{
                signup,
                login,
                logout,
                user,
                setIsError,
                userLogin,
                isError,
                errorMsg,
                isLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};


export const useAuth = () => useContext(UserContext);