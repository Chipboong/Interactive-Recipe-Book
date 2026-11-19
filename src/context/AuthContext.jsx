import { createContext, useState, useContext } from "react";
import { apiLogin, apiMe } from "../api/auth";
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
    return (
        <AuthContext.Provider value={{ user, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
