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

            const URL = "http://localhost:5000/auth/signup";

            const response = await axios.post(URL, userDetails);

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

            const URL = "http://localhost:5000/auth/login";

            const response = await axios.post(URL, credentials);

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
    try {
        // Call backend logout API
        const response = await axios.post(
            "http://localhost:5000/auth/logout",
            {},
            {
                withCredentials: true
            }
        );

        console.log(response.data || "Successfully logout!");

    } catch (err) {
        console.log(
            err.response?.data?.message || "Logout error!"
        );

    } finally {
        // Clear frontend authentication data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        setUser(null);
        setUserLogin(false);
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