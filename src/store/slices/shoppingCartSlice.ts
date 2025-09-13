import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductOrder } from "../../types/Order";
import { loadFromSessionStorage } from "../../utils/loadFromSessionStorage";

export interface Address {
    zipCode?: string
    country: string
    state: string
    city: string
    streetAddress: string
}

interface ShoppingCart {
    user: string | null | undefined
    address: Address | null
    items: ProductOrder[]
    itemsPrice: number
    shipping: number
    total: number
    tax: number
    firstOrderDiscount: number | null
}

export type ShoppingCartState = ShoppingCart

const initialState: ShoppingCartState = loadFromSessionStorage('shoppingCart') as ShoppingCartState

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ProductOrder>) => {
            const item = state.items.find((item) => item.id === action.payload.id &&
                JSON.stringify(item.color) === JSON.stringify(action.payload.color) &&
                item.size === action.payload.size)

            if (!item) {
                state.items.push(action.payload)
                state.itemsPrice! = state.itemsPrice! + (action.payload.price! * action.payload.quantity!)
            } else {
                item.quantity = action.payload.quantity
            }

            shoppingCartSlice.caseReducers.updateValues(state)

            sessionStorage.setItem("shoppingCart", JSON.stringify(state));
        },
        removeItem: (state, action: PayloadAction<ProductOrder>) => {
            const item = state.items.find((item) => item.id === action.payload.id &&
                JSON.stringify(item.color) === JSON.stringify(action.payload.color) &&
                item.size === action.payload.size)


            if (item) {
                state.items = state.items.filter((item) => item.id !== action.payload.id ||
                    JSON.stringify(item.color) !== JSON.stringify(action.payload.color) ||
                    item.size !== action.payload.size)

                state.itemsPrice = state.itemsPrice - (action.payload.price! * action.payload.quantity!)

                shoppingCartSlice.caseReducers.updateValues(state)

                sessionStorage.setItem("shoppingCart", JSON.stringify(state));
            }
        },
        increaseQuantity: (state, action: PayloadAction<ProductOrder>) => {
            const product = state.items.find((item) => item.id === action.payload.id &&
                JSON.stringify(item.color) === JSON.stringify(action.payload.color) &&
                item.size === action.payload.size)

            if (product) {
                product.quantity += 1
                state.itemsPrice += product.price;

                shoppingCartSlice.caseReducers.updateValues(state)

                sessionStorage.setItem("shoppingCart", JSON.stringify(state));
            }
        },
        decreaseQuantity: (state, action: PayloadAction<ProductOrder>) => {
            const product = state.items.find((item) => item.id === action.payload.id &&
                JSON.stringify(item.color) === JSON.stringify(action.payload.color) &&
                item.size === action.payload.size)

            if (product) {
                product.quantity -= 1
                state.itemsPrice -= product.price;
                if (product.quantity === 0) {
                    state.items = state.items.filter((item) => item.id !== action.payload.id ||
                        JSON.stringify(item.color) !== JSON.stringify(action.payload.color) ||
                        item.size !== action.payload.size)
                }

                shoppingCartSlice.caseReducers.updateValues(state)

                sessionStorage.setItem("shoppingCart", JSON.stringify(state));
            }
        },
        setAddress: (state, action: PayloadAction<Address>) => {
            state.address = action.payload
            sessionStorage.setItem("shoppingCart", JSON.stringify(state));
        },
        updateValues: (state) => {
            if (state.itemsPrice > 100) {
                state.shipping = 0
            } else {
                state.shipping = 20
            }

            state.tax = state.itemsPrice * 3 / 100
            state.total = state.itemsPrice + state.shipping + state.tax


            sessionStorage.setItem("shoppingCart", JSON.stringify(state));
        },
        applyFirstOrderDiscount: (state) => {
            state.firstOrderDiscount = state.total * 25 / 100

            state.total -= state.firstOrderDiscount
        },
        resetCart: () => {
            sessionStorage.removeItem('shoppingCart')
            return initialState
        }
    }
})

export const { addItem, removeItem, setAddress, increaseQuantity, decreaseQuantity, resetCart, applyFirstOrderDiscount } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
