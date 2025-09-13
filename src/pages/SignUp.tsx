import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { useRemoveBreadcrumbs } from "../store/hooks/breadcrumbHooks"
import { useEffect, useState } from "react"
import { useSignUp } from "@clerk/clerk-react"
import { toast, ToastContainer } from "react-toastify"
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors"
import x from '../assets/X.png'
import eye from '../assets/eye.png'
import blockedEye from '../assets/blocked-eye.png'
import GoogleButton from "../components/GoogleButton"
import { OutletContextType } from "./Auth"

interface Register {
    fullName: string
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const { setCurrentChildrenTitle } = useOutletContext<OutletContextType>(); // Acessa o contexto do Outlet

    const redirect = useNavigate()
    const { isLoaded, signUp, setActive } = useSignUp();
    const remove = useRemoveBreadcrumbs()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>('')
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false)
    const [codeError, setCodeError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<Register>({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Register>({
        confirmPassword: '',
        email: '',
        fullName: '',
        password: ''
    })

    const validateInput = (key: keyof Register, value: string): string => {
        const regexFullName = /^(?=\S{2,}\s\S{2,}).{5,}$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        switch (key) {
            case 'fullName':
                return regexFullName.test(value) ? '' : 'Fullname needs at least two words with two characters each';
            case 'email':
                return regexEmail.test(value) ? '' : 'Insert a valid email';
            case 'password':
                return regexPassword.test(value) ? '' : 'Password must be at least 8 characters, including one uppercase letter, one number, and one special character';
            case 'confirmPassword':
                return value === formData.password ? '' : "Password and confirmation don't match";
            default:
                return '';
        }
    };

    const validateAllInputs = (): boolean => {
        const newErrors: Register = {
            fullName: validateInput('fullName', formData.fullName),
            email: validateInput('email', formData.email),
            password: validateInput('password', formData.password),
            confirmPassword: validateInput('confirmPassword', formData.confirmPassword),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateAllInputs()) {
            try {
                if (isLoaded) {
                    setIsLoading(true);

                    await toast.promise(
                        signUp.create({
                            firstName: formData.fullName.split(' ')[0],
                            lastName: formData.fullName.split(' ')[1],
                            emailAddress: formData.email,
                            password: formData.password,
                        }),
                        {
                            pending: "Creating your account...",
                            success: "Account successfully created! A message was sent to confirm your email address.",
                        },
                        {
                            autoClose: 3000,
                            position: "bottom-center",
                        }
                    );

                    setFormData({
                        confirmPassword: '',
                        email: '',
                        fullName: '',
                        password: ''
                    });

                    setErrors({
                        confirmPassword: '',
                        email: '',
                        fullName: '',
                        password: ''
                    });

                    setIsLoading(false);

                    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                    setModalOpen(true);
                }
            } catch (err) {
                if (isClerkAPIResponseError(err)) {
                    toast.error(err.errors[0].message, {
                        autoClose: 3000,
                        position: "bottom-center",
                    });
                }
            } finally {
                setIsLoading(false)
            }
        }
    };

    const verifyCode = async () => {
        if (!isLoaded) return

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                setModalOpen(false)
                remove(0)
                redirect('/')
            }
        } catch (err) {
            if (isClerkAPIResponseError(err)) setCodeError(err.errors[0].longMessage ?? err.errors[0].message)
        }
    }

    useEffect(() => {
        setCurrentChildrenTitle('Register')
    }, [])

    return (
        <>
            <ToastContainer />
            <section className="flex grow min-h-screen items-center justify-center min-[890px]:flex-row w-full px-6 min-[1083px]:px-[12%] dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
                <form className="flex flex-col items-center gap-4 max-w-[320px] w-full mt-[128px] mb-[160px]" onSubmit={handleRegister}>
                    <GoogleButton />
                    <span className="flex items-center w-full max-w-[320px]">
                        <hr className="w-1/2 border-[1px] border-neutral-b-100" />
                        <p className="m-3 font-inter font-medium text-xs text-neutral-b-500">OR</p>
                        <hr className="w-1/2 border-[1px] border-neutral-b-100" />
                    </span>
                    <label htmlFor="fullname" className="flex flex-col w-full items-center font-inter text-sm font-medium text-neutral-b-600 **:max-w-[320px]">
                        <p className="w-full text-start">Name</p>
                        <input
                            type="text"
                            disabled={isLoading}
                            id="fullname"
                            value={formData.fullName}
                            className={`w-full border-[1px] ${errors.fullName === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 focus:outline-none rounded-sm`}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            onBlur={() => setErrors({ ...errors, fullName: validateInput('fullName', formData.fullName) })}
                        />
                        {
                            errors.fullName !== '' ? (
                                <p className="font-inter w-full font-medium text-[10px] text-red-500-sem">{errors.fullName}</p>
                            ) : (
                                <></>
                            )
                        }
                    </label>
                    <label htmlFor="email" className="flex flex-col w-full items-center font-inter text-sm font-medium text-neutral-b-600 **:max-w-[320px]">
                        <p className="w-full text-start">Email</p>
                        <input
                            type="text"
                            disabled={isLoading}
                            id="email"
                            value={formData.email}
                            className={`w-full border-[1px] ${errors.email === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 focus:outline-none rounded-sm`}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onBlur={() => setErrors({ ...errors, email: validateInput('email', formData.email) })}
                        />
                        {
                            errors.email !== '' ? (
                                <p className="font-inter w-full font-medium text-[10px] text-red-500-sem">{errors.email}</p>
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
                                onBlur={() => setErrors({ ...errors, password: validateInput('password', formData.password) })}
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
                    <label htmlFor="confirmPassword" className="flex flex-col w-full items-center font-inter text-sm font-medium text-neutral-b-600">
                        <p className="w-full text-start">Confirm Password</p>
                        <span className={`flex items-center justify-between gap-2.5 w-full max-w-[320px] border-[1px] ${errors.confirmPassword === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 rounded-sm`}>
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                disabled={isLoading}
                                value={formData.confirmPassword}
                                className={`focus:outline-none`}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                onBlur={() => setErrors({ ...errors, confirmPassword: validateInput('confirmPassword', formData.confirmPassword) })}
                            />
                            <img src={confirmPasswordVisible ? blockedEye : eye} alt="" className="w-5 h-5 custom-hover" onClick={() => setConfirmPasswordVisible((prevState) => !prevState)} />
                        </span>
                        {
                            errors.confirmPassword !== '' ? (
                                <p className="font-inter w-full font-medium text-[10px] text-red-500-sem">{errors.confirmPassword}</p>
                            ) : (
                                <></>
                            )
                        }
                    </label>
                    <button type="submit" disabled={isLoading} className={`${isLoading ? 'bg-neutral-b-300' : 'bg-neutral-b-900'} custom-hover w-full py-[10px] rounded-sm mt-6 font-inter font-medium text-sm text-neutral-w-900 max-w-[320px]`}>
                        Register
                    </button>
                    <p className="font-inter font-normal text-sm text-neutral-b-500 mt-6 text-center w-full">
                        Already have an account?
                        <Link to={'/auth/login'} className="pl-1 font-inter font-normal text-sm text-neutral-b-500">Sign In</Link>
                    </p>
                </form>
            </section>
            {
                modalOpen && !isLoading ? (
                    <section className="fixed flex justify-center items-center top-0 min-w-screen min-h-screen bg-neutral-b-900/30">
                        <div className="flex flex-col items-center bg-neutral-w-900 w-[30%] rounded-lg h-full opacity-100 p-3.5">
                            <img src={x} alt="x" className="ml-auto" />
                            <h3 className="font-inter font-semibold text-3xl text-neutral-b-900 text-center">
                                Confirm your email
                            </h3>
                            <p className="font-inter font-medium text-sm text-neutral-b-500 text-center mt-5">Insert the verification code sent to the registered email</p>
                            <label htmlFor="" className="w-full">
                                <input
                                    type="code"
                                    className="w-full border-[1px] text-center text-2xl font-bold tracking-[8px] border-neutral-b-100 mt-8 aspect-[7.11111] px-3 focus:outline-none rounded-sm"
                                    onChange={(e) => {
                                        if (!isNaN(Number(e.target.value))) setCode(e.target.value)
                                    }}
                                />
                                {
                                    codeError !== '' ? (
                                        <p className="font-inter font-medium text-[10px] text-red-500-sem">{codeError}</p>
                                    ) : (
                                        <></>
                                    )
                                }
                            </label>
                            <div id="clerk-captcha"></div>
                            <button onClick={verifyCode} className="custom-hover bg-neutral-b-900 w-1/2 py-[10px] rounded-sm mt-6 font-inter font-medium text-sm text-neutral-w-900">Verify code</button>
                        </div>
                    </section>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default SignUp