import logo from '../assets/Logomark-white.png'
import github from '../assets/github.png'
import instagram from '../assets/instagram.png'
import youtube from '../assets/youtube.png'
import visa from '../assets/visa.png'
import master from '../assets/master-card.png'
import amex from '../assets/amex.png'
import { useState } from 'react'
import NewsletterService from '../services/newsletterServices'
import { toast } from 'react-toastify'
import { useScreenMode } from '../store/hooks/darkModeHooks'

const CustomFooter = () => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { mode } = useScreenMode()

    const validateInput = () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexEmail.test(email)) return 'Insert a valid email'

        return ''
    };

    const handleSubmit = async () => {
        const errorEmail = validateInput();
        setError(errorEmail);

        setTimeout(() => {
            setError('')
        }, 2000);

        if (errorEmail) return;

        try {
            const res = await NewsletterService.addEmail(email)

            if (typeof res === 'string') throw new Error(res)

            toast.success('Welcome new Outfit member!', { autoClose: 3000, position: 'bottom-center' })
        } catch (error) {
            if (error instanceof Error) toast.error(error.message, { autoClose: 3000, position: 'bottom-center' })
        }
    }

    return (
        <footer className={`${mode} min-h-[629px] w-screen dark:bg-neutral-b-800 dark:**:text-neutral-w-900`}>
            <section className="bg-neutral-w-100 flex flex-col items-center gap-8 dark:bg-neutral-b-700 dark:**:text-neutral-w-900 justify-between min-h-[200px] py-[59px] md:px-[162px] min-[1200px]:flex-row">
                <div className='flex flex-col px-5 flex-wrap'>
                    <h3 className="font-inter text-lg md:text-2xl text-center font-bold text-neutral-b-900 min-[1200px]:text-start">
                        Join Our Newsletter
                    </h3>
                    <p className="font-inter text-[10px] text-wrap text-center md:text-sm font-normal text-neutral-b-500 mt-[24px] min-[1200px]:text-start">
                        We love to surprise our subscribers with occasional gifts.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 min-[1200px]:flex-row">
                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="bg-transparent py-1 px-2 flex md:w-full placeholder:text-[10px] md:placeholder::text-sm md:py-2.5 md:px-[15px] border-[1px] border-neutral-b-100 rounded-md min-[360px]:min-w-[320px] focus:outline-none" />
                    {
                        error !== '' ? (
                            <p className="font-inter font-medium text-[10px] text-red-500-sem">{error}</p>
                        ) : (
                            <></>
                        )
                    }
                    <button onClick={handleSubmit} className="bg-neutral-b-900 py-3 px-6 text-neutral-w-900 flex text-[10px] md:text-sm rounded-sm h-fit transdiv transition-all duration-200 hover:scale-110 hover:cursor-pointer">Subscribe</button>
                </div>
            </section>
            <section className='flex flex-wrap px-8 justify-center gap-[49px] pt-[70px] w-screen min-[812px]:pl-[174px] min-[812px]:pr-[169px] min-[1260px]:justify-between items-center min-h-[350px]'>
                <div className="flex flex-col min-w-screen items-center min-[812px]:max-w-[272px] min-[812px]:min-w-fit">
                    <div className='flex flex-col items-center min-[1114px]:items-start'>
                        <span className='flex justify-center items-center gap-4 min-[1114px]:justify-start'>
                            <div className='border-neutral-w-100 border-[1px] rounded-md dark:bg-neutral-w-900'>
                                <img src={logo} alt="" />
                            </div>
                            <h2 className="font-manrope font-extrabold text-neutral-b-900 text-2xl">
                                Outfit
                            </h2>
                        </span>
                        <p className='font-inter text-[10px] text-center min-[1114px]:text-start font-normal min-[465px]:text-sm text-neutral-b-500 max-w-[272px] mt-3'>
                            DevCut is a YouTube channel for practical project-based learning.
                        </p>
                        <span className='flex items-center justify-between min-w-[120px] mt-8'>
                            <a href="https://www.github.com" target='blank' className='hover:scale-110 transition-all transform duration-150 cursor-pointer'>
                                <img src={github} alt="" />
                            </a>
                            <a href="https://www.instagram.com" target='blank' className='hover:scale-110 transition-all transform duration-150 cursor-pointer'>
                                <img src={instagram} alt="" />
                            </a>
                            <a href="https://www.youtube.com" target='blank' className='hover:scale-110 transition-all transform duration-150 cursor-pointer'>
                                <img src={youtube} alt="" />
                            </a>
                        </span>
                    </div>
                </div>
                <div className='flex min-w-screen justify-center w-[391px] px-8 min-[812px]:min-w-fit **:text-[10px] min-[465px]:**:text-sm'>
                    <div className='flex justify-center flex-wrap gap-[72px]'>
                        <div>
                            <h4 className='uppercase font-inter font-normal text-neutral-b-300'>
                                Support
                            </h4>
                            <ul className='flex flex-col gap-4 pt-10'>
                                <li className='font-inter text-[10px] text-neutral-b-500'>FAQ</li>
                                <li className='font-inter text-neutral-b-500'>Terms of use</li>
                                <li className='font-inter text-neutral-b-500'>Privacy Policy</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className='uppercase font-inter text-sm font-normal text-neutral-b-300'>
                                Company
                            </h4>
                            <ul className='flex flex-col gap-4'>
                                <li className='mt-10 font-inter text-sm text-neutral-b-500'>About us</li>
                                <li className='font-inter text-sm text-neutral-b-500'>Contact</li>
                                <li className='font-inter text-sm text-neutral-b-500'>Carrers</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className='uppercase font-inter text-sm font-normal text-neutral-b-300'>
                                Shop
                            </h4>
                            <ul className='flex flex-col gap-4'>
                                <li className='mt-10 font-inter text-sm text-neutral-b-500'>My Account</li>
                                <li className='font-inter text-sm text-neutral-b-500'>Checkout</li>
                                <li className='font-inter text-sm text-neutral-b-500'>Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col min-w-full **:text-[10px] min-[465px]:**:text-sm items-center min-[1320px]:min-w-fit'>
                    <h4 className='uppercase font-inter text-sm font-normal text-neutral-b-300'>
                        Accepted Payments
                    </h4>
                    <ul className='flex gap-4 items-center min-h-[72px] min-[1314px]:pt-10'>
                        <li className='font-inter text-sm text-neutral-b-500'>
                            <img src={master} alt="" className='grayscale' />
                        </li>
                        <li className='font-inter text-sm text-neutral-b-500'>
                            <img src={amex} alt="" className='grayscale' />
                        </li>
                        <li className='font-inter text-sm text-neutral-b-500'>
                            <img src={visa} alt="" className='grayscale' />
                        </li>
                    </ul>
                </div>
            </section>
            <section className='flex mx-auto justify-center items-center min-h-[79px] max-w-[1116px] border-t-2 border-neutral-w-100 **:text-[10px] min-[465px]:**:text-sm'>
                <p className='text-center font-inter font-normal text-sm text-neutral-b-500'>
                    © {new Date().getFullYear()} DevCut. All rights reserved.
                </p>
            </section>
        </footer>
    )
}

export default CustomFooter