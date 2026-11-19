import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, user } = useAuth();

    const [error, setError] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        console.log("HERE");

        try {
            const res = await login(email, password);
            if (res.success) {
                navigate("/")
                return;
            }
        } catch (e) {
            console.log(e);
            setError("Incorrect email or password.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome to{" "}
                        <span className="text-primary-green">PlateMate</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Login to your account to continue.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            autoFocus
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-green focus:ring-2 focus:ring-blue-100"
                        />

                        {emailErr && (
                            <p className="mt-1 text-sm text-red-500">
                                {emailErr}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-green focus:ring-2 focus:ring-blue-100"
                        />

                        {passwordErr && (
                            <p className="mt-1 text-sm text-red-500">
                                {passwordErr}
                            </p>
                        )}
                    </div>

                    {/* General Error */}
                    {error && (
                        <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        fullWidth={true}
                        classExtend="w-full rounded-lg  py-3 font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </Button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <NavLink
                        to="/register"
                        className="font-semibold text-primary-green transition hover:text-shadow-primary-green"
                    >
                        Create Account
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
