import { BreadcrumbState } from "../store/slices/breadcrumbSlice";
import { ShoppingCartState } from "../store/slices/shoppingCartSlice";

type keyType = 'shoppingCart' | 'breadcrumb'

export const loadFromSessionStorage = (key: keyType): ShoppingCartState | BreadcrumbState => {
    const data = sessionStorage.getItem(key);

    switch (key) {
        case 'shoppingCart':
            return data ? JSON.parse(data) : {
                user: null,
                address: null,
                items: [],
                itemsPrice: 0,
                shipping: 20,
                total: 20,
                tax: 0,
                firstOrderDiscount: null
            }
        case 'breadcrumb':
            return data ? JSON.parse(data) : {
                breadcrumbs: [{
                    label: 'Outfit',
                    path: '/'
                }]
            }
    }
};