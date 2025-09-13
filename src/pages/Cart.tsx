import { useFirstOrderDiscount, useShoppingCart } from "../store/hooks/shoppingCartHooks"
import OrderSummary from "../components/OrderSummary"
import { useNavigate } from "react-router-dom"
import { default as ShoppingCart } from "../components/Cart"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { useEffect } from "react"
import OrderService from "../services/orderService"
import { useUser } from "@clerk/clerk-react"

const Cart = () => {
    const discount = useFirstOrderDiscount()
    const { user } = useUser()
    const { items } = useShoppingCart()
    const redirect = useNavigate()
    const setBreadcrumb = useSetBreadcrumbs()

    const fetchOrders = async () => {
        try {
            const res = await OrderService.getByUser(user!.id)

            if (typeof res === 'string') throw new Error(res)

            if (res.length === 0) discount()
        } catch (error) {
            console.error(error)
        }
    }

    const navigate = () => {
        redirect('checkout')
    }

    useEffect(() => {
        fetchOrders()
        setBreadcrumb({ label: 'Cart', path: '/cart' })
    }, [])

    return (
        <>
            <div className="flex flex-col mt-13 w-full max-w-[628px]">
                <h3 className="font-inter font-semibold text-base text-neutral-b-900 mb-[18px]">Your Cart</h3>
                <hr className="w-full bg-neutral-w-200 h-[1px] border-none" />
                <ShoppingCart />
            </div>
            {
                items.length > 0 ? (
                    <aside className="flex flex-col border-[1px] border-neutral-b-100 rounded-sm py-8 px-6 mt-[56px] w-full max-w-[341px] max-h-[430px]">
                        <h3 className="font-inter text-neutral-b-900 text-sm font-semibold">Order summary</h3>
                        <OrderSummary buttonText="Checkout" type="button" disabled={false} onClick={navigate} />
                    </aside>
                ) : (<></>)
            }
        </>
    )
}

export default Cart