import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider(props) {
    const [token, setToken] = useState("");

    function updateToken(token) {
        setToken(token);
    }

    const providerValue = {
        token: token,
        updateToken,
    };
    return (
    <AuthContext.Provider value={providerValue}>
        {props.children}
    </AuthContext.Provider>);
}


export function useAuthContext() {
    const providerValue = useContext(AuthContext)
    return providerValue;
}