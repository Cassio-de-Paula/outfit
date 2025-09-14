import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Details from './pages/Details'
import ShoppingCart from './pages/ShoppingCart'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Base from './pages/Base'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import Auth from './pages/Auth'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Error404 from './pages/Error404'

const routes = createBrowserRouter([
    {
        path: '/outfit',
        element: <Base />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/auth',
                element: <Auth />,
                children: [
                    {
                        path: '/auth/register',
                        element: <SignUp />
                    },
                    {
                        path: '/auth/login',
                        element: <SignIn />
                    },
                    {
                        path: '/auth/forgot-password',
                        element: <ForgotPassword />
                    },
                    {
                        path: '/auth/reset-password',
                        element: <ResetPassword />
                    }
                ]
            },
            {
                path: '/my-account',
                element: <Profile />
            },
            {
                path: '/products',
                element: <Listing />,
            },
            {
                path: '/products/:productId',
                element: <Details />
            },
            {
                path: '/cart',
                element: <ShoppingCart />,
                children: [
                    {
                        path: '/cart',
                        element: <Cart />
                    },
                    {
                        path: '/cart/checkout',
                        element: <Checkout />
                    },
                ]
            },
            {
                path: '/cart/checkout/:orderId',
                element: <Payment />
            }
        ]
    },
    {
        path: '/outfit/about',
        element: <About />
    },
    {
        path: '/outfit/sso-callback',
        element: <AuthenticateWithRedirectCallback />
    },
    {
        path: '*',
        element: <Error404 />
    }
])

export default routes