import { RecipeProvider } from "@/context/RecipeContext";
import { Outlet } from "react-router";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <RecipeProvider>
                <ScrollToTop />
                <Navbar />
                <Outlet />
                <Footer />
            </RecipeProvider>
        </AuthProvider>
    );
}
