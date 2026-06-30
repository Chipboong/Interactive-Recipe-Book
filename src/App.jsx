import { useState } from "react";
import NavBar from '@/components/NavBar.jsx';
import { Outlet} from 'react-router'
import Home from '@/routes/Home.jsx'
import Footer from '@/components/Footer.jsx'

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  function change_bg() {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  }
  return (
    <>
    <NavBar/>
    <Outlet />
    <Footer />
    </>
  );
}
