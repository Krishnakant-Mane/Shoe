import { useState, useRef } from "react";
import { MenShoe } from "../productList/MenShoe";

export const GenderProduct = () => {
    const [index, setIndex] = useState(0);
    const startX = useRef(0);

    const start = (e) => {
        startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const move = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = x - startX.current;

        if (Math.abs(delta) > 14) {
            setIndex(
                (prev) =>
                    (prev + (delta > 0 ? 1 : -1) + MenShoe.length) % MenShoe.length
            );
            startX.current = x;
        }
    };

    return (
        <>

            <div className="md:flex w-full md:h-screen md:pt-25 pt-25 space-y-20">

                <div className="w-full relative group overflow-hidden md:w-1/2">
                    <div className=" flex justify-center items-center w-full absolute z-100">
                        <h1 className="flex text-4xl playfair border-b-2">Men's Shoe</h1>
                    </div>
                    <div
                        className="md:w-full  cursor-grab z-0 object-cover"
                        onMouseDown={start}
                        onMouseMove={move}
                        onTouchStart={start}
                        onTouchMove={move}
                    >
                        <img
                            src={MenShoe[index]}
                            className="w-full select-none md:h-200"
                            draggable={false}
                            alt="Shoe rotation"
                        />
                    </div>
                </div>

                <div className="w-full relative group overflow-hidden md:w-1/2">
                    <div className=" flex justify-center items-center w-full absolute z-100">
                        <h1 className="flex text-4xl playfair border-b-2">Women's Shoe</h1>
                    </div>
                    <div
                        className="md:w-full  cursor-grab z-0 object-cover"
                        onMouseDown={start}
                        onMouseMove={move}
                        onTouchStart={start}
                        onTouchMove={move}
                    >
                        <img
                            src={MenShoe[index]}
                            className="w-full select-none md:h-200"
                            draggable={false}
                            alt="Shoe rotation"
                        />
                    </div>
                </div>

            </div>

        </>

    );
};