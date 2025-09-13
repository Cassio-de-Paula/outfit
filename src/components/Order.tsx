import { Link } from "react-router-dom";
import { ProductOrder } from "../types/Order";

interface OrderProps {
    item: ProductOrder
    orderDate: Date
}

const Order = ({ item, orderDate }: OrderProps) => {

    const textLimiter = (text: string) => {
        return text.length > 20 ? text.slice(0, 17) + "..." : text;
    };

    return (
        <span className="flex max-w-full">
            <div className="flex justify-center items-center h-full aspect-square bg-[#E4E4E4]">
                <div className="bg-[#E4E4E4] bg-center bg-contain bg-no-repeat bg-blend-multiply w-full aspect-[1.4090]" style={{ backgroundImage: `url(${item.imageUrl})` }} />
            </div>
            <div className="ml-[5%] flex flex-col w-full">
                <h3 className="font-inter font-medium text-[10px] min-[606px]:text-sm tex-neutral-b-900">
                    {textLimiter(item.name)}
                </h3>
                <span className="flex flex-col gap-1 text-[8px] min-[606px]:text-[10px] md:gap-2 font-inter font-medium md:text-xs text-neutral-b-500 text-nowrap">
                    Ordered on: {new Date(orderDate).toLocaleDateString(navigator.language, { day: '2-digit', month: 'long', year: "numeric" })}
                    <span className="flex gap-1.5 text-[8px] min-[606px]:text-[10px] font-inter font-medium md:text-xs mt-1.5 text-neutral-b-900 text-nowrap">
                        $ {item.price.toFixed(2)}
                        {
                            item.quantity > 1 ? (
                                <p>Quantity: {item.quantity}</p>
                            ) : (
                                <></>
                            )
                        }
                    </span>
                </span>
            </div>
            <span className="font-inter h-full my-auto flex items-center justify-end text-[10px] md:text-sm font-medium text-neutral-b-900">
                <Link to={`/products/${item.id}`} state={item.id} className="border-[1px] text-[8px] px-1.5 py-2 min-[606px]:text-sm text-nowrap rounded-sm border-neutral-b-900 min-[606px]:py-3 min-[606px]:px-6 font-inter font-medium text-neutral-b-900 hover:cursor-pointer hover:scale-110 transition-all duration-200">
                    View Item
                </Link>
            </span>
        </span>
    )
}

export default Order