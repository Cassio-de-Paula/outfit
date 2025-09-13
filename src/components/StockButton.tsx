interface StockButtonProps {
    inStock: boolean
}

const StockButton = ({ inStock }: StockButtonProps) => {

    return (
        <div className="flex items-center px-2 uppercase border-[1px] border-neutral-b-100 rounded-[100px] min-[1024px]:px-4">
            <p className="font-inter text-nowrap align-middle text-[6px]/[14px] min-[490px]:text-[8px]/[18px] min-[1024px]:text-xs/[24px] font-medium text-neutral-b-900">
                {inStock ? 'In Stock' : 'No Stock'}
            </p>
        </div>
    )
}

export default StockButton