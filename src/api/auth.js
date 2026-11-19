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
