import { useSignIn } from "@clerk/clerk-react"
import google from '../assets/Google.png'
import Loading from "./Loading"


const GoogleButton = () => {
    const { signIn, isLoaded } = useSignIn()

    if (!isLoaded) return <Loading />

    const signInGoogle = async () => {
        return signIn
            .authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err: any) => {
                console.log(err.errors)
                console.error(err, null, 2)
            })
    }

    return (
        <div className="w-full max-w-[320px] flex items-center justify-center">
            {
                !isLoaded ? (
                    <Loading />
                ) : (
                    <button type="button" onClick={signInGoogle} className="w-full max-w-[320px] flex justify-center items-center border-[1px] border-neutral-b-200 mb-4 rounded-sm py-3 px-6 custom-hover">
                        <div className="flex justify-between items-center">
                            <img src={google} alt="" />
                            <p className="font-inter text-sm text-neutral-b-500 font-medium">
                                Continue with Google
                            </p>
                        </div>
                    </button>
                )
            }
        </div>
    )
}

export default GoogleButton