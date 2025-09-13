import { Outlet } from "react-router-dom"
import BreadCrumbs from "../components/Breadcrumbs"
import { useRemoveBreadcrumbs } from "../store/hooks/breadcrumbHooks"
import { useEffect, useState } from "react"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { useScreenMode } from "../store/hooks/darkModeHooks"

export type OutletContextType = {
    setCurrentChildrenTitle: React.Dispatch<React.SetStateAction<string>>
}

const Auth = () => {
    const { mode } = useScreenMode()
    const setBreadcrumb = useSetBreadcrumbs()
    const remove = useRemoveBreadcrumbs()
    const [currentChildrenTitle, setCurrentChildrenTitle] = useState<string>('')

    const setChildrenPath = () => {
        if (currentChildrenTitle.includes(' ')) {
            return currentChildrenTitle.split(' ').join('-').toLowerCase()
        } else {
            return currentChildrenTitle.toLowerCase
        }
    }

    useEffect(() => {
        remove(0)
        setBreadcrumb({ label: currentChildrenTitle, path: `/auth/${setChildrenPath()}` })
    }, [currentChildrenTitle])

    return (
        <main className={`${mode} min-w-screen flex flex-col grow min-h-screen`}>
            <section className="w-full bg-neutral-w-100 min-h-[11.11vw] px-[11%] py-[5%] dark:bg-neutral-b-700 dark:**:text-neutral-w-900">
                <h2 className="font-inter font-bold text-2xl text-neutral-b-900 mb-[8px]">{currentChildrenTitle}</h2>
                <BreadCrumbs padding="p-0" />
            </section>
            <Outlet context={{ setCurrentChildrenTitle }} />
        </main>
    )
}

export default Auth