import { RecipeProvider } from '@/context/RecipeContext'
import {useEffect} from 'react'
import { Outlet } from 'react-router'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'


// export default function App() {
//   return (
//     <>
//     <NavBar/>
//     <Outlet />
//     <Footer />
//     </>
//   );
// }

export default function App() {
    useEffect(() => {
    // If the server path is anything other than the root "/"
    if (window.location.pathname !== '/') {
      // Grab what they mistakenly typed
      const mistakenPath = window.location.pathname;
      
      // Force the browser to reset the URL to the root, and move their path AFTER the hash
      window.location.replace('/#' + mistakenPath);
    }
  }, []);
    return (
        <RecipeProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </RecipeProvider>
    )
}