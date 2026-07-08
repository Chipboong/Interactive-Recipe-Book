import { RecipeProvider } from '@/context/RecipeContext'
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
    return (
        <RecipeProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </RecipeProvider>
    )
}