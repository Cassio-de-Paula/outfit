import { Link, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSignIn } from "@clerk/clerk-react"
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors"
import { toast, ToastContainer } from "react-toastify"
import GoogleButton from "../components/GoogleButton"
import { OutletContextType } from "./Auth"
import eye from '../assets/eye.png'
import blockedEye from '../assets/blocked-eye.png'

interface Login {
    email: string
    password: string
}

const SignIn = () => {
    const { setCurrentChildrenTitle } = useOutletContext<OutletContextType>(); // Acessa o contexto do Outlet

    const { isLoaded, signIn, setActive } = useSignIn()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<Login>({
        email: '',
        password: ''
    })

    const validateForm = () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const newErrors = { ...errors }

        if (!regexEmail.test(formData.email)) newErrors.email = 'Insert a valid email'
        if (formData.password === '') newErrors.password = 'You must insert a password to sign in'

        setErrors(newErrors)
        return !Object.values(newErrors).some((error) => error !== '')
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            if (!isLoaded) throw new Error("Erro ao logar!");

            setIsLoading(true);

            await toast.promise(
                (async () => {
                    const { createdSessionId } = await signIn.create({
                        identifier: formData.email,
                        password: formData.password,
                    });

                    await setActive({ session: createdSessionId, redirectUrl: `/` });
                })(),
                {
                    pending: "Logging in...",
                    success: "Login successful! Redirecting...",
                },
                {
                    autoClose: 3000,
                    position: "bottom-center",
                }
            );

            setIsLoading(false);
        } catch (err) {
            if (isClerkAPIResponseError(err)) {
                toast.error(err.errors[0].longMessage ?? err.errors[0].message, {
                    autoClose: 3000,
                    position: "bottom-center",
                });
            }
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        setCurrentChildrenTitle('Login')
    }, [])

    return (
        <>
            <ToastContainer />
            <section className="flex grow items-center justify-center min-[890px]:flex-row w-full px-6 min-[1083px]:px-[12%] gap-[8%] dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                <form className="flex flex-col max-w-[320px] w-full gap-4 mt-[128px] mb-[286px]" onSubmit={handleLogin}>
                    <GoogleButton />
                    <span className="flex items-center w-full max-w-[320px]">
                        <hr className="w-1/2 border-[1px] border-neutral-b-100" />
                        <p className="m-3 font-inter font-medium text-xs text-neutral-b-500">OR</p>
                        <hr className="w-1/2 border-[1px] border-neutral-b-100" />
                    </span>
                    <label htmlFor="email" className="font-inter flex flex-col text-sm font-medium text-neutral-b-600 **:max-w-[320px]">
                        Email
                        <input type="text" id="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-[1px] px-3 border-neutral-b-100 aspect-[7.11111] rounded-sm" />
                        {
                            errors.email !== '' ? (
                                <p className="font-inter font-medium text-[10px] text-red-500-sem">{errors.email}</p>
                            ) : (
                                <></>
                            )
                        }
                    </label>
                    <label htmlFor="password" className="flex flex-col w-full items-center font-inter text-sm font-medium text-neutral-b-600">
                        <p className="w-full text-start">Password</p>
                        <span className={`flex items-center justify-between gap-2.5 w-full max-w-[320px] border-[1px] ${errors.password === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 rounded-sm`}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                disabled={isLoading}
                                value={formData.password}
                                className={`focus:outline-none`}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <img src={passwordVisible ? blockedEye : eye} alt="" className="w-5 h-5 custom-hover" onClick={() => setPasswordVisible((prevState) => !prevState)} />
                        </span>
                        {
                            errors.password !== '' ? (
                                <p className="font-inter w-full font-medium text-[10px] text-red-500-sem">{errors.password}</p>
                            ) : (
                                <></>
                            )
                        }
                    </label>
                    <Link to={'/auth/forgot-password'} className="w-full max-w-[320px] text-end font-inter font-medium text-sm text-neutral-b-600 mt-4">
                        Forgot your password?
                    </Link>
                    <button type="submit" disabled={isLoading} className="bg-neutral-b-900 custom-hover w-full max-w-[320px] disabled:bg-neutral-b-300 py-[10px] rounded-sm mt-6 font-inter font-medium text-sm text-neutral-w-900">
                        Login
                    </button>
                    <p className="font-inter font-normal text-sm text-neutral-b-500 mt-6 text-center w-full max-w-[320px]">
                        Don't have an account?
                        <Link to={'/auth/register'} className="pl-1 font-inter font-normal text-sm text-neutral-b-500">Sign Up</Link>
                    </p>
                </form>
            </section>
        </>
    )
}

export default SignIn