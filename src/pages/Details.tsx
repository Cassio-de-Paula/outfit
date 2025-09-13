import { useEffect, useState } from "react"
import { Product } from "../types/Product"
import { useLocation } from "react-router-dom"
import { ProductService } from "../services/productServices"
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage"
import share from '../assets/Share.png'
import star from '../assets/star.png'
import minus from '../assets/Minus.png'
import add from '../assets/Add.png'
import more from '../assets/More.png'
import FeaturedProducts from "../components/FeaturedProducts"
import BreadCrumbs from "../components/Breadcrumbs"
import ProductDetails from "../components/ProductDetails"
import { ProductOrder } from "../types/Order"
import { useAddItem } from "../store/hooks/shoppingCartHooks"
import { toast, ToastContainer } from "react-toastify"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { useScreenMode } from "../store/hooks/darkModeHooks"


const Details = () => {
    const { mode } = useScreenMode()
    const { state } = useLocation()
    const addToCart = useAddItem()
    const setBreadcrumb = useSetBreadcrumbs()
    const [product, setProduct] = useState<Product>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoadingSimilar, setIsLoadingSimilar] = useState<boolean>(true)
    const [productErrorMessage, setProductErrorMessage] = useState<string>('')
    const [similarProducts, setSimilarProducts] = useState<Product[]>([])
    const [similarProductsErrorMessage, setSimilarProductsErrorMessage] = useState<string>('')
    const [currentPicture, setCurrentPicture] = useState<number>(0)
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    const [sizeError, setSizeError] = useState<string>('')
    const [order, setOrder] = useState<ProductOrder>({
        id: "",
        name: "",
        price: 0,
        quantity: 1,
        color: undefined,
        size: undefined,
        imageUrl: undefined
    })

    const sendToCart = () => {
        if (product!.sizes && !order.size) {
            setSizeError('You must choose a size')
        } else {
            toast.success('Product successfully added to cart', { autoClose: 3000, position: 'bottom-center' })
            addToCart(order)
            setOrder({
                ...order,
                color: product!.images[0].colors ?? undefined,
                imageUrl: product!.images[0].url,
                quantity: 1,
                size: undefined
            })
            setSizeError('')
            setCurrentPicture(0)
        }
    }

    const fetchProduct = async () => {
        try {
            const res = await ProductService.getById(state)

            if (typeof res === 'string') throw new Error(res)

            setProduct(res)
        } catch (error) {
            if (error instanceof Error) setProductErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchSimilarProducts = async () => {
        try {
            const res = await ProductService.getByCategory(product ? product.category : '')

            if (typeof res === 'string') throw new Error(res)

            setSimilarProducts(res)
        } catch (error) {
            if (error instanceof Error) setSimilarProductsErrorMessage(error.message)
        } finally {
            setIsLoadingSimilar(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [state])

    useEffect(() => {
        if (product) {
            fetchSimilarProducts()
            setOrder({
                id: product!.id!,
                name: product!.name,
                price: product!.price,
                quantity: 1,
                color: product!.images[currentPicture].colors ?? undefined,
                imageUrl: product!.images[currentPicture].url
            })
            setBreadcrumb({ label: 'products', path: '/products' })
            setBreadcrumb({ label: product.name, path: `/products/${state}` })
        }

        window.scrollTo(0, 0)
    }, [product, state])

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main className={`${mode} dark:bg-neutral-b-800 dark:**:text-neutral-w-900 pt-4 px-[30px] min-[1260px]:px-[164px] w-screen min-h-screen justify-between flex`}>
            {
                isLoading ? (
                    <Loading />
                ) : productErrorMessage === '' && product ? (
                    <section className="flex flex-col w-full dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                        <BreadCrumbs />
                        <section className="flex flex-col aspect-[0.6] max-h-[600px] mt-15 min-[1260px]:flex-row min-w-full min-[1024px]:max-h-[574px] justify-between items-center min-[1024px]:mt-4 min-[1024px]:flex-row min-[1024px]:justify-between">
                            <ToastContainer />
                            {
                                isLargeScreen ? (
                                    <div className="hidden min-[1024px]:flex w-full justify-between">
                                        <div className="w-1/2 max-w-[534px] h-[505px] bg-[#E4E4E4] flex flex-col items-center">
                                            <div className="flex justify-center relative w-[288px] h-[404px] max-h-[404px] min-[1024px]:min-h-full bg-center bg-contain bg-no-repeat bg-blend-multiply bg-[#E4E4E4]" style={{ backgroundImage: `url(${product.images[currentPicture].url})` }}>
                                                <span className="flex gap-2 absolute top-[90%]">
                                                    {
                                                        product.images.map((_, index) => (
                                                            <div key={`view-${index}`} className={`w-2 h-2 bg-neutral-b-900 rounded-full ${currentPicture === index ? 'opacity-100' : 'opacity-35'}`} />
                                                        ))
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-[438px]">
                                            <div className="flex justify-between items-center w-full">
                                                <h3 className="font-inter font-bold text-2xl text-neutral-b-900">{product.name}</h3>
                                                <img src={share} alt="share" className="w-6 h-6" />
                                            </div>
                                            <span className="flex gap-3 pt-3">
                                                <div className="flex items-center font-inter font-medium text-sm text-neutral-b-500 bg-neutral-w-100 dark:bg-neutral-b-700 rounded-4xl py-0.5 px-4 gap-3.5">
                                                    <img src={star} alt="reviews" className="w-[16px] h-[15px]" />
                                                    {
                                                        product?.reviews?.length > 0 ? (
                                                            <p>
                                                                {`${product.reviews.reduce((sum, review) => sum += review.rate, 0) / product.reviews.length} — ${product.reviews.length} Reviews`}
                                                            </p>
                                                        ) : (
                                                            'Seja o primeiro a avaliar!'
                                                        )
                                                    }
                                                </div>
                                                <div className="flex items-center rounded-4xl border-[1px] border-neutral-b-100 uppercase py-0.5 px-4 font-inter font-medium text-xs text-neutral-b-500">
                                                    {
                                                        product.inStock ? (
                                                            'In Stock'
                                                        ) : (
                                                            'No Stock'
                                                        )
                                                    }
                                                </div>
                                            </span>
                                            <div className="flex flex-col mt-6">
                                                {
                                                    product.inStock ? (
                                                        <>
                                                            <h2 className="font-inter text-lg font-semibold text-neutral-b-900">${product.price}</h2>
                                                            {
                                                                product.images.every((image) => image.colors !== null) ? (
                                                                    <div className="flex flex-col mt-8">
                                                                        <h3 className="font-inter text-xs font-medium text-neutral-b-500 uppercase tracking-[5%]">
                                                                            Available Colors
                                                                        </h3>
                                                                        <div className="flex gap-[10px] mt-[10px]">
                                                                            {product.images.map((image, index) => (
                                                                                image.colors ? (
                                                                                    <div className="w-8 h-8 flex" key={`selector-${index}`}>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="color"
                                                                                            id={`color-${index}`}
                                                                                            className="hidden peer"
                                                                                            checked={currentPicture === index}
                                                                                            key={`color-input-${index}`}
                                                                                        />
                                                                                        <label
                                                                                            htmlFor={`color-${index}`}
                                                                                            key={`color-label-${index}`}
                                                                                            onClick={() => {
                                                                                                setCurrentPicture(index)
                                                                                                setOrder({ ...order, color: image.colors ?? undefined, imageUrl: image.url })
                                                                                            }}
                                                                                            className="rounded-full w-8 h-8 p-1 hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-200 peer-checked:border-2 peer-checked:border-neutral-b-900 peer-checked:dark:border-neutral-w-900"
                                                                                        >
                                                                                            <div
                                                                                                key={`color-${index}`}
                                                                                                className="w-full h-full rounded-full bg-center bg-cover"
                                                                                                style={{
                                                                                                    background: `linear-gradient(to right, ${image.colors[0]} 50%, ${image.colors[1] ?? image.colors[0]} 50%)`
                                                                                                }}
                                                                                            />
                                                                                        </label>
                                                                                    </div>
                                                                                ) : null
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ) : (<></>)
                                                            }
                                                            {
                                                                product.sizes?.length > 0 ? (
                                                                    <div className="flex flex-col mt-4">
                                                                        <h3 className="font-inter text-xs font-medium text-neutral-b-500 uppercase tracking-[5%]">
                                                                            Select Size
                                                                            {
                                                                                sizeError !== '' ? (
                                                                                    <p className="font-inter font-medium text-[10px] text-red-500-sem lowercase">
                                                                                        {sizeError}
                                                                                    </p>
                                                                                ) : (<></>)
                                                                            }
                                                                        </h3>
                                                                        <div className="flex gap-2 mt-[10px]">
                                                                            {
                                                                                product.sizes.map((size, index) => (
                                                                                    <div className="flex gap-2" key={`size-selector-${index}`}>
                                                                                        <input type="radio" name="size" id={`size-${index}`} key={`size-input-${index}`} className="hidden peer" checked={order.size === size} />
                                                                                        <label htmlFor={`size-${index}`} key={`size-label-${index}`} onClick={() => setOrder({ ...order, size: size })} className="flex hover:cursor-pointer hover:scale-110 transition-all duration-150 justify-center items-center w-[40px] h-[40px] border-[1px] border-neutral-b-100 font-inter font-medium text-xs text-neutral-b-100 rounded-sm uppercase peer-checked:border-neutral-b-900 peer-checked:text-neutral-b-900">
                                                                                            {size}
                                                                                        </label>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ) : (<></>)
                                                            }
                                                            <div className="flex flex-col mt-8">
                                                                <h3 className="font-inter text-xs font-medium text-neutral-b-500 uppercase tracking-[5%]">
                                                                    Quantity
                                                                </h3>
                                                                <div className="flex items-center justify-between w-[164px] h-[44px] rounded-sm border-[1px] border-neutral-b-100 px-4 mt-[10px]">
                                                                    <button onClick={() => {
                                                                        if (order.quantity > 1) setOrder({ ...order, quantity: order.quantity - 1 })
                                                                    }} className="hover:cursor-pointer hover:scale-110 transition-all duration-200">
                                                                        <img src={minus} alt="minus" />
                                                                    </button>
                                                                    <span>{order.quantity}</span>
                                                                    <button onClick={() => {
                                                                        if (order.quantity < 100) setOrder({ ...order, quantity: order.quantity + 1 })
                                                                    }} className="hover:cursor-pointer hover:scale-110 transition-all duration-200">
                                                                        <img src={add} alt="more" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <button onClick={sendToCart} className="flex justify-center items-center w-[248px] h-[44px] font-inter text-sm text-neutral-w-900 bg-neutral-b-900 mt-10 rounded-sm hover:cursor-pointer hover:scale-110 transition-all duration-200">
                                                                Add to cart
                                                            </button>
                                                            <span className="font-inter font-medium text-xs text-neutral-b-500 uppercase tracking-[0.5px] mt-[12px] w-fit">
                                                                — Free shipping on orders $100+
                                                            </span>
                                                        </>
                                                    ) : (<></>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex md:justify-center w-full h-full min-[1024px]:hidden">
                                        <ProductDetails product={product} currentPicture={currentPicture} setCurrentPicture={setCurrentPicture} order={order} setOrder={setOrder} addToCart={sendToCart} sizeError={sizeError} />
                                    </div>
                                )
                            }
                        </section>
                        <section className="flex flex-wrap mt-5 justify-center items-center md:mt-[172px] gap-8 ">
                            <button className="flex gap-2 items-center px-6 rounded-lg bg-neutral-w-100 dark:bg-neutral-b-700 w-[241px] h-[41px] max-w-[241px] max-h-[41px]">
                                <img src={more} alt="" className="w-[24px] h-[24px]" />
                                Details
                            </button>
                            <div className="min-h-[324px] max-w-[727px]">
                                <h5 className="font-inter text-base font-semibold text-neutral-b-900">Detail</h5>
                                <p className="font-inter font-normal text-sm text-neutral-b-500 mt-6 ">
                                    {product.details}
                                </p>
                            </div>
                        </section>
                        <section className="flex flex-col mb-[144px]">
                            <span className="flex flex-col gap-2">
                                <h3 className="font-inter font-bold text-2xl text-neutral-b-900">You might also like</h3>
                                <p className="font-inter font-medium text-xs text-neutral-b-300 uppercase">Similar products</p>
                            </span>
                            {
                                isLoadingSimilar ? (
                                    <Loading />
                                ) : similarProductsErrorMessage === '' ? (
                                    <FeaturedProducts featuredProducts={similarProducts} />
                                ) : (
                                    <ErrorMessage message={similarProductsErrorMessage} />
                                )
                            }
                        </section>
                    </section >
                ) : (
                    <ErrorMessage message={productErrorMessage} />
                )
            }
        </main >
    )
}

export default Details