import { Product } from "../types/Product"
import ProductList from "./ProductList"

interface ProductGridProps {
    filteredProducts: Product[]
    page: number
}

const ProductGrid = ({ filteredProducts, page }: ProductGridProps) => {
    return (
        filteredProducts.length > 0 ? (
            <div className={`grid w-full px-[20px] grid-cols-2 auto-rows-max justify-items-center grow gap-[24px] max-w-[824px] max-h-min ${filteredProducts.length === 0 ? 'grid-cols-1' : 'min-[375px]:grid-cols-3'}`}>
                {
                    filteredProducts.slice((0 + (page - 1) * 9), (page * 9)).map((product) => (
                        <ProductList product={product} />
                    ))
                }
            </div>
        ) : (
            <div className="flex w-full justify-center items-center">
                <p className='font-inter max-w-[300px] mt-[100px] text-sm text-neutral-b-300 font-medium text-center'>Nenhum produto correspondente encontrado. Tente remover ou trocar os filtros de pesquisa.</p>
            </div>
        )
    )
}

export default ProductGrid