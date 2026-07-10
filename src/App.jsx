import { RecipeProvider } from '@/context/RecipeContext'
import {useEffect} from 'react'
import { Outlet } from 'react-router'
import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function App() {
    return (
        <RecipeProvider>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </RecipeProvider>
    )
}
