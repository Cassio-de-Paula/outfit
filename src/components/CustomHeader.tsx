import { Link } from 'react-router-dom'
import logo from '../assets/Logomark.png'
import dark from '../assets/moon.png'
import shoppingCart from '../assets/shopping-cart.png'
import userCircle from '../assets/User.png'
import Dropdown from './Dropdown'
import { useShoppingCart } from '../store/hooks/shoppingCartHooks'
import { useUser } from '@clerk/clerk-react'
import UserIcon from './UserIcon'
import { useState } from 'react'
import { useScreenMode } from '../store/hooks/darkModeHooks'


const CustomHeader = () => {
    const { mode, toggleMode } = useScreenMode()
    const { items } = useShoppingCart()
    const { isSignedIn } = useUser()
    const [darkModeDisplay, setDarkModeDisplay] = useState<boolean>(false)

    return (
        <header className={`${mode} dark:bg-neutral-b-800 dark:**:text-neutral-w-900 flex justify-center items-center w-full pl-3.5 pr-3.5 min-[360px]:pr-14 md:justify-between md:pl-[162px] md:pr-[162px]`}>
            <div className='flex items-center gap-3 max-w-[1116px] w-screen min-h-[84px] pb-6 pt-5 min-[511px]:flex justify-between dark:bg-neutral-b-800'>
                <div className='flex items-center min-w-1/2'>
                    <div className="flex items-center gap-3 mr-7">
                        <p className='font-manrope tracking-[-3.5%] capitalize text-xl font-extrabold flex gap-1.5 justify-center items-center'>
                            <img src={darkModeDisplay ? dark : logo} onClick={toggleMode} onMouseEnter={() => setDarkModeDisplay((prevState) => !prevState)} onMouseLeave={() => setDarkModeDisplay((prevState) => !prevState)} alt="logo-outfit" className='hover:rotate-360 bg-neutral-b-900 border-[1px] border-neutral-w-900 rounded-full max-w-[41px] max-h-[41px] transition-all duration-500 custom-hover' />
                            Outfit
                        </p>
                    </div>
                    <nav className='hidden min-[511px]:flex gap-8 ml-auto'>
                        <div className="group relative inline-block hover:scale-110 transform transition-all duration-100">
                            <Link to={'/'} className="relative hover:cursor-pointer text-neutral-b-500 font-inter">
                                Home
                            </Link>
                        </div>
                        <div className="group relative inline-block hover:scale-110 transform transition-all duration-100">
                            <Link to={'/products'} className="relative hover:cursor-pointer text-neutral-b-500 font-inter">
                                Shop
                            </Link>
                        </div>
                        <div className="group relative inline-block hover:scale-110 transform transition-all duration-100">
                            <Link to={'/about'} className="relative hover:cursor-pointer text-neutral-b-500 font-inter">
                                About
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className={`flex min-[511px]:flex ${isSignedIn ? 'gap-6' : 'gap-8'} ml-auto max-w-1/2 justify-end items-center`}>
                    <Link to={'/cart'} className='hover:scale-110 relative transition-all duration-100'>
                        <img src={shoppingCart} alt="shopping-cart" />
                        {
                            items.length > 0 ? (
                                <div className='bg-red-600 flex justify-center items-center w-4 h-4 rounded-full font-inter font-medium text-[10px] text-neutral-w-900 absolute top-3.5 left-2.5'>{items.length}</div>
                            ) : (<></>)
                        }
                    </Link>
                    <Link
                        to={isSignedIn ? '/my-account' : '/auth/login'}
                        className='hover:scale-110 transition-all duration-100'>
                        {
                            isSignedIn ? (
                                <UserIcon />
                            ) : (
                                <img src={userCircle} alt="account" />
                            )
                        }
                    </Link>
                    <div className='flex items-center relative min-[511px]:hidden'>
                        <Dropdown items={[
                            {
                                title: 'Home',
                                link: '/'
                            },
                            {
                                title: 'Shop',
                                link: '/products'
                            },
                            {
                                title: 'About',
                                link: '/about'
                            }
                        ]} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CustomHeader