import BreadCrumbs from "../components/Breadcrumbs"
import cart from '../assets/shopping-cart.png'
import user from '../assets/user-icon.png'
import logoutIcon from '../assets/Logout.png'
import { useEffect, useState } from "react"
import Orders from "../components/Orders"
import AccountDetails from "../components/AccountDetails"
import { useAuth } from "@clerk/clerk-react"
import { useRemoveBreadcrumbs } from "../store/hooks/breadcrumbHooks"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { useScreenMode } from "../store/hooks/darkModeHooks"


const Profile = () => {
    const { mode } = useScreenMode()
    const [current, setCurrent] = useState<'orders' | 'account details' | 'logout'>('orders')
    const { signOut } = useAuth()
    const remove = useRemoveBreadcrumbs()
    const setBreadcrumb = useSetBreadcrumbs()

    useEffect(() => {
        remove(0)
        setBreadcrumb({ label: 'My account', path: '/my-account' })
    }, [])

    return (
        <main className={`${mode} min-w-screen flex flex-col grow min-h-screen`}>
            <section className="w-full bg-neutral-w-100 min-h-[11.11vw] px-[11%] py-[5%] dark:bg-neutral-b-700 dark:**:text-neutral-w-900">
                <h2 className="font-inter font-bold text-2xl text-neutral-b-900 mb-[8px]">My Account</h2>
                <BreadCrumbs padding="p-0" />
            </section>
            <section className="flex flex-col grow min-[768px]:justify-center min-[768px]:flex-row w-full px-6 min-[1083px]:px-[12%] gap-[8%] dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                <div className="w-full max-w-full min-[768px]:max-w-[248px] min-[768px]:mt-[60px] pt-[60px] min-[768px]:border-r-[1px] border-neutral-w-200 min-[768px]:pr-9 max-h-[504px]">
                    <ul className="flex flex-wrap **:text-[10px] min-[768px]:**:text-sm flex-row min-[680px]:justify-between max-w-full min-[768px]:flex-col gap-4 w-full min-[768px]:max-w-[212px]">
                        <li
                            onClick={() => setCurrent('orders')}
                            className={`font-inter w-[30%] min-w-[200px] flex items-center rounded-lg px-6 gap-[10px] min-[768px]:w-full aspect-[5.05] font-medium text-sm text-nowrap ${current === 'orders' ? 'text-neutral-b-900 bg-neutral-w-100 dark:bg-neutral-b-700' : 'text-neutral-b-500'} custom-hover`}>
                            <img src={cart} alt="" className="w-4 h-4 min-[768px]:w-6 min-[768px]:h-6" />
                            Orders
                        </li>
                        <li
                            onClick={() => setCurrent('account details')}
                            className={`font-inter w-[30%] min-w-[200px] flex items-center rounded-lg px-6 gap-[10px] min-[768px]:w-full aspect-[5.05] font-medium text-sm text-nowrap ${current === 'account details' ? 'text-neutral-b-900 bg-neutral-w-100 dark:bg-neutral-b-700' : 'text-neutral-b-500'} custom-hover`}>
                            <div className="w-4 h-4 min-[768px]:w-6 min-[768px]:h-6">
                                <img src={user} alt="" className="w-[12px] h-[16px] min-[768px]:w-[14px] min-[768px]:h-[18px] " />
                            </div>
                            Account Details
                        </li>
                        <li
                            onClick={() => {
                                signOut()
                            }}
                            className={`font-inter w-[30%] min-w-[200px] flex items-center rounded-lg px-6 gap-[10px] min-[768px]:w-full aspect-[5.05] font-medium text-sm text-nowrap ${current === 'logout' ? 'text-neutral-b-900 bg-neutral-w-100 dark:bg-neutral-b-700' : 'text-neutral-b-500'} custom-hover`}>
                            <img src={logoutIcon} alt="" className="w-4 h-4 min-[768px]:w-6 min-[768px]:h-6" />
                            Logout
                        </li>
                    </ul>
                </div>
                {
                    current === 'orders' ? (
                        <Orders />
                    ) : (
                        <AccountDetails />
                    )
                }
            </section>
        </main>)
}

export default Profile