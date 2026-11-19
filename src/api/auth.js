import { apiClient } from "./apiClient";
export async function apiLogin(email, password) {
    const res = await apiClient.post("/api/v1/login", {
        email,
        password,
    });
    return res.data;
}
export async function apiRegister(username, email, password) {
    const res = await apiClient.post("/api/v1/register", {
        username,
        email,
        password,
    });
    return res.data;
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
