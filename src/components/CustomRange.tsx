import React, { useEffect, useRef, useState } from "react";

interface RangeProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    search: () => void
}

const CustomRange = ({ value, setValue, search }: RangeProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<number>(0); // Inicializa com 0
    const [_, setScreenWidth] = useState<number>(window.innerWidth); // Tamanho da tela

    const updateWidth = () => {
        if (inputRef.current) {
            setInputWidth(inputRef.current.offsetWidth); // Atualiza a largura do input
        }
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth); // Atualiza o estado da largura da tela
        updateWidth(); // Atualiza a largura do input sempre que a tela mudar
    };

    useEffect(() => {
        updateWidth(); // Atualiza a largura ao montar o componente
        window.addEventListener("resize", handleResize); // Adiciona o listener de redimensionamento

        return () => {
            window.removeEventListener("resize", handleResize); // Limpa o listener quando o componente for desmontado
        };
    }, []); // O array vazio faz com que o efeito aconteça apenas uma vez, após a montagem inicial

    return (
        <div className="relative max-h-max">
            <input
                ref={inputRef}
                type="range"
                className={`appearance-none w-full max-w-[199px] [&::-webkit-slider-runnable-track]:h-[4px] rounded-full 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-[16px] 
                        [&::-webkit-slider-thumb]:h-[16px]
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:bg-neutral-b-900 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:relative 
                        [&::-webkit-slider-thumb]:z-10
                        [&::-webkit-slider-thumb]:-top-[6px]
                        `}
                style={{
                    background: `linear-gradient(to right, #878A92 ${(value) / 10}%, #E6E7E8 ${(value / 10)}%)`,
                }}
                max={1000}
                min={50}
                value={value}
                onChange={(e) => {
                    setValue(Number(e.target.value))
                    console.log(value / inputWidth)
                }}
                onMouseUp={search} // Dispara a busca ao soltar o mouse
                onTouchEnd={search}
            />
            <div
                className={`bg-neutral-b-900 text-nowrap max-w-[90px] min-h-[24px] absolute top-8 rounded-sm px-2 flex flex-col justify-center items-center`}
                style={{
                    left: `${((value - 50) / 1000) * inputWidth - 20 - (value / inputWidth)}px`, // Ajusta a posição com base na largura do input
                }}>
                <div className="min-h-[7px] min-w-[7px] bg-neutral-b-900 rotate-45 absolute -top-0.5 left-[24px]" />
                <p className="font-inter text-center text-[10px] lg:text-sm font-medium text-neutral-w-900">
                    {`$ ${value}.00`}
                </p>
            </div>
        </div>
    );
};

export default CustomRange;
