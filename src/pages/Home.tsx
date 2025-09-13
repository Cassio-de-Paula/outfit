import model from '../assets/Hero Image.png'
import burst from '../assets/Burst-pucker.png'
import truck from '../assets/truck.png'
import medal from '../assets/medal.png'
import shield from '../assets/shield.png'
import BlackButton from '../components/BlackButton.tsx'
import clothe from '../assets/Category Image.png'
import FeaturedProducts from '../components/FeaturedProducts.tsx'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product.tsx'
import { ProductService } from '../services/productServices.ts'
import Loading from '../components/Loading.tsx'
import ErrorMessage from '../components/ErrorMessage.tsx'
import { useSetBreadcrumbs } from '../utils/setBreadcrumbs.ts'
import { useScreenMode } from '../store/hooks/darkModeHooks.ts'

const Home = () => {
    const { mode } = useScreenMode()
    const setBreadcrumb = useSetBreadcrumbs()
    const [bestSelling, setBestSelling] = useState<Product[]>([])
    const [onOffer, setOnOffer] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [offerErrorMessage, setOfferErrorMessage] = useState<string>('')
    const [bestSellingErrorMessage, setBestSellingErrorMessage] = useState<string>('')

    const fetchProducts = async () => {
        const res = await Promise.all([
            ProductService.getBestSelling(),
            ProductService.getOffers()
        ])

        if (typeof res[0] !== 'string') {
            setBestSelling(res[0])
        } else {
            setBestSellingErrorMessage('An error ocurred when trying to get best selling products, try again later')
        }

        if (typeof res[1] !== 'string') {
            setOnOffer(res[1])
        } else {
            setOfferErrorMessage('An error ocurred when trying to get products on offer, try again later')
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchProducts()
        setBreadcrumb({ label: 'Outfit', path: '/' })
    }, [])

    return (
        <main className={`${mode} min-w-screen min-h-screen dark:bg-neutral-b-800`}>
            <section className="flex flex-col max-h-[685px] items-center p-0 h-[730px] bg-neutral-w-100 w-full md:h-[440px] md:flex-row md:px-[65px] lg:pl-[182px] lg:pr-[174px] md:justify-between min-[1024px]:flex min-[1024px]:justify-between dark:bg-neutral-b-700 dark:**:text-neutral-w-900">
                <div className='flex flex-col items-center md:min-w-[300px] md:items-start'>
                    <h2 className="font-inter text-center font-semibold text-[32px] text-neutral-b-800 mt-[138px] leading-[100%] md:text-start">
                        Fresh Arrivals Online
                    </h2>
                    <p className="font-inter text-center text-sm font-normal text-neutral-b-600 mt-3 md:text-start">
                        Discover Our Newest Collection Today.
                    </p>
                    <BlackButton text='View Collection' breadCrumbLabel='products' />
                </div>
                <div className='rounded-full bg-neutral-w-200 w-[250px] h-[250px] top-[135px] md:w-[340px] md:h-[340px] md:top-[50px] relative'>
                    <img src={burst} alt="Burst-pucker" />
                    <img src={model} alt="model-with-white-t-shirt" className='z-20 relative -top-20 left-[50px] w-[200px] h-[300px] md:w-[255px] md:h-[382px] md:-top-20 md:left-[75px]' />
                </div>
            </section>
            <section className='pt-[88px] pb-[72px] px-[32px] min-w-screen md:min-h-[266px] md:px-[174px] dark:**:text-neutral-w-900'>
                <div className='flex flex-wrap justify-center md:gap-[54px]'>
                    <span className='justify-center my-4 items-center md:min-w-[150px] flex flex-col min-[1274px]:items-start'>
                        <div className='bg-neutral-w-100 w-12 h-12 rounded-full flex justify-center items-center'>
                            <img src={truck} alt="free-shipping" />
                        </div>
                        <h5 className='text-center text-neutral-b-800 text-base font-inter font-semibold mt-6 min-[1274px]:text-start'>
                            Free Shipping
                        </h5>
                        <p className='text-center font-inter font-medium text-sm text-neutral-b-500 max-w-[272px] mt-3 min-[1274px]:text-start'>
                            Upgrade your style today and get FREE shipping on all orders! Don't miss out.
                        </p>
                    </span>
                    <span className='justify-center my-4 items-center md:min-w-[150px] flex flex-col min-[1274px]:items-start'>
                        <div className='bg-neutral-w-100 w-12 h-12 rounded-full flex justify-center items-center'>
                            <img src={medal} alt="satisfaction-guarantee" />
                        </div>
                        <h5 className='text-center text-neutral-b-800 text-base font-inter font-semibold mt-6 min-[1274px]:text-start'>
                            Satisfaction Guarantee
                        </h5>
                        <p className='text-center font-inter font-medium text-sm text-neutral-b-500 max-w-[272px] mt-3 min-[1274px]:text-start'>
                            Shop confidently with our Satisfaction Guarantee: Love it or get a refund.
                        </p>
                    </span>
                    <span className='justify-center my-4 items-center md:min-w-[150px] flex flex-col min-[1274px]:items-start'>
                        <div className='bg-neutral-w-100 w-12 h-12 rounded-full flex justify-center items-center'>
                            <img src={shield} alt="safe-payment" />
                        </div>
                        <h5 className='text-center text-neutral-b-800 text-base font-inter font-semibold mt-6 min-[1274px]:text-start'>
                            Secure Payment
                        </h5>
                        <p className='text-center font-inter font-medium text-sm text-neutral-b-500 max-w-[272px] mt-3 min-[1274px]:text-start'>
                            Your security is our priority. Your payments are secure with us.
                        </p>
                    </span>
                </div>
            </section>
            <section className='flex flex-col px-8 pt-[72px] min-h-[568px] mb-[168px] min-[1260px]:px-[174px]'>
                <div className='flex w-full justify-center mb-[80px]'>
                    <h3 className='flex flex-col gap-2 font-inter text-neutral-b-900 text-2xl text-start font-bold dark:text-neutral-w-900'>
                        <p className='text-xs font-medium text-neutral-b-300 font-inter uppercase text-start w-[71px]'>Shop now</p>
                        Best Selling
                    </h3>
                </div>
                {
                    isLoading ? (
                        <Loading />
                    ) : bestSellingErrorMessage === '' ? (
                        <FeaturedProducts featuredProducts={bestSelling} />
                    ) : (
                        <ErrorMessage message={bestSellingErrorMessage} />
                    )
                }
            </section>
            <section className='flex flex-col justify-center min-h-[304px] pl-[100px] pr-[100px] bg-neutral-b-100 dark:bg-neutral-b-700 md:flex-row md:justify-between min-[1024px]:pr-[213px] min-[1024px]:pl-[174px]'>
                <div className='flex flex-col items-center mt-[52px] md:items-start dark:**:text-neutral-w-900'>
                    <h3 className='font-inter font-bold text-2xl text-center text-neutral-b-900 md:text-start'>
                        Browse Our Fashion Paradise!
                    </h3>
                    <p className='font-normal font-inter text-sm text-center text-neutral-b-500 max-w-[462px] mt-[24px] md:text-start'>
                        Step into a world of style and explore our diverse collection of clothing categories.
                    </p>
                    <BlackButton text='Start Browsing' breadCrumbLabel='products' />
                </div>
                <div className='flex justify-center items-center'>
                    <img src={clothe} alt="start-browsing" className='max-w-[225px] max-h-[311px] mt-8 md:mt-0' />
                </div>
            </section>
            <section className='flex flex-col px-8 pt-[152px] mb-[192px] min-[896px]:px-[162px] dark:**:text-neutral-w-900'>
                <div className='flex w-full justify-center items-center mb-[80px]'>
                    <h3 className='flex flex-col gap-2 border-[1px] border-neutral-b-100 rounded-[100px] py-[3px] px-4 font-inter text-neutral-b-900 text-sm  text-start font-medium'>
                        On Offer
                    </h3>
                </div>
                {
                    isLoading ? (
                        <Loading />
                    ) : offerErrorMessage === '' ? (
                        <FeaturedProducts featuredProducts={onOffer} />
                    ) : (
                        <ErrorMessage message={offerErrorMessage} />
                    )
                }
            </section>
        </main>
    )
}

export default Home