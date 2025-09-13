
interface ErrorMessageProps {
    message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {

    return (
        <div className='w-full min-h-full flex justify-center items-center my-auto'>
            <p className={`bg-red-300 text-center rounded-xl border-red-600 max-w-[300px] p-4 max-h-fit opacity-35 text-red-600 text-sm font-medium`}>{message}</p>
        </div>
    )
}

export default ErrorMessage