import { useEffect, useState } from "react"
import OrderService from "../services/orderService"
import { Order as OrderType } from "../types/Order"
import BlackButton from "./BlackButton"
import Order from "./Order"
import { useUser } from "@clerk/clerk-react"
import Loading from "./Loading"
import empty from '../assets/Empty State.png'
import ErrorMessage from "./ErrorMessage"

const Orders = () => {
    const { user } = useUser()
    const [orders, setOrders] = useState<OrderType[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchOrders = async () => {
        try {
            const res = await OrderService.getByUser(user!.id)

            if (typeof res === 'string') throw new Error(res)

            setOrders(res)
        } catch (error) {
            if (error instanceof Error) setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchOrders()
    }, [user])

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col w-full gap-10 pt-12 h-[732px] overflow-y-scroll mb-8 pr-2.5 min-[1198px]:m-0">
            {
                isLoading ? (
                    <Loading />
                ) : errorMessage === '' ? (
                    orders.length > 0 ? (
                        orders.map((order) => (
                            order.items.map((item) => (
                                <Order item={item} orderDate={order.createdAt} />
                            ))
                        ))
                    ) : (
                        <span className="flex flex-col justify-center items-center font-inter font-normal text-neutral-b-400 text-sm mt-[195px] mx-auto">
                            <img src={empty} alt="" />
                            Your order history is waiting to be filled.
                            <BlackButton text="Start Shopping" breadCrumbLabel="products" />
                        </span>
                    )
                ) : (
                    <ErrorMessage message={errorMessage} />
                )
            }
        </div>
    )
}

export default Orders