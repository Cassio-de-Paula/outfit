import CustomRange from '../components/CustomRange'
import check from '../assets/Check.png'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { ProductService } from '../services/productServices'
import x from '../assets/X.png'
import search from '../assets/Search.png'
import left from '../assets/Chevron Left.png'
import right from '../assets/Chevron Right.png'
import Loading from '../components/Loading'
import ProductGrid from '../components/ProductGrid'
import BreadCrumbs from '../components/Breadcrumbs'
import ErrorMessage from '../components/ErrorMessage'
import { useSetBreadcrumbs } from '../utils/setBreadcrumbs'
import { useScreenMode } from '../store/hooks/darkModeHooks'


const Listing = () => {
    const { mode } = useScreenMode()
    const setBreadcrumb = useSetBreadcrumbs()
    const [filters, setFilters] = useState<string[]>([])
    const [price, setPrice] = useState<number>(50)
    const [queryName, setQueryName] = useState<string>('')
    const [filterByPrice, setFilterByPrice] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [productsErrorMessage, setProductsErrorMessage] = useState<string>('')

    const addFilter = (value: string) => {
        setFilters((prevState) => [...prevState, value])
    }

    const removeFilter = (value: string) => {
        const newFilters = filters.filter((filter) => filter !== value)

        setFilters(newFilters)
    }

    const fetchProducts = async () => {
        try {
            const res = await ProductService.getByFilters(page, filters, filterByPrice ? price : undefined, queryName)

            if (typeof res === 'string') throw new Error(res)

            setProducts(res)
        } catch (error) {
            if (error instanceof Error) setProductsErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const nextPage = () => {
        if (page) setPage((prevState) => prevState + 1)
    }

    const previousPage = () => {
        if (page > 1) setPage((prevState) => prevState - 1)
    }

    useEffect(() => {
        setProductsErrorMessage('')
        fetchProducts()
    }, [filters, queryName, filterByPrice, page])

    useEffect(() => {
        setBreadcrumb({ label: 'products', path: '/products' })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    return (
        <main className={`${mode} w-full`}>
            <section className="bg-neutral-w-100 dark:bg-neutral-b-700 dark:**:text-neutral-w-900 min-w-screen flex min-h-[64px] items-center pl-[11%] **:text-[10px] min-[1024px]:**:text-sm align-middle">
                <BreadCrumbs />
            </section>
            <section className='flex flex-col dark:bg-neutral-b-800 dark:**:text-neutral-w-900 min-w-full pt-8 px-0 lg:px-[75px] min-[560px]:items-start min-[1260px]:flex-row min-[1440px]:px-[172px] pb-[128px] h-max max-h-max'>
                <div className='w-full px-[20px] min-[1260px]:min-h-[535px] min-[1260px]:w-[18vw] min-[1260px]:aspect-[2.15725] min-[1260px]:max-h-[535px] min-[1260px]:max-w-[248px]'>
                    <aside className='flex w-full max-h-full flex-col items-start border-[1px] border-neutral-w-100 pl-[18px] pr-[14px] pt-[24px] pb-[32px] rounded-md min-h-[173px]'>
                        <div className='flex flex-col **:text-[10px] lg:**:text-sm'>
                            <h3 className='font-inter font-medium text-sm text-neutral-b-900'>
                                Categories
                            </h3>
                            <ul className='flex flex-row flex-wrap justify-center gap-2.5 min-[1260px]:flex-col mt-4'>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="perfume" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Perfume')}
                                            type="checkbox"
                                            value={'Perfume'}
                                            name="perfume"
                                            id="perfume"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="w-4 h-4 opacity-0 peer-checked:opacity-100" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Perfume</p>
                                </li>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="trousers" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Trousers')}
                                            type="checkbox"
                                            value={'Trousers'}
                                            name="trousers"
                                            id="trousers"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="opacity-0 peer-checked:opacity-100" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Trousers</p>
                                </li>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="shoe" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Shoe')}
                                            type="checkbox"
                                            value={'Shoe'}
                                            name="shoe"
                                            id="shoe"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="opacity-0 peer-checked:opacity-100" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Shoe</p>
                                </li>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="handbag" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Handbag')}
                                            type="checkbox"
                                            value={'Handbag'}
                                            name="handbag"
                                            id="handbag"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="opacity-0 peer-checked:opacity-100" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Handbag</p>
                                </li>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="hat" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Hat')}
                                            type="checkbox"
                                            value={'Hat'}
                                            name="hat"
                                            id="hat"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="opacity-0 peer-checked:opacity-100" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Hat</p>
                                </li>
                                <li className='flex min-[1260px]:border-b-[1px] min-[1260px]:border-neutral-b-100 py-3 px-1 gap-[10px]'>
                                    <label htmlFor="thermos" className='flex items-center hover:cursor-pointer justify-center w-[18px] h-[18px] border-[1px] border-neutral-b-100'>
                                        <input
                                            onChange={(e) => {
                                                if (e.target.checked) addFilter(e.target.value)
                                                else removeFilter(e.target.value)
                                            }}
                                            checked={filters.includes('Thermos')}
                                            type="checkbox"
                                            value={'Thermos'}
                                            name="thermos"
                                            id="thermos"
                                            className='hidden peer' />
                                        <img src={check} alt="" className="hidden peer-checked:block w-4 h-4" />
                                    </label>
                                    <p className='font-inter font-normal text-sm text-neutral-b-600'>Thermos</p>
                                </li>
                            </ul>
                        </div>
                        <div className='mt-4 min-h-[60px] min-[1260px]:mt-[40px] flex flex-row min-[1260px]:flex-col min-[1260px]:min-h-[104px] gap-[24px]'>
                            <h3 className='font-inter font-medium text-sm text-neutral-b-900 text-[10px] lg:text-sm'>
                                Price
                            </h3>
                            <CustomRange
                                value={price}
                                setValue={(value) => {
                                    setPrice(value)
                                    setFilterByPrice(true)
                                }}
                                search={fetchProducts}
                            />
                        </div>
                    </aside>
                </div>
                <div className='flex flex-col w-[100%] min-h-[535px]'>
                    <div className='flex flex-col items-center min-[1243px]:flex-row min-[1243px]:items-start justify-between'>
                        <div className='mx-[20px] min-[1260px]:ml-[31px] mt-2 flex flex-col items-center **:text-[10px] min-[1260px]:**:text-sm min-[1260px]:items-start gap-3 md:max-w-[350px]'>
                            <p className='font-inter text-sm font-normal text-neutral-b-900'>
                                Applied Filters:
                            </p>
                            <div className='flex flex-wrap gap-3 justify-center'>
                                {
                                    filters.map((filter) => (
                                        <p className='flex min-w-max items-center gap-2 font-inter text-neutral-b-900 text-xs/[24px] font-medium py-0.5 px-2 rounded-[100px] border-[1px] border-neutral-b-100'>
                                            {filter} <img src={x} alt="X" onClick={() => removeFilter(filter)} className='hover:cursor-pointer' />
                                        </p>
                                    ))
                                }
                                {
                                    filterByPrice ? (
                                        <p className='flex min-w-max min-h-9 items-center gap-2 font-inter text-neutral-b-900 text-xs/[24px] font-medium py-0.5 px-4 rounded-[100px] border-[1px] border-neutral-b-100'>
                                            $ {price}.00
                                            <img
                                                src={x}
                                                alt="X"
                                                onClick={() => {
                                                    setFilterByPrice(false)
                                                    fetchProducts()
                                                }}
                                                className='hover:cursor-pointer' />
                                        </p>
                                    ) : (<></>)
                                }
                                {
                                    queryName !== '' ? (
                                        <p className='flex min-w-max items-center gap-2 font-inter text-neutral-b-900 text-xs/[24px] font-medium py-0.5 px-2 rounded-[100px] border-[1px] border-neutral-b-100'>
                                            {queryName} <img src={x} alt="X" onClick={() => setQueryName('')} className='hover:cursor-pointer' />
                                        </p>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                        <div className='max-w-[264px] w-max h-max mt-[36px] py-[6px] px-[8px] min-[1260px]:py-[10px] min-[1260px]:px-[15px] max-h-[45px] border-[1px] border-neutral-b-100 rounded-md'>
                            <div className='flex gap-1 min-[1260px]:gap-2'>
                                <img src={search} alt="" className='w-[16px] min-[1260px]:w-[24px] aspect-square' />
                                <input type="text" onBlur={fetchProducts} onChange={(e) => setQueryName(e.target.value)} value={queryName} placeholder='Search products' className='border-none font-inter text-[10px] placeholder:text-[10px] min-[1260px]:text-sm text-neutral-b-300 font-normal focus:outline-none placeholder:font-inter min-[1260px]:placeholder:text-sm placeholder:text-neutral-b-300 placeholder:font-normal' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center w-[100%] grow justify-evenly'>
                        <div className='flex flex-col items-center min-[1260px]:items-start w-full min-[1260px]:gap-4 min-[1260px]:ml-[21px]'>
                            {
                                isLoading ? (
                                    <Loading />
                                ) : productsErrorMessage === '' ? (
                                    <div className='flex flex-col min-[1260px]:items-start items-center min-w-full'>
                                        <p className='text-[10px] text-start w-full ml-[29px] mt-[24px] min-h-[24px] font-inter min-[1260px]:text-sm font-medium text-neutral-b-500'>
                                            Showing {products.length === 0 ? 0 : 1 + (page - 1) * 9} - {Math.min(products.length, 9 * page)} from {products.length} Results.
                                        </p>
                                        <ProductGrid filteredProducts={products} page={page} />
                                    </div>
                                ) : (
                                    <div className='w-full h-full'>
                                        <ErrorMessage message={productsErrorMessage} />
                                    </div>
                                )
                            }
                        </div>
                        <div className='flex w-[18.4466%] aspect-[3.454545] max-w-[152px] max-h-[44px] min-h-[22px] min-w- px-2 py-1 mt-6 justify-between items-center border-[1px] border-neutral-b-100 rounded-sm '>
                            <button className='hover:cursor-pointer disabled:invisible' disabled={page === 1} onClick={previousPage}>
                                <img src={left} alt="left" />
                            </button>
                            <p className='rounded-sm flex text-[8px] dark:bg-neutral-b-700 justify-center items-center bg-neutral-w-100 font-inter text-neutral-b-900 min-[770px]:text-xs font-medium max-w-[40px] w-full h-full'>
                                {page}
                            </p>
                            <button className='hover:cursor-pointer disabled:invisible' disabled={page === Math.ceil(products.length / 9) || products.length <= 9} onClick={nextPage}>
                                <img src={right} alt="right" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Listing