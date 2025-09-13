import { useShoppingCart } from "../store/hooks/shoppingCartHooks"
import BlackButton from "./BlackButton"
import Order from "./CartItem"
import ErrorMessage from "./ErrorMessage"


const Cart = () => {
    const { items } = useShoppingCart()

    return (
        <div className="flex flex-col w-full gap-10 pt-12 max-h-[732px] overflow-y-scroll mb-8 min-[1198px]:m-0">
            {
                items.length > 0 ? (
                    items.map((item) => (
                        typeof item === 'string' ? (
                            <ErrorMessage message={item} />
                        ) : (
                            <Order item={item} />
                        )
                    ))
                ) : (
                    <span className="font-inter font-normal text-neutral-b-400 text-sm mt-8">
                        Your cart is empty, start buying now!
                        <BlackButton text="Explore Outfit!" breadCrumbLabel="products" />
                    </span>
                )
            }
        </div>
    )
}

export default Cart