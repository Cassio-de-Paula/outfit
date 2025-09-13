import { useEffect, useState } from "react"
import OrderSummary from "../components/OrderSummary"
import { Link, useNavigate } from "react-router-dom"
import { useSetBreadcrumbs } from "../utils/setBreadcrumbs"
import { Address } from "../store/slices/shoppingCartSlice"
import { useResetCart, useSetAddress, useShoppingCart } from "../store/hooks/shoppingCartHooks"
import { useUser } from "@clerk/clerk-react"
import { Order } from "../types/Order"
import OrderService from "../services/orderService"
import { toast, ToastContainer } from "react-toastify"


const Checkout = () => {
    const { user, isSignedIn } = useUser()
    const { address, items, total } = useShoppingCart()
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false)
    const [fetchingOrder, setFetchingOrder] = useState<boolean>(false)
    const reset = useResetCart()
    const redirect = useNavigate()
    const setBreadcrumbs = useSetBreadcrumbs()
    const addAdress = useSetAddress()
    const [formData, setFormData] = useState<Address>({
        zipCode: '',
        city: '',
        country: '',
        state: '',
        streetAddress: ''
    })
    const [errors, setErrors] = useState({
        zipCode: '',
        city: '',
        country: '',
        state: '',
        streetAddress: ''
    })

    const fetchAddress = async () => {
        try {
            setLoadingAddress(true)
            const res = await fetch(`https://viacep.com.br/ws/${formData.zipCode}/json/`)

            if (!res.ok) throw new Error('Ocorreu um erro ao buscar o endereço, digite os dados restantes manualmente.')

            const addressData = await res.json()

            setFormData(prev => ({
                ...prev,
                city: addressData.localidade || prev.city,
                state: addressData.uf || prev.state,
                streetAddress: `${addressData.logradouro}${addressData.complemento ? `, ${addressData.complemento}` : ''}`,
                country: 'Brasil'
            }));

            toast.success('Address loaded!', { position: 'bottom-center' })
        } catch (error) {
            if (error instanceof Error) toast.error(error.message, { autoClose: 3000, position: 'bottom-center' })
        } finally {
            setLoadingAddress(false)
        }
    }

    const validateForm = (): boolean => {
        const newErrors = { ...errors };

        Object.keys(formData).forEach((key) => {
            const field = key as keyof Address;

            if (formData[field] === '') {
                newErrors[field] = 'Este campo é obrigatório';
            } else if (field === 'streetAddress' && !/\d/.test(formData[field])) {
                newErrors[field] = 'Insira o número da residência';
            } else {
                newErrors[field] = '';
            }
        });

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '')
    };

    const setOrderAddress = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        addAdress(formData);

        if (isSignedIn && user) {

            const order: Order = {
                userId: user.id,
                items: items,
                total: total,
                createdAt: new Date()
            }

            setFetchingOrder(true)

            try {
                const res = await OrderService.create(order)

                if (typeof res === 'string') throw Error(res)
                
                reset()
                redirect(`${res.id}`, { state: res.id });
            } catch (error) {
                if (error instanceof Error) toast.error(error.message, { autoClose: 3000 })
            } finally {
                setFetchingOrder(false)
            }
        } else {
            redirect('/auth/login')
        }
    };

    const validateInput = (key: keyof Address) => {
        const regexTest = /\d/

        if (key === 'streetAddress') {
            if (formData.streetAddress === '') {
                return 'Este campo é obrigatório'
            } else if (!regexTest.test(formData.streetAddress)) {
                return 'Insira o número da residência'
            } else {
                return ''
            }
        } else {
            if (formData[key] === '') return 'Este campo é obrigatório'

            return ''
        }
    }

    useEffect(() => {
        if (address) setFormData(address)
        setBreadcrumbs({ label: 'Checkout', path: '/cart/checkout' })
    }, [])

    return (
        <>
            <form onSubmit={setOrderAddress} className="flex w-full justify-between">
                <div className="flex flex-col w-full h-full max-w-[534px] mb-[203px] mt-8 min-[890px]:mt-[72px]">
                    <ToastContainer />
                    <h3 className="font-inter text-sm text-neutral-b-900 font-semibold">Shipping Address</h3>
                    <div className="flex flex-col gap-4 mt-16 w-full items-center">
                        <div className="flex flex-col w-full gap-4 min-[450px]:flex-row min-[450px]:items-center">
                            <label htmlFor="zipcode" className={`flex w-full min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                Zip code
                                <input type="text" id="zipcode"
                                    onChange={(e) => {
                                        setFormData({ ...formData, zipCode: e.target.value })
                                    }}
                                    onBlur={() => {
                                        setErrors({ ...errors, zipCode: validateInput('zipCode') })
                                        fetchAddress()
                                    }}
                                    value={formData.zipCode}
                                    className={`border-[1px] text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px] ${errors.zipCode ? 'border-red-600' : 'border-neutral-b-100'}`}
                                />
                                {
                                    errors.zipCode ? (
                                        <p className="text-red-500-sem text-sm font-inter font-medium">{errors.zipCode}</p>
                                    ) : (<></>)
                                }
                            </label>
                            <label htmlFor="country" className={`flex w-full min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                Country
                                <input type="text" disabled={loadingAddress} id="country"
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    onBlur={() => {
                                        setErrors({ ...errors, country: validateInput('country') })
                                    }}
                                    value={formData.country}
                                    readOnly
                                    className={`border-[1px] text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px] ${errors.country ? 'border-red-600' : 'border-neutral-b-100'}`}
                                />
                                {
                                    errors.country ? (
                                        <p className="text-red-500-sem text-sm font-inter font-medium">{errors.country}</p>
                                    ) : (<></>)
                                }
                            </label>
                        </div>
                        <div className="flex flex-col items-start w-full gap-4 min-[450px]:flex-row min-[450px]:items-center">
                            <label htmlFor="city" className={`flex w-full min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                City
                                <input type="text" disabled={loadingAddress} id="city"
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    onBlur={() => {
                                        setErrors({ ...errors, city: validateInput('city') })
                                    }}
                                    value={formData.city}
                                    className={`border-[1px] text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px] ${errors.city ? 'border-red-600' : 'border-neutral-b-100'}`}
                                />
                                {
                                    errors.city ? (
                                        <p className="text-red-500-sem text-sm font-inter font-medium">{errors.city}</p>
                                    ) : (<></>)
                                }
                            </label>
                            <label htmlFor="state" className={`flex w-full min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                State
                                <input type="text" disabled={loadingAddress} id="state"
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    onBlur={() => {
                                        setErrors({ ...errors, state: validateInput('state') })
                                    }}
                                    value={formData.state}
                                    className={`border-[1px] text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px] ${errors.state ? 'border-red-600' : 'border-neutral-b-100'}`}
                                />
                                {
                                    errors.state ? (
                                        <p className="text-red-500-sem text-sm font-inter font-medium">{errors.state}</p>
                                    ) : (<></>)
                                }
                            </label>
                        </div>
                        <label htmlFor="street" className="flex w-full flex-col font-inter font-medium text-sm text-neutral-b-600">
                            Street Address
                            <input type="text" disabled={loadingAddress} id="street"
                                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                onBlur={() => {
                                    setErrors({ ...errors, streetAddress: validateInput('streetAddress') })
                                }}
                                value={formData.streetAddress}
                                className={`border-[1px] text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px] ${errors.streetAddress ? 'border-red-600' : 'border-neutral-b-100'}`}
                            />
                            {
                                errors.streetAddress ? (
                                    <p className="text-red-500-sem text-sm font-inter font-medium">{errors.streetAddress}</p>
                                ) : (<></>)
                            }
                        </label>
                        <div className="mt-[51px] flex-col flex w-full justify-center min-[450px]:flex-row min-[450px]:items-center gap-4 mb-8">
                            {
                                isSignedIn ? (
                                    <>
                                        <label htmlFor="email" className={`flex min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                            Email
                                            <input type="text" id="email" value={user ? user.primaryEmailAddress?.emailAddress : ''} className="border-[1px] border-neutral-b-100 text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px]" />
                                        </label>
                                        <label htmlFor="fullname" className={`flex min-[450px]:w-[50%] min-[450px]:min-w-[45%] max-w-[259px] flex-col font-inter font-medium text-sm text-neutral-b-600`}>
                                            Fullname
                                            <input type="text" id="fullname" value={user!.fullName!} className="border-[1px] border-neutral-b-100 text-sm py-[5%] px-[7.5%] rounded-md max-h-[45px]" />
                                        </label>
                                    </>
                                ) : (
                                    <p className="font-inter text-[10px] text-neutral-b-500 font-medium text-center">
                                        To complete this order you need to be signed in, click in place order to be redirected to login page.<br />
                                        PS: Don't worry about your shopping cart, it will be safe and sound after your authentication :)
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <aside className="flex flex-col py-8 min-[890px]:pl-16 min-[890px]:border-l-2 border-neutral-b-100 mt-[56px] w-full max-w-[341px]">
                    <h3 className="font-inter text-neutral-b-900 text-sm font-semibold">Order summary</h3>
                    <Link to={'/cart'} onClick={() => setBreadcrumbs({ label: 'Cart', path: '/cart' })} className="border-[1px] border-neutral-b-200 text-sm font-inter font-medium text-neutral-b-500 py-3 px-6 max-w-[107px] max-h-11 rounded-sm text-nowrap ml-auto mt-16">Edit Card</Link>
                    <OrderSummary buttonText="Place Order" type="submit" disabled={fetchingOrder} />
                </aside>
            </form>
        </>
    )
}

export default Checkout