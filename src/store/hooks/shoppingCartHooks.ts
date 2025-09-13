import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductOrder } from "../../types/Order";
import { addItem, Address, decreaseQuantity, increaseQuantity, removeItem, setAddress, resetCart, applyFirstOrderDiscount } from "../slices/shoppingCartSlice";
import { createSelector } from "@reduxjs/toolkit";

const selectShoppingCart = createSelector(
    (state: RootState) => state.shoppingCart,
    (shoppingCart) => ({
        items: shoppingCart.items,
        price: shoppingCart.itemsPrice,
        address: shoppingCart.address,
        total: shoppingCart.total,
        shipping: shoppingCart.shipping,
        tax: shoppingCart.tax,
        discount: shoppingCart.firstOrderDiscount
    })
);

export const useShoppingCart = () => {
    return useSelector(selectShoppingCart);
};

export const useAddItem = () => {
    const dispatch = useDispatch()
    return (newItem: ProductOrder) => {
        dispatch(addItem(newItem))
    }
}

export const useRemoveItem = () => {
    const dispatch = useDispatch()
    return (item: ProductOrder) => {
        dispatch(removeItem(item))
    }
}

export const useSetAddress = () => {
    const dispatch = useDispatch()
    return (address: Address) => {
        dispatch(setAddress(address))
    }
}

export const useIncreaseItem = () => {
    const dispatch = useDispatch()
    return (item: ProductOrder) => {
        dispatch(increaseQuantity(item))
    }
}

export const useDecreaseItem = () => {
    const dispatch = useDispatch()
    return (item: ProductOrder) => {
        dispatch(decreaseQuantity(item))
    }
}

export const useResetCart = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(resetCart())
    }
}

export const useFirstOrderDiscount = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(applyFirstOrderDiscount())
    }
}