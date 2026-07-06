import NavBar from '@/components/NavBar.jsx';
import { Outlet} from 'react-router'
import Footer from '@/components/Footer.jsx'

export default function App() {
  return (
    <>
    <NavBar/>
    <Outlet />
    <Footer />
    </>
  );
}
