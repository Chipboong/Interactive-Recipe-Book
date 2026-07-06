import { useState } from "react";
import { NavLink } from "react-router";
export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between p-4 px-10 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <NavLink
            to={"/"}
            className="text-4xl font-roboto-serif font-bold text-primary-green lg:w-72"
          >
            PlateMate.
          </NavLink>
        </div>
        <div className="lg:flex hidden  justify-center items-center w-full font-roboto space-x-6 text-gray-700 font-medium">
          <NavLink to={"/"} className="hover:text-green-800 font-bold">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-green-800">
            About
          </NavLink>
          <NavLink to="/recipe" className="hover:text-green-800">
            Recipes
          </NavLink>
        </div>
        <div className="lg:flex hidden items-center lg:space-x-4">
          <div className="relative">
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
          </div>

          <button className="bg-orange-600 text-white px-6 py-2 md:hidden rounded-full font-semibold hover:bg-orange-700">
            Add Recipe
          </button>
        </div>
        <div className="lg:hidden flex">
          <button
            className="w-7 h-auto"
            onClick={() => {
              setNavOpen(navOpen ? false : true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${navOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold text-primary-green">PlateMate.</h2>
      
          <button onClick={() => setNavOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>
      
        <nav className="flex flex-col p-5 space-y-5">
          <NavLink
            to="/"
            className="rounded-md px-3 py-2 font-semibold hover:bg-green-100 hover:text-green-800"
          >
            Home
          </NavLink>
      
          <NavLink
            to="/about"
            className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
          >
            About
          </NavLink>
      
          <NavLink
            to="/recipe"
            className="rounded-md px-3 py-2 hover:bg-green-100 hover:text-green-800"
          >
            Recipes
          </NavLink>
        </nav>
      </div>
    </>
  );
}
