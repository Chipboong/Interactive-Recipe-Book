import { NavLink } from 'react-router'
export default function Navbar()  {
  return (
    <nav className="flex items-center justify-between p-4 px-10 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {/* Logo from image */}
        <h1 className="text-4xl font-roboto-serif font-bold text-primary-green">
          PlateMate.
        </h1>
      </div>
      <div className="flex items-center font-roboto space-x-6 text-gray-700 font-medium">
        {/* Menu Items, active 'Home' like in the image */}
        <NavLink to={"/"} className="hover:text-green-800 font-bold">Home</NavLink>
        <NavLink to='/about' className="hover:text-green-800">About</NavLink>
        <a href="#" className="hover:text-green-800">Recipes</a>
      </div>
      <div className="flex items-center space-x-4">
        {/* Search Bar with icon */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search recipes..."
            className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Add Recipe Button with orange background */}
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700">
          Add Recipe
        </button>
      </div>
    </nav>
  );
};