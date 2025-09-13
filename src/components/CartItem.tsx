import add from '../assets/Add.png'
import minus from '../assets/Minus.png'
import x from '../assets/X.png'
import chevron from '../assets/Chevron Down.png'
import { useDecreaseItem, useIncreaseItem, useRemoveItem } from "../store/hooks/shoppingCartHooks"
import { ProductOrder } from '../types/Order'
import { useScreenMode } from '../store/hooks/darkModeHooks'

interface CartItemProps {
    item: ProductOrder
}

const CartItem = ({ item }: CartItemProps) => {
    const { mode } = useScreenMode()
    const increase = useIncreaseItem()
    const decrease = useDecreaseItem()
    const remove = useRemoveItem()

    const textLimiter = (text: string) => {
        return text.length > 20 ? text.slice(0, 17) + "..." : text;
    };

    return (
        <span className={`${mode} flex max-w-[628px] aspect-[7.8]`}>
            <div className="flex justify-center items-center h-full aspect-square bg-[#E4E4E4]">
                <div className="bg-[#E4E4E4] bg-center bg-contain bg-no-repeat bg-blend-multiply w-full aspect-[1.4090]" style={{ backgroundImage: `url(${item.imageUrl})` }} />
            </div>
            <div className="ml-[5%] mt-2 flex-flex-col max-w-[27%] min-w-[27%]">
                <h3 className="font-inter font-medium text-[10px] min-[606px]:text-sm tex-neutral-b-900">
                    {textLimiter(item.name)}
                </h3>
                <span className="flex gap-1 items-center text-[8px] md:gap-2 font-inter font-medium md:text-xs text-neutral-b-500">
                    {
                        item.color ? (
                            <>
                                Color:
                                <div className="h-2 md:h-3 aspect-square rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${item.color[0]} 50%, ${item.color[1] ?? item.color[0]} 50%)` }} />
                            </>
                        ) : (
                            <></>
                        )
                    }
                    {
                        item.size ? (
                            <p className="text-nowrap">
                                — Size: {item.size}
                            </p>
                        ) : (
                            <></>
                        )
                    }
                </span>
            </div>
            <span className="font-inter h-full ml-4 flex items-center justify-end text-[10px] md:text-sm font-medium text-neutral-b-900 w-full">
                <p>
                    ${(item.price).toFixed(2)}
                </p>
            </span>
            <div className="hidden w-full gap-5 justify-between min-[606px]:flex min-[606px]:flex-row ml-[5%] my-auto **:text-[10px] min-[606px]:**:text-sm">
                <div className="flex py-[4px] px-[6px] justify-between items-center min-w-[80px] rounded-sm border-[1px] border-neutral-b-100">
                    <img src={minus} alt="" className="w-4 h-4" onClick={() => decrease(item)} />
                    <p>{item.quantity}</p>
                    <img src={add} alt="" className="w-4 h-4" onClick={() => increase(item)} />
                </div>
                <span className="bg-neutral-w-100 dark:bg-neutral-b-800 dark:border-[1px] dark:border-neutral-w-900 min-h-full rounded-sm flex py-1 px-1">
                    <img src={x} alt="remove" className="min-w-5 min-h-5" onClick={() => remove(item)} />
                </span>
            </div>
            <div className="flex h-full gap-3 justify-end w-full min-[606px]:hidden min-[355px]:ml-[8%] my-auto min-[355px]:gap-10">
                <div className="flex flex-col justify-between items-center my-auto min-w-[12px]">
                    <img src={chevron} onClick={() => increase(item)} alt="" className="w-3 h-3 rotate-180 hover:cursor-pointer hover:scale-110 transition-all duration-300" />
                    <p className="text-[10px]">{item.quantity}</p>
                    <img src={chevron} onClick={() => decrease(item)} alt="" className="w-3 h-3 hover:cursor-pointer hover:scale-110 transition-all duration-300" />
                </div>
                <span className="bg-neutral-w-100 dark:bg-neutral-b-800 dark:border-[1px] dark:border-neutral-w-900 h-4 aspect-square flex justify-between items-center rounded-sm">
                    <img src={x} alt="remove" className="" onClick={() => remove(item)} />
                </span>
            </div>
        </span>
    )
}

export default CartItem