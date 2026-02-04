import React, { useEffect } from 'react'
import { Home } from './Home'
import home from '../assets/Home.mp4'
import gsap from 'gsap'
import { Products } from './Products'
import { GenderProduct } from './GenderProduct'
import { MensProductSample } from './MensProductSample'
import { WomensProductSample } from './WomensProductSample'
import { MensProducts } from './MensProducts'
import { WomenProducts } from './WomenProducts'


export const Intro = () => {

    useEffect(() => {
        gsap.fromTo([".headline", ".description", "buttonx"],
            {
                y: 50,      // Start 50px down
                opacity: 0  // Start invisible
            },
            {
                y: -5,     // End 50px up
                opacity: 1, // Fade in
                duration: 3,
                ease: "power3.out"
            }
        );
    },)


    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">

                {/* Video Background */}
                <video
                    src={home}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Overlay Content */}
                <div className="relative z-50 flex w-full h-full items-center justify-center px-16">
                    <div className="flex flex-col gap-5 text-white">

                        <h1 className='headline flex justify-center text-7xl playfair'>LunaStep</h1>

                        <div className='description flex justify-center w-full'>
                            <p className='flex justify-center w-full italic'>Confidence starts from the ground up. Give them a reason to stare.</p>
                        </div>

                        <div className=' buttonx flex justify-center w-full'>
                            <a href="#shopnow">
                                <button className="buttonx playfair bg-white/50 border-white text-black px-10 py-2 hover:bg-white hover:text-black transition rounded-2xl text-2xl font-bold sm:px-50 sm:py-4 hover:cursor-pointer">
                                    Shop Now
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <Products />
            <GenderProduct/> {/*GenderProduct 3D model*/}
            <MensProductSample/>
            <MensProducts/>
            <WomensProductSample/>
            <WomenProducts/>
        </>
    )
}
