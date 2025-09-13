import { useUser } from "@clerk/clerk-react";



const UserIcon = () => {
    const { user } = useUser()

    const setInitials = () => {
        return `${user!.firstName!.charAt(0).toUpperCase()}${user!.lastName!.charAt(0).toUpperCase()}`;
    }

    return (
        <div className='flex items-center justify-center w-12 h-12 dark:bg-neutral-b-600 rounded-full bg-blue-50 font-inter font-medium text-sm text-blue-900-sem'>
            {setInitials()}
        </div>
    )
}

export default UserIcon