import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);
function base64URLdecode(str) {
    const base64Encoded = str.replace(/-/g, "+").replace(/_/g, "/");
    const padding =
        str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
    const base64WithPadding = base64Encoded + padding;
    return atob(base64WithPadding)
        .split("")
        .map((char) => String.fromCharCode(char.charCodeAt(0)))
        .join("");
}
function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}
function getUser(access_token) {
    return base64URLdecode(access_token.split(".")[0]);
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const user = getUser(getCookie("access_token"));
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    });
    function logout() {
        let allCookies = document.cookie.split(";");
        for (let i = 0; i < allCookies.length; i++)
            document.cookie =
                allCookies[i] + "=;expires=" + new Date(0).toUTCString();
        setUser(null);
    }
    async function login(email, password) {
        const res = await apiLogin(email, password);
        console.log(res);
        const user = getUser(getCookie("access_token"));
    }
    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
