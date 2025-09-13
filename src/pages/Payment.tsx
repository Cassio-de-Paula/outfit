import BreadCrumbs from "../components/Breadcrumbs"
import box from '../assets/Illustration.png'
import BlackButton from "../components/BlackButton"
import { useScreenMode } from "../store/hooks/darkModeHooks"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { useResetCart } from "../store/hooks/shoppingCartHooks"

const Payment = () => {
    const location = useLocation()
    const redirect = useNavigate()
    const { state } = location
    const { mode } = useScreenMode()
    const setBreadcrumbs = useSetBreadcrumbs()
    const reset = useResetCart()

    useEffect(() => {
        if (state) {
            reset()
            setBreadcrumbs({ label: 'Successfull Order', path: state });
        } else {
            redirect('/')
        }
    }, [])

    return (
        <main className={`${mode} min-w-screen dark:bg-neutral-b-800`}>
            <section className="w-full bg-green-100 min-h-[11.11vw] px-[11%] py-[5%] dark:bg-green-600 dark:**:text-neutral-w-900">
                <h2 className="font-inter font-bold text-2xl text-neutral-b-900 mb-[8px]">Successfull Order</h2>
                <BreadCrumbs padding="p-0" />
            </section>
            <section className="flex justify-center items-center w-full h-full my-[160px] dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                <div className="flex flex-col items-center">
                    <img src={box} alt="" />
                    <h2 className="font-inter font-bold text-neutral-b-900 text-2xl mt-5">Thank you for shopping</h2>
                    <p className="font-inter font-normal text-neutral-b-500 text-sm mt-5 max-w-[379px] text-center">Your order has been successfully placed and is now being processed.</p>
                    <BlackButton text="Go to my account" breadCrumbLabel="My Account" />
                </div>
            </section>
        </main>
    )
}

export default Payment
