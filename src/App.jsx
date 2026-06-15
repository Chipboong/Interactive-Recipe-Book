import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  function change_bg() {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  }
  return (
    <div className={`${darkMode ? "bg-[#101010]" : "bg-white"} min-h-screen`}>
      <h1 className={`text-center font-semibold text-2xl text-blue-700 transition duration-100 ${darkMode ? "text-white" : "text-blue-700"}`}>
        Hello, World with TailWind
      </h1>
      <div className="text-center">
        <button
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition focus:ring-1 focus:ring-blue-700 outline-none ease-in-out duration-200 "
          onClick={change_bg}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
