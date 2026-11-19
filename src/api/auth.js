import { apiClient } from "./apiClient";
export async function apiLogin(email, password) {
    const res = await apiClient.post("/api/v1/auth/login", {
        email,
        password,
    });
    return res.data;
}
export async function apiRegister(username, email, password) {
    const res = await apiClient.post("/api/v1/auth/register", {
        username,
        email,
        password,
    });
    return res.data;
}
export async function apiMe() {
    const res = await apiClient.get("/api/v1/auth/me", {
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
        },
    });
    return res.data;
}
