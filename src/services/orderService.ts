import { Order } from "../types/Order"


const OrderService = {
    create: async (order: Order): Promise<Order | string> => {
        try {
            const res = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            if (!res.ok) {
                throw new Error('Order not created');
            }

            return await res.json();
        } catch (error) {
            if (error instanceof Error) return error.message
            return 'Error unknown'
        }
    },
    getById: async (orderId: string): Promise<Order | string> => {
        try {
            const res = await fetch(`http://localhost:3000/orders/${orderId}`)

            if (!res.ok) throw new Error('Order not found');

            return await res.json()
        } catch (error) {
            if (error instanceof Error) return error.message
            return 'Error unknown'
        }
    },
    getByUser: async (userId: string): Promise<Order[] | string> => {
        try {
            const res = await fetch(`http://localhost:3000/orders?userId=${userId}`)

            if (!res.ok) throw new Error('This user has no orders');

            return await res.json()
        } catch (error) {
            if (error instanceof Error) return error.message
            return 'Error unknown'
        }
    }
}

export default OrderService