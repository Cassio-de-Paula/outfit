import { Link } from "react-router-dom"
import arrow from '../assets/white-arrow.png'
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"

interface BlackButtonProps {
    text: string
    breadCrumbLabel: string
}

const BlackButton = ({ text, breadCrumbLabel }: BlackButtonProps) => {
    const setBreadcrumbs = useSetBreadcrumbs()

    const getBreadcrumbPath = () => {
        if (breadCrumbLabel.includes(' ')) {
            return breadCrumbLabel.split(' ').join('-').toLowerCase()
        } else {
            return breadCrumbLabel.toLowerCase()
        }
    }

    return (
        <div className="group">
            <Link to={`/${getBreadcrumbPath()}`} onClick={() => setBreadcrumbs({ label: breadCrumbLabel, path: `/${getBreadcrumbPath()}` })} className='bg-neutral-b-900 py-3 px-6 font-inter text-sm text-neutral-w-900 mt-12 max-h-11 flex w-fit gap-1.5 rounded-sm hover:scale-110 transition-all duration-200'>
                {text} <img src={arrow} alt="arrow-right" className="group-hover:translate-x-3 transition-all duration-200" />
            </Link>
        </div>
    )
}

export default BlackButton