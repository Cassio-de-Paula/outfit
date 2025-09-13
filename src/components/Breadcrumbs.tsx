import { Link } from "react-router-dom"
import chevron from '../assets/Chevron Right.png'
import { useBreadcrumbs } from "../store/hooks/breadcrumbHooks"
import { useEffect } from "react"

interface BreadcrumbsProps {
    padding?: string
}

const BreadCrumbs = ({ padding }: BreadcrumbsProps) => {
    const breadcrumbsList = useBreadcrumbs()

    useEffect(() => {

    }, [breadcrumbsList])

    return (
        <div className={`flex flex-wrap gap-1.5 items-center **:text-[10px] min-[425px]:**:text-sm ${padding ? padding : 'pl-[15px]'}`}>
            {
                breadcrumbsList.map((breadcrumb, index) => (
                    <>
                        {
                            index === 0 ? (
                                <Link to={'/'} key={`breadcrumb-${index}`} className="font-inter font-normal align-middle text-neutral-b-500">
                                    {breadcrumb.label}
                                </Link>
                            ) : (
                                <>
                                    <img src={chevron} key={`chevron-${index}`} alt="" className="w-[12px] min-[1024px]:w-[24px]" />
                                    <Link to={breadcrumb.path} key={`breadcrumb-${index}`}
                                        className="font-inter align-middle font-normal text-neutral-b-900">
                                        {breadcrumb.label}
                                    </Link>
                                </>
                            )
                        }
                    </>
                ))
            }
        </div>
    )
}

export default BreadCrumbs