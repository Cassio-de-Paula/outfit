import { Product } from "../types/Product";

const products = [
    {
        name: 'Bolsa Feminina',
        category: 'Handbag',
        inStock: true,
        price: 159.9,
        onOffer: true,
        orders: 49,
        images: [
            {
                colors: '#E7B19D',
                url: "https://http2.mlstatic.com/D_NQ_NP_2X_858934-MLB47571028905_092021-F-bolsa-feminina-shopper-grande-bolsinha-promoco-lancamento.webp"
            },
            {
                colors: '#373737',
                url: "https://http2.mlstatic.com/D_NQ_NP_2X_885961-MLB47571051878_092021-F-bolsa-feminina-shopper-grande-bolsinha-promoco-lancamento.webp"
            }
        ],
        details: "Bolsa com alça em grafite e corrente resistente, Bolsa estilosa com espaço interno ideial para seu dia dia ou até mesmo para um evento, Sendo enviado juntamente com outra bolsinha para itens pequenos, Aproveite ! Promoção de lançamento !"

    },
    {
        name: 'Tênis feminino para caminhada',
        category: 'Shoe',
        inStock: true,
        price: 189.9,
        onOffer: true,
        orders: 49,
        images: [
            {
                colors: '#C3C6D0',
                url: "https://http2.mlstatic.com/D_NQ_NP_2X_984231-MLB54964615467_042023-F-tnis-branco-feminino-vili-para-caminhada-academia-treino.webp"
            },
            {
                colors: ['#E2B8B1', '#C3C6D0'],
                url: "https://http2.mlstatic.com/D_NQ_NP_2X_895781-MLB72478609004_102023-F-tnis-branco-feminino-vili-para-caminhada-academia-treino.webp"
            },
            {
                colors: ['#58C9B4', '#C3C6D0'],
                url: 'https://http2.mlstatic.com/D_NQ_NP_2X_796175-MLB72478460206_102023-F-tnis-branco-feminino-vili-para-caminhada-academia-treino.webp'
            }
        ],
        details: "Conheça o Tênis Vili Feminino! Um modelo multiuso que oferece conforto duradouro desde a academia, treinos leves de corrida às atividades casuais, o VILI VL660 possui estrutura respirável em Nylon com lingueta integrada para abraçar seu pé como se fosse uma meia e garantir ótimo encaixe e uma flexibilidade natural dos movimentos. Na parte interna, o reforço acolchoado ajuda a diminuir o desconforto do atrito de contato. Sua entressola de EVA em toda a extensão garante leve e duradouro amortecimento."
    },
    {
        name: 'Perfume Masculino Ralph Lauren Polo Blue EDT 200ml',
        category: 'Perfume',
        inStock: true,
        price: 139.9,
        onOffer: false,
        orders: 25,
        images: [
            {
                colors: null,
                url: 'https://http2.mlstatic.com/D_NQ_NP_2X_982621-MLA79978387968_102024-F.webp'
            }
        ]
    },
    {
        name: 'Boné Trucker Fatal Fury',
        category: 'Hat',
        inStock: true,
        price: 49.9,
        onOffer: false,
        orders: 55,
        images: [
            {
                colors: '#313238',
                url: 'https://http2.mlstatic.com/D_NQ_NP_2X_875629-MLB83202688395_032025-F-bone-trucker-telinha-aba-curva-fatal-fury.webp'
            }
        ],
        details: 'Boné trucker telinha aba curva fechamento snapback. Boné confortável que agrada vários estilos e compreende diversas idades.'
    }

]

export const ProductService = {
    create: async () => {
        for (const product of products) {
            try {
                const response = await fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (!response.ok) {
                    console.error(`Erro ao cadastrar o produto: ${product.name}`, await response.text());
                } else {
                    console.log(`Produto cadastrado com sucesso: ${product.name}`);
                }
            } catch (error) {
                console.error('Erro ao fazer requisição:', error);
            }
        }
    },

    getByFilters: async (page: number, filters: string[], price?: number, queryName?: string): Promise<Product[] | string> => {
        try {
            let results: Product[] = []

            let query = 'http://localhost:3000/products?'

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
            const res = await fetch('http://localhost:3000/products?_sort=orders&_order=desc&_limit=4');
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
            const res = await fetch('http://localhost:3000/products?onOffer=true');
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
            const res = await fetch(`http://localhost:3000/products/${productId}`);

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
            const res = await fetch(`http://localhost:3000/products?category=${category}`);
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
