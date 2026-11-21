import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "./Button"

const getDeskLink = ({ isActive }) => ({
    fontWeight: isActive ? "700" : "500",
    color: isActive ? "#1B6D33" : "inherit",
    borderBottom: isActive
        ? "2px solid #1B6D33"
        : "2px solid rgba(0, 128, 0, 0)",
    // paddingBottom: '1px',
    transition: "border-color 0.2s ease, color 0.2s ease",
    textDecoration: "none",
});
const drawerLink = ({ isActive }) => `rounded-md px-3 py-3 text-2xl font-bold transition-colors duration-200 ${isActive ? "text-primary-green" : "text-gray-500 hover:text-primary-green"}`
const logoStyle = { fontSize: "clamp(1.4rem, 1rem + 1.5vw, 2.25rem)" }
const iconButton = "flex h-8 w-8 cursor-pointer items-center justify-center"

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!navOpen) return

        const closeOnEscape = (e) => {
            if (e.key === "Escape") setNavOpen(false)
        }
        const desktop = window.matchMedia("(min-width: 1024px)")
        const closeOnDesktop = (e) => {
            if (e.matches) setNavOpen(false)
        }
        const previousOverflow = document.body.style.overflow

        document.addEventListener("keydown", closeOnEscape)
        desktop.addEventListener("change", closeOnDesktop)
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", closeOnEscape)
            desktop.removeEventListener("change", closeOnDesktop)
            document.body.style.overflow = previousOverflow
        }
    }, [navOpen])


    function handleLogout() {
        setNavOpen(false)
        navigate("/")
        logout()
    }

    return (
        <>
            <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white p-4 px-10">
                <div className="flex items-center">
                    <NavLink
                        to={"/"}
                        className="font-roboto-serif font-bold text-primary-green lg:w-72"
                        style={logoStyle}
                    >
                        PlateMate
                    </NavLink>
                </div>

                <div className="lg:flex hidden  justify-center items-center w-full font-roboto space-x-6 text-gray-700 font-medium">
                    <NavLink
                        to={"/"}
                        style={getDeskLink}
                        className="hover:text-green-800"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        style={getDeskLink}
                        className="hover:text-green-800"
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/recipes"
                        style={getDeskLink}
                        className="hover:text-green-800"
                    >
                        Recipes
                    </NavLink>
                </div>

                <div className="hidden shrink-0 items-center justify-end gap-3 lg:flex lg:w-72">
                    {loading ? (
                        <div className="h-10 w-44 animate-pulse rounded-full bg-gray-200" />
                    ): user ? (
                        <>
                            <Button to="/add-recipe" classExtend="whitespace-nowrap">
                                Add Recipe
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                classExtend="whitespace-nowrap"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                to="/login"
                                variant="outline"
                                classExtend="whitespace-nowrap"
                            >
                                Login
                            </Button>
                            <Button to="/register" classExtend="whitespace-nowrap">
                                Sign up
                            </Button>
                        </>
                    )}
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className={iconButton}
                        aria-label="Open menu"
                        aria-expanded={navOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setNavOpen(true)}
                    >
                        <svg
                            viewBox="0 0 100 80"
                            width="25"
                            height="25"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <rect width="100" height="6" rx="6"></rect>
                            <rect y="25" width="100" height="6" rx="6"></rect>
                            <rect y="50" width="100" height="6" rx="6"></rect>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* full-screen drawer (mobile only) */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
                className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white font-roboto transition-all duration-300 ease-in-out lg:hidden ${navOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-4 px-10">
                    <NavLink
                        to="/"
                        onClick={() => setNavOpen(false)}
                        className="font-roboto-serif font-bold text-primary-green"
                        style={logoStyle}
                    >
                        PlateMate
                    </NavLink>
                    <button
                        type="button"
                        className={iconButton}
                        aria-label="Close menu"
                        onClick={() => setNavOpen(false)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="25"
                            height="25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M5 5l14 14M19 5L5 19" />
                        </svg>
                    </button>
                </div>

                {/* tapping any link closes it */}
                <nav
                    className="flex flex-1 flex-col px-7 py-6"
                    onClick={(e) => {if (e.target.closest("a")) setNavOpen(false)}}
                >
                    <div className="flex flex-col gap-1">
                        <NavLink to="/" className={drawerLink}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={drawerLink}>
                            About
                        </NavLink>
                        <NavLink to="/recipes" className={drawerLink}>
                            Recipes
                        </NavLink>
                    </div>

                    <div className="mt-auto flex flex-col gap-3 border-t border-gray-200 pt-6">
                        {loading ? (
                            <div className="h-11 w-full animate-pulse rounded-full bg-gray-200" />
                        ) : user ? (
                            <>
                                <Button to="/add-recipe" fullWidth classExtend="">
                                    Add Recipe
                                </Button>
                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={handleLogout}
                                    classExtend=""
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button to="/register" fullWidth classExtend="">
                                    Sign up
                                </Button>
                                <Button
                                    to="/login"
                                    variant="outline"
                                    fullWidth
                                    classExtend=""
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}