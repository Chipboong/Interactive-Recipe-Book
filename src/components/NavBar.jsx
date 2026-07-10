import { useState } from "react";
import { NavLink } from "react-router";

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

const getDrawerLink = ({ isActive }) => ({
    backgroundColor: isActive ? "#1B6D33": "transparent",
    color: isActive ?"#f0fdf4"  : "inherit",
    fontWeight: isActive ? "600" : "400",
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
});

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between p-4 px-10 bg-white border-b border-gray-200">
                <div className="flex items-center">
                    <NavLink
                        to={"/"}
                        className="font-roboto-serif font-bold text-primary-green lg:w-72"
                        style={{
                            fontSize: "clamp(1.4rem, 1rem + 1.5vw, 2.25rem)",
                        }}
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

                <div className="lg:flex hidden items-center lg:space-x-4">
                    {/* <div className="relative hidden">
            <input
              type="search"
              placeholder="Search recipes..."
              className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>*/}

                    <div className="w-full">
                        <NavLink to="/add-recipe" className="hover:cursor-pointer">
                        <button className="bg-primary-green text-white px-6 py-2 w-full whitespace-nowrap rounded-full font-semibold ">
                            Add Recipe
                        </button>
                    </NavLink>
                    </div>
                </div>

                <div className="lg:hidden flex">
                    <button
                        className="w-7 h-auto"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setNavOpen(navOpen ? false : true);
                        }}
                    >
                        <svg
                            viewBox="0 0 100 80"
                            width="25"
                            height="25"
                            fill="currentColor"
                        >
                            <rect width="100" height="6" rx="6"></rect>
                            <rect y="25" width="100" height="6" rx="6"></rect>
                            <rect y="50" width="100" height="6" rx="6"></rect>
                        </svg>
                    </button>
                </div>
            </nav>




            <div
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="font-roboto-serif text-2xl text-primary-green">
                        PlateMate
                    </h2>
                    <button
                        onClick={() => setNavOpen(false)}
                        className="text-2xl"
                        style={{ cursor: "pointer" }}
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex flex-col p-5 space-y-2">
                    <NavLink
                        to="/"
                        onClick={() => setNavOpen(false)}
                        style={getDrawerLink}
                        className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setNavOpen(false)}
                        style={getDrawerLink}
                        className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/recipes"
                        onClick={() => setNavOpen(false)}
                        style={getDrawerLink}
                        className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
                    >
                        Recipes
                    </NavLink>
                    <NavLink
                        to="/add-recipe"
                        onClick={() => setNavOpen(false)}
                        style={getDrawerLink}
                        className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
                    >
                        Add Recipe
                    </NavLink>
                </nav>
            </div>
        </>
    );
}
