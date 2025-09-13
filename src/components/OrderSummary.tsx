import { Link } from "react-router-dom"
import { useShoppingCart } from "../store/hooks/shoppingCartHooks"

interface OrderSummaryProps {
    buttonText: string
    disabled: boolean
    type?: "submit" | "reset" | "button" | undefined
    onClick?: () => void
}

const OrderSummary = ({ buttonText, type, disabled, onClick }: OrderSummaryProps) => {
    const { price, shipping, tax, total, discount } = useShoppingCart()

    return (
        <>
            <ul className="flex flex-col w-full mt-10 gap-3">
                <li className="w-full flex justify-between">
                    <p className="font-inter text-sm font-medium text-neutral-b-500">Subtotal: </p>
                    <p className="font-inter text-sm font-medium text-neutral-b-900">${price.toFixed(2)}</p>
                </li>
                {
                    discount !== null ? (
                        <li className="w-full flex justify-between">
                            <p className="font-inter text-sm font-medium text-neutral-b-500">Discount: </p>
                            <p className="font-inter text-sm font-medium text-neutral-b-900">${discount.toFixed(2)}</p>
                        </li>
                    ) : (<></>)
                }
                <li className="w-full flex justify-between">
                    <p className="font-inter text-sm font-medium text-neutral-b-500">Shipping: </p>
                    <p className="font-inter text-sm font-medium text-neutral-b-900">{shipping > 0 ? `${shipping.toFixed(2)}` : 'Free'}</p>
                </li>
                <li className="w-full flex justify-between">
                    <p className="font-inter text-sm font-medium text-neutral-b-500">Tax: </p>
                    <p className="font-inter text-sm font-medium text-neutral-b-900">${tax.toFixed(2)}</p>
                </li>
            </ul>
            <hr className="w-full bg-neutral-w-200 h-[1px] border-none my-6" />
            <span className="flex w-full justify-between">
                <p className="font-inter text-sm font-medium text-neutral-b-900">Total</p>
                <p className="font-inter text-sm font-medium text-neutral-b-900">{total.toFixed(2)}</p>
            </span>
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                className="bg-neutral-b-900 font-inter font-medium text-sm text-center text-neutral-w-900 mt-8 py-3 rounded-sm hover:cursor-pointer hover:scale-110 transition-all duration-200">
                {buttonText}
            </button>
            <Link to={'/products'} className="text-xs underline text-neutral-b-900 mt-8 text-center underline-offset-2">Continue Shopping</Link>
        </>
    )
}

export default OrderSummary