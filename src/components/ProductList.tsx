import { Link } from "react-router-dom"
import { Product } from "../types/Product"
import StockButton from "./StockButton"

interface ProductListProps {
    product: Product
}

const ProductList = ({ product }: ProductListProps) => {

    const textLimiter = (text: string) => {
        return text.length > 40 ? text.slice(0, 25) + "..." : text;
    };

    return (
        <Link to={`/products/${product.id}`} key={`product-${product.id}`} state={product.id} className="w-full h-max max-w-[264px] max-h-full aspect-[1.64772] flex flex-col px-2 pt-4 hover:cursor-pointer hover:scale-110 transition-all duration-300 dark:**:text-neutral-w-900" style={{ gap: '10%' }}>
            <div className={`w-full rounded-md bg-center bg-contain bg-no-repeat max-w-[248px] max-h-[312px] aspect-[0.79487] bg-[#E4E4E4] dark:bg-neutral-w-900 bg-blend-multiply`} style={{ backgroundImage: `url(${product.images[0].url})` }} />
            <span className="flex flex-col max-w-full items-start justify-between text-wrap **:text-[8px] min-[500px]:**:text-[10px] md:**:text-sm/[24px]">
                <h3 className="font-inter min-h-[20px] font-medium text-neutral-b-900 min-[500px]:min-h-[40px] mb-3">{textLimiter(product.name)}</h3>
                <span className="flex flex-row justify-center items-start min-[375px]:flex-row min-[375px]:items-center gap-2 min-[1024px]:gap-4">
                    <StockButton inStock={product.inStock} />
                    <p className="font-inter h-full text-nowrap text-[10px] min-[1024px]:text-sm font-normal text-neutral-b-600">
                        $ {product.price}
                    </p>
                </span>
            </span>
        </Link>
    )
}

export default ProductList