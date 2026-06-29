import {createBrowserRouter } from 'react-router'
import App from './App'
import Home from '@/routes/Home.jsx'
import About from '@/routes/About.jsx'

const router = createBrowserRouter([
{
    path: '/',
    Component: App,
    children: [ 
        {
            index: true,
            Component: Home
        },
        {
            path: '/about',
            Component: About
        }
    ]
}])
export default router;