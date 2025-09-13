import { useAuth, useSignIn } from "@clerk/clerk-react"
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

interface Reset {
    code: string
    password: string
    confirmPassword: string
}

const ResetPassword = () => {
    const { signIn } = useSignIn()
    const { signOut } = useAuth()
    const [formData, setFormData] = useState<Reset>({
        code: '',
        confirmPassword: '',
        password: ''
    })
    const [errors, setErrors] = useState<Reset>({
        code: '',
        confirmPassword: '',
        password: ''
    })

    const validateInput = (key: keyof Reset, value: string): string => {
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        switch (key) {
            case 'code':
                return formData.code !== '' ? '' : 'Insert a valid code';
            case 'password':
                return regexPassword.test(value) ? '' : 'Password must be at least 8 characters, including one uppercase letter, one number, and one special character';
            case 'confirmPassword':
                return value === formData.password ? '' : "Password and confirmation don't match";
            default:
                return '';
        }
    };

    const validateAllInputs = (): boolean => {
        const newErrors: Reset = {
            code: validateInput('code', formData.code),
            password: validateInput('password', formData.password),
            confirmPassword: validateInput('confirmPassword', formData.confirmPassword),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    async function handleReset() {
        if (!validateAllInputs()) return;

        // Verifique se o `signIn` está definido
        if (!signIn) {
            toast.error("SignIn object is not available.", { autoClose: 3000 });
            return;
        }

        try {
            await toast.promise(
                signIn.attemptFirstFactor({
                    strategy: 'reset_password_email_code',
                    code: formData.code,
                    password: formData.password,
                }),
                {
                    pending: "Resetting password...",
                    success: "Password reset successfully! Redirecting... 🎉",
                },
                {
                    autoClose: 3000,
                    position: "bottom-center",
                }
            );

            await signOut({ redirectUrl: '/' })
        } catch (err) {
            // O erro será tratado dentro do toast.promise, mas, se houver erro fora da promise, aqui também o tratamos.
            if (isClerkAPIResponseError(err)) {
                toast.error(err.errors[0].longMessage, { autoClose: 3000, position: 'bottom-center' });
            }
        }
    }



    return (
        <section className="flex grow items-center flex-col justify-center w-full px-6 min-[1083px]:px-[12%] gap-6 dark:bg-neutral-b-800 dark:**:text-neutral-w-900">
            <ToastContainer />
            <div className="flex flex-col gap-6 max-w-[320px]">
                <label htmlFor="code" className="w-full font-inter text-sm font-medium text-neutral-b-600">
                    Code
                    <input
                        type="code"
                        className={`w-full border-[1px] text-center text-2xl font-bold tracking-[8px] border-neutral-b-100 aspect-[7.11111] px-3 focus:outline-none rounded-sm`}
                        onChange={(e) => {
                            if (!isNaN(Number(e.target.value))) setFormData({ ...formData, code: e.target.value })
                        }}
                    />
                    {
                        errors.code !== '' ? (
                            <p className="font-inter font-medium text-[10px] text-red-500-sem">{errors.code}</p>
                        ) : (
                            <></>
                        )
                    }                </label>
                <label htmlFor="password" className="w-full font-inter text-sm font-medium text-neutral-b-600">
                    Password
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        className={`w-full border-[1px] ${errors.password === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 focus:outline-none rounded-sm`}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onBlur={() => setErrors({ ...errors, password: validateInput('confirmPassword', formData.password) })}
                    />
                    {
                        errors.password !== '' ? (
                            <p className="font-inter font-medium text-[10px] text-red-500-sem">{errors.password}</p>
                        ) : (
                            <></>
                        )
                    }
                </label>
                <label htmlFor="confirmPassword" className="w-full font-inter text-sm font-medium text-neutral-b-600">
                    Confirm Password
                    <input
                        type="password"
                        id="password"
                        value={formData.confirmPassword}
                        className={`w-full border-[1px] ${errors.confirmPassword === '' ? 'border-neutral-b-100' : 'border-red-600'} aspect-[7.11111] px-3 focus:outline-none rounded-sm`}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        onBlur={() => setErrors({ ...errors, confirmPassword: validateInput('confirmPassword', formData.confirmPassword) })}
                    />
                    {
                        errors.confirmPassword !== '' ? (
                            <p className="font-inter font-medium text-[10px] text-red-500-sem">{errors.confirmPassword}</p>
                        ) : (
                            <></>
                        )
                    }
                </label>
                <button onClick={handleReset} className="bg-neutral-b-900 w-full py-[10px] rounded-sm mt-6 font-inter font-medium text-sm text-neutral-w-900">Reset password</button>
            </div>
        </section>
    )
}

export default ResetPassword