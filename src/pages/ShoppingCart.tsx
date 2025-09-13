import BreadCrumbs from "../components/Breadcrumbs"
import { Outlet } from "react-router-dom"
import { useScreenMode } from "../store/hooks/darkModeHooks"


const ShoppingCart = () => {
    const { mode } = useScreenMode()

    return (
        <main className={`${mode} min-w-screen flex flex-col grow min-h-screen dark:bg-neutral-b-800 dark:**:text-neutral-w-900`}>
            <section className="w-full bg-neutral-w-100 min-h-[11.11vw] px-[11%] py-[5%] dark:bg-neutral-b-700">
                <h2 className="font-inter font-bold text-2xl text-neutral-b-900 mb-[8px]">Cart</h2>
                <BreadCrumbs padding="p-0" />
            </section>
            <section className="flex items-center flex-col-reverse min-[890px]:flex-row w-full px-6 min-[1083px]:px-[12%] gap-[8%] dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                <Outlet />
            </section>
        </main>
    )
}

export default ShoppingCart