import logo from '../assets/logoHD.png'
import wallpaper from '../assets/wallpaper404.png'
import home from '../assets/homeIcon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    const [homeIconDisplay, setHomeIconDisplay] = useState<boolean>(false)

    return (
        <main className={`flex w-full h-screen justify-center items-center bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${wallpaper})` }}>
            <div />
            <div>
                <h2 className="flex justify-center font-inter text-neutral-w-900 font-black text-7xl md:text-9xl">
                    4
                    <Link to={'/'}>
                        <div style={{ backgroundImage: `url(${homeIconDisplay ? home : logo})` }} onMouseEnter={() => setHomeIconDisplay((prevState) => !prevState)} onMouseLeave={() => setHomeIconDisplay((prevState) => !prevState)}
                            className={`${homeIconDisplay ? '' : 'bg-cover'} bg-neutral-b-900 bg-center bg-no-repeat w-[72px] h-[72px] md:h-[128px] md:w-[128px] custom-hover hover:rotate-360 hover:transition-all duration-200 rounded-full border-2 border-neutral-w-900`} />
                    </Link>
                    4
                </h2>
                <h4 className='font-inter text-neutral-w-900 font-medium text-[10px] md:text-sm text-center mt-6'>This page was not found, to go back to Outfit.com,<br /> click the icon above</h4>
            </div>
            <div />
        </main>
    )
}

export default Error404