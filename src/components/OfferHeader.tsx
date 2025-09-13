import { Link } from "react-router-dom"


const OfferHeader = () => {

    return (
        <div className="min-w-full bg-neutral-b-900 text-neutral-w-900 flex justify-center items-center p-2 gap-2 min-[320px]: text-xs">
            <p className="font-inter">
                Get 25% OFF on your first order.
            </p>
            <div className="group relative inline-block hover:scale-105 transform transition-all duration-100">
                <Link
                    to={'/products'}
                    className="relative hover:cursor-pointer font-manrope"
                >
                    Order Now
                </Link>
                <div className="absolute bottom-0 left-1/2 transform w-0 h-0.5 bg-neutral-w-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </div>
        </div>
    )
}

export default OfferHeader