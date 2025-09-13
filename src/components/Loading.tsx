import logo from '../assets/Logomark.png'
import shirt from '../assets/shirt.png'


const Loading = () => {

    return (
        <div className="flex justify-center items-center h-fit perspective-[1000px] m-auto">
            <div className='w-[50px] h-[50px] rounded-lg relative transform-3d animate-infinite-flip-animation'>
                <div className='w-[50px] h-[50px] relative transform-3d transition-transform duration-1000 '>
                    <div className='bg-neutral-w-100 flex justify-center items-center absolute w-[50px] h-[50px] rounded-lg backface-hidden rotate-y-0'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='bg-neutral-w-100 flex justify-center items-center absolute w-[50px] h-[50px] rounded-lg backface-hidden rotate-y-180'>
                        <img src={shirt} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading

