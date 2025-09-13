import { useState } from "react"
import { Link } from "react-router-dom"
import arrow from '../assets/Arrow Right.png'

interface DropdownItemProps {
    title: string
    link: string
}

interface DropdownProps {
    items: DropdownItemProps[]
    title?: string
}

const Dropdown = ({ items, title }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => setIsOpen((prevState) => !prevState)} className="hover:scale-110 transition-all duration-100">
                {
                    title ? (
                        <>
                            {title}
                        </>
                    ) : (
                        <div className={`${isOpen ? '-rotate-90' : 'rotate-90'} w-[22px] aspect-square p-0.5 border-[#81838C] border-[2px] rounded-4xl`}>
                            <img src={arrow} alt="dropdown-menu" className="aspect-square" />
                        </div>
                    )
                }
            </button>
            <ul className={`bg-neutral-b-900 w-32 p-2.5 ${isOpen ? 'opacity-100' : 'opacity-0'
                } absolute z-20 right-0 rounded-md transform transition-all duration-300 overflow-hidden gap-3 flex flex-col top-full mt-2`}
            >                {
                    items.map((item, index) => (
                        <Link to={item.link} key={`dropdown-${index}`}>
                            <li className="text-neutral-w-900">
                                {item.title}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}

export default Dropdown