import { createContext, useState, useContext } from "react";
import { apiLogin, apiLogout, apiMe } from "../api/auth";
import { useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiMe();
        
                setUser(res.user); // Changed from res.data.user
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    async function login(email, password) {
        const res = await apiLogin(email, password);
        const user = await apiMe();
        if (!user.success) {
            return {
                success: false,
            };
        }
        setUser(user.user);
        return res;
    } 
    async function logout() {
        try {
            await apiLogout();
        } catch {
            // alr logged out, or the server is unreachable. clear the UI anyway.
        } finally {
            setUser(null);
        }
    }
    return (
        <AuthContext.Provider value={{ user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
