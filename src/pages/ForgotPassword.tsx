import { useSignIn, useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { OutletContextType } from "./Auth"
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors"

interface RecoverAccount {
    email: string
}

const ForgotPassword = () => {
    const { setCurrentChildrenTitle } = useOutletContext<OutletContextType>(); // Acessa o contexto do Outlet

    const { isSignedIn } = useUser()
    const { signIn } = useSignIn()
    const redirect = useNavigate()
    const [formData, setFormData] = useState<RecoverAccount>({
        email: ''
    })
    const [errors, setErrors] = useState<RecoverAccount>({
        email: ''
    })

    const handleRecover = async () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexEmail.test(formData.email)) {
            setErrors({ email: 'You must send a valid email' });
        } else {
            try {
                if (signIn) {
                    await toast.promise(
                        signIn!.create({
                            strategy: 'reset_password_email_code',
                            identifier: formData.email,
                        }),
                        {
                            // Toast exibido enquanto a promise está pendente
                            pending: "Sending recovery email...",

                            // Toast exibido se a promise for bem-sucedida
                            success: "A recovery email has been sent! 🎉",
                        },
                        {
                            autoClose: 3000,
                            position: "bottom-center",
                        }
                    );
                }

                redirect(`/auth/reset-password`);
            } catch (err) {
                if (isClerkAPIResponseError(err)) {
                    toast.error(err.errors[0].longMessage, { autoClose: 3000, position: 'bottom-center' });
                }
            }
        }
    };

    useEffect(() => {
        if (isSignedIn) redirect('/')

        setCurrentChildrenTitle('Forgot Password')
    }, [])

    return (
        <section className="flex grow items-center flex-col justify-center w-full px-6 min-[1083px]:px-[12%] gap-6 dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
            <ToastContainer />
            <div className="flex flex-col gap-6 max-w-[320px]">
                <p className="font-inter text-sm text-neutral-b-500 font-medium w-full">
                    Please enter the email address associated with your account. We'll promptly send you a link to reset your password.
                </p>
                <label htmlFor="email" className="w-full font-inter text-sm font-medium text-neutral-b-600">
                    Email
                    <input type="text" id="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-[1px] px-3 border-neutral-b-100 aspect-[7.11111]" />
                    {
                        errors.email !== '' ? (
                            <p className="font-inter font-medium text-[10px] text-red-500-sem">{errors.email}</p>
                        ) : (
                            <></>
                        )
                    }
                </label>
                <button onClick={handleRecover} className="bg-neutral-b-900 w-full py-[10px] rounded-sm mt-6 font-inter font-medium text-sm text-neutral-w-900">Send reset link</button>
            </div>
        </section>
    )
}

export default ForgotPassword