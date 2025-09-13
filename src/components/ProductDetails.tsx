import { Product } from "../types/Product";
import share from '../assets/Share.png';
import star from '../assets/star.png';
import minus from '../assets/Minus.png';
import add from '../assets/Add.png';
import chevron from '../assets/Chevron Right.png';
import { useEffect, useState } from "react";
import { ProductOrder } from "../types/Order";

interface ProductDetailsProps {
    product: Product;
    currentPicture: number;
    setCurrentPicture: React.Dispatch<React.SetStateAction<number>>;
    order: ProductOrder
    setOrder: React.Dispatch<React.SetStateAction<ProductOrder>>;
    addToCart: () => void
    sizeError: string
}

const ProductDetails = ({ product, currentPicture, setCurrentPicture, order, setOrder, addToCart, sizeError }: ProductDetailsProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [fadeIn, setFadeIn] = useState<boolean>(false);


    useEffect(() => {
        // Ativa o efeito de fade-in ao trocar a imagem
        setFadeIn(false);
        setTimeout(() => setFadeIn(true), 50); // Pequeno atraso para resetar a opacidade
    }, [currentPicture]);


    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex justify-center w-full min-h-full items-center perspective-[1000px]">
            <div
                className={`w-full h-full rounded-lg relative transform-3d transition-transform duration-1000 ${isFlipped ? "rotate-y-180" : ""
                    }`}
            >
                <div className="absolute w-full h-full rounded-lg backface-hidden flex justify-center">
                    <div className="flex flex-col justify-start w-full max-h-[650px] items-center md:justify-center md:flex-row">
                        <div
                            className={`w-full pb-3 max-w-[534px] max-h-[650px] bg-[#E4E4E4] mb-3.5 relative rounded-2xl`}
                        >
                            <div className={`w-full aspect-[1.12359] max-h-[600px] bg-center bg-contain rounded-2xl bg-[#E4E4E4] bg-blend-multiply bg-no-repeat transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${product.images[currentPicture].url})` }} />
                            <div className="flex gap-[10px] justify-center">
                                {product.images.map((image, index) => (
                                    image.colors ? (
                                        <div className="w-6 h-6 flex">
                                            <input
                                                type="radio"
                                                name="color"
                                                id={`color-${index}`}
                                                className="hidden peer"
                                                checked={currentPicture === index}
                                            />
                                            <label
                                                htmlFor={`color-${index}`}
                                                onClick={() => {
                                                    setCurrentPicture(index)
                                                    setOrder({ ...order, color: image.colors ?? undefined, imageUrl: image.url })
                                                }}
                                                className="rounded-full w-6 h-6 p-1 hover:cursor-pointer hover:scale-150 hover:transition-all hover:duration-200 peer-checked:border-2 peer-checked:border-neutral-b-900"
                                            >
                                                <div
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
                        <button onClick={flipCard} className={`ml-2 ${isFlipped ? 'invisible' : 'flex'} border-2 border-neutral-b-200 rounded-full`}>
                            <img src={chevron} alt="flip card" className="w-[24px] h-[24px] hover:scale-110 transition-all" />
                        </button>
                    </div>
                </div>
                <div className="absolute w-full flex flex-col justify-start h-full rounded-lg md:justify-center items-center rotate-y-180 backface-hidden md:flex-row">
                    <div className="flex aspect-[1.12359] mb-3.5 flex-col w-full max-w-[534px] justify-center border-2 border-neutral-b-200 rounded-lg p-4">
                        <div className="flex justify-between items-center w-full">
                            <h3 className="font-inter text-lg font-bold min-[425px]:text-2xl text-neutral-b-900">{product.name}</h3>
                            <img src={share} alt="share" className="w-4 h-4 min-[425px]:w-6 min-[425px]:h-6" />
                        </div>
                        <span className="flex gap-3 pt-3">
                            <div className="flex items-center text-[10px] font-inter font-medium min-[425px]:text-sm text-neutral-b-500 bg-neutral-w-100 dark:bg-neutral-b-700 rounded-4xl py-0.5 px-4 gap-3.5">
                                <img src={star} alt="reviews" className="w-[10px] h-[11 px] min-[425px]:w-[16px] min-[425px]:h-[15px]" />
                                {product?.reviews?.length > 0 ? (
                                    <p>
                                        {`${(product.reviews.reduce((sum, review) => sum + review.rate, 0) / product.reviews.length).toFixed(1)} — ${product.reviews.length} Reviews`}
                                    </p>
                                ) : (
                                    "Seja o primeiro a avaliar!"
                                )}
                            </div>
                        </span>
                        <div className="flex flex-col mt-6 **:text-[10px] min-[425px]:**:text-sm">
                            {
                                product.inStock ? (
                                    <>
                                        {
                                            product?.sizes?.length > 0 ? (
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
                                                                <div className="flex gap-2">
                                                                    <input type="radio" name="size" id={`size-${index}`} className="hidden peer" />
                                                                    <label htmlFor={`size-${index}`} onClick={() => setOrder({ ...order, size: size })} className="flex w-7 h-7 hover:cursor-pointer hover:scale-110 transition-all duration-150 justify-center items-center min-[425px]:w-[40px] min-[425px]:h-[40px] border-[1px] border-neutral-b-100 font-inter font-medium text-xs text-neutral-b-100 rounded-sm uppercase peer-checked:border-neutral-b-900 peer-checked:text-neutral-b-900">
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
                                            <div className="flex items-center w-32 h-8 justify-between md:w-[164px] md:h-[44px] rounded-sm border-[1px] border-neutral-b-100 px-4 mt-[10px]">
                                                <button onClick={() => {
                                                    if (order.quantity > 1) setOrder({ ...order, quantity: order.quantity - 1 })
                                                }} className="hover:cursor-pointer hover:scale-110 transition-all duration-200">
                                                    <img src={minus} alt="minus" className="w-4 h-4 md:w-6 md:h-6" />
                                                </button>
                                                <span>{order.quantity}</span>
                                                <button onClick={() => {
                                                    if (order.quantity < 100) setOrder({ ...order, quantity: order.quantity + 1 })
                                                }} className="hover:cursor-pointer hover:scale-110 transition-all duration-200">
                                                    <img src={add} alt="more" className="w-4 h-4 md:w-6 md:h-6" />
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={addToCart} className="flex justify-center items-center text-[10px] w-30 h-8 md:w-[248px] md:h-[44px] font-inter md:text-sm text-neutral-w-900 bg-neutral-b-900 mt-10 rounded-sm hover:cursor-pointer hover:scale-110 transition-all duration-200">
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
                    <button onClick={flipCard} className={`ml-2 ${isFlipped ? 'flex' : 'invisible'} border-2 border-neutral-b-200 rounded-full`}>
                        <img src={chevron} alt="flip card" className="w-[24px] h-[24px] rotate-180 hover:scale-110 transition-all" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
