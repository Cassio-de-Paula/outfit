import { Product } from "../types/Product";
const BASE_URL = import.meta.env.VITE_BASE_URL

export const ProductService = {
    getByFilters: async (page: number, filters: string[], price?: number, queryName?: string): Promise<Product[] | string> => {
        try {
            let results: Product[] = []

            let query = `${BASE_URL}/products?`

            if (price !== undefined) query += `&price_lte=${price}`

            if (queryName) query += `&name_like=${queryName}`

            if (filters.length === 0) {
                const res = await fetch(query);

                if (!res.ok) throw new Error(res.statusText);

                results = await res.json();
            } else {
                for (let category of filters) {
                    let categoryQuery = `${query}&category=${category}&_page=${page}&_limit=9`;

                    const res = await fetch(categoryQuery);

                    if (!res.ok) throw new Error(res.statusText);

                    const products: Product[] = await res.json();
                    results = results.concat(products);
                }
            }

            return results;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "Error Uknown";
        }
    },

    getBestSelling: async (): Promise<Product[] | string> => {
        try {
            const res = await fetch(`${BASE_URL}/products?_sort=orders&_order=desc&_limit=4`);
            if (!res.ok) throw new Error(res.statusText);

            const products: Product[] = await res.json();
            return products;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "Error Uknown";
        }
    },

    getOffers: async (): Promise<Product[] | string> => {
        try {
            const res = await fetch(`${BASE_URL}/products?onOffer=true`);
            if (!res.ok) throw new Error(res.statusText);

            const products: Product[] = await res.json();

            const randomProducts = products
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            return randomProducts;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "Error Uknown";
        }
    },

    getById: async (productId: string): Promise<Product | string> => {
        try {
            const res = await fetch(`${BASE_URL}/products/${productId}`);

            if (!res.ok) throw new Error(res.statusText);

            const product: Product = await res.json();
            return product;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "Error Uknown";
        }
    },

    getByCategory: async (category: string): Promise<Product[] | string> => {
        try {
            const res = await fetch(`${BASE_URL}/products?category=${category}`);
            if (!res.ok) throw new Error(res.statusText);

            const products: Product[] = await res.json();

            const randomProducts = products
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            return randomProducts;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "Error Uknown";
        }
    }
};
