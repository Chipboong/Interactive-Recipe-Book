import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { apiRegister } from "../api/auth";
import Button from "../components/Button";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [error, setError] = useState();
    const [usernameErr, setUsernameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const res = await apiRegister(username, email, password);

            if (res.success == true) {
                navigate("/login");
                return;
            }

            throw new Error(res || "Registration failed");
        } catch (err) {
            const error = err.response?.data?.error;
            const message = err.response?.data?.message;

            console.log(err);
            switch (error) {
                case "MISSING_FIELDS":
                    setError(message);
                    setEmailErr(null);
                    setPasswordErr(null);
                    setUsernameErr(null)
                    break;

                case "INVALID_FIELDS":
                    if (message.includes("Email")) {
                        setEmailErr(message);
                        setPasswordErr(null);
                        setUsernameErr(null)
                        setError(null)
                    } else if (message.includes("Username")) {
                        setUsernameErr(message);
                        setEmailErr(null);
                        setPasswordErr(null);
                        setError(null)
                    }
                    break;

                case "WEAK_PASSWORD":
                    setPasswordErr(message);
                    setEmailErr(null);
                    setUsernameErr(null);
                    setError(null)
                    break;

                case "DUPLICATE_ENTRY":
                    setError("User already exists!");
                    setEmailErr(null);
                    setPasswordErr(null);
                    setUsernameErr(null)
                    break;

                default:
                    setError("Something went wrong!");
                    setEmailErr(null);
                    setPasswordErr(null);
                    setUsernameErr(null)
                    break;
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-5">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create an Account
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Register to get started.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            autoFocus
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-blue-100"
                        />

                        {usernameErr && (
                            <p className="mt-1 text-sm text-red-500">
                                {usernameErr}
                            </p>
                        )}
                    </div>

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
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-blue-100"
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
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none transition focus:border-primary-green focus:ring-2 focus:ring-blue-100"
                        />

                        {passwordErr && (
                            <p className="mt-1 text-sm text-red-500">
                                {passwordErr}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                            {error.message || String(error)}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={submitting}
                        fullWidth={true}
                        classExtend="w-full rounded-lg  py-4 font-semibold text-white transition  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Registering..." : "Create Account"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <NavLink className={"font-semibold text-primary-green transition hover:text-shadow-primary-green"} to={"/login"}>Login</NavLink>
                </p>
            </div>
        </div>
    );
}
