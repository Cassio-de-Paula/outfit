import { Product } from "../types/Product"
import ProductList from "./ProductList"

interface FeaturedProductsProps {
    featuredProducts: Product[]
}

const FeaturedProducts = ({ featuredProducts }: FeaturedProductsProps) => {

    return (
        featuredProducts.length > 0 ? (
            <div className='flex flex-col items-center min-w-full'>
                <div className="grid w-[300px] sm:w-full auto-rows-max grid-cols-2 gap-6 max-h-min lg:grid-cols-4 justify-items-center">
                    {
                        featuredProducts.map((product) => (
                            <ProductList product={product} />
                        ))
                    }
                </div>
            </div>
        ) : (
            <p>Não foram encontrados produtos em destaque</p>
        )
    )
}

export default FeaturedProducts