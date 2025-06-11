import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const API_URL = `${import.meta.env.VITE_API_URL}`;

    // Decode JWT token and check expiration
    const decodeToken = (token) => {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        return payload;
    };

    // On mount, check localStorage and set token if it exists
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            const decoded = decodeToken(storedToken);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('authToken');
                setToken(null);
                setIsAuthenticated(false);
            } else {
                setToken(storedToken);
            }
        }
    }, []);

    // Whenever the token state changes, verify it
    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        } else {
            verifyToken(token);
        }
    }, [token]);

    async function verifyToken(token){
        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('authToken');
                setToken(null);
            }
        } catch (err) {
            setIsAuthenticated(false);
            localStorage.removeItem('authToken');
            setToken(null);
        }
    };


    //helper function to avoid having to expose "setToken" in the handleLogout function (was giving occasional timing issue) 
    function logout() {
        localStorage.removeItem('authToken');
        setToken(null); 
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            token,
            setIsAuthenticated, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );// token value exposed by auth provider usually doesnt end up working as expected :/
}
