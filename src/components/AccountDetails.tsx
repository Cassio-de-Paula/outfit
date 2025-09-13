import { useUser } from "@clerk/clerk-react"
import UserIcon from "./UserIcon"


const AccountDetails = () => {
    const { user } = useUser()

    return (
        <div className="flex flex-col w-full mt-16">
            <h3 className="font-inter font-semibold text-neutral-b-900 text-base mb-10">Account Details</h3>
            <UserIcon />
            <div className="flex flex-col mt-8 gap-4">
                <label htmlFor="fullname" className="flex flex-col font-inter font-medium text-sm text-neutral-b-600">
                    Full name
                    <input type="text" id="fullname" value={user!.fullName!} className='flex max-w-[320px] border-[1px] text-sm py-[10px] px-[15px] rounded-md aspect-[7.11111] border-neutral-b-100'
                    />
                </label>
                <label htmlFor="email" className="flex flex-col font-inter font-medium text-sm text-neutral-b-600">
                    Email
                    <input type="text" value={user?.primaryEmailAddress?.emailAddress} id="email" className='flex max-w-[320px] border-[1px] text-sm py-[10px] px-[15px] rounded-md aspect-[7.11111] border-neutral-b-100'
                    />
                </label>
            </div>
        </div>
    )
}

export default AccountDetails