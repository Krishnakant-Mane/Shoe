import React from 'react'
import { products } from '../productList/products.jsx'
import { Link } from 'react-router-dom'

export const Products = () => {

    return (
        <>
            <div id='shopnow' className='flex justify-center w-full md:py-5 md:pt-20 pt-25'>
                <h1 className='md:text-6xl playfair text-5xl font-semibold'>Our Resources</h1>
            </div>
            {/* 1. Added overflow-x-auto and whitespace-nowrap logic to the parent */}
            <div className='w-full overflow-hidden scroll-auto'>
                <div className="flex flex-row flex-nowrap overflow-x-auto gap-8 px-5 md:px-20 py-10 h-[600px] scroll-smooth custom-scrollbar">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className='flex flex-col flex-shrink-0 w-[350px] md:w-[350px] lg:w-[400px] shadow-2xl bg-gray-50 overflow-hidden'
                        >
                            {/* Image Section */}
                            <div className='h-80 w-full relative group overflow-hidden'>
                                <p className='absolute top-4 left-4 z-10 px-3 py-1 text-sm font-semibold bg-black text-white playfair'>
                                    {100 - Math.floor((item.productPrice / item.productMRP) * 100)}% OFF
                                </p>
                                <img
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                    src={item.productImage}
                                    alt={item.productName}
                                />
                            </div>

                            {/* Info Section */}
                            <div className='p-6 flex flex-col gap-4'>
                                <h1 className='text-2xl font-semibold playfair truncate'>{item.productName}</h1>
                                <p className='text-gray-600 playfair line-clamp-2 h-12'>{item.productDescription}</p>

                                <div className='flex justify-between items-center'>
                                    <h3 className='text-xl font-bold playfair'>₨. {item.productPrice}</h3>
                                    <h3 className='text-md text-gray-400 playfair line-through'>₨. {item.productMRP}</h3>
                                </div>

                                <Link to={`/viewproduct/${item.id}`} className='w-full'>
                                    <button className='group relative w-full border-2 border-black py-3 font-extrabold playfair transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg'>
                                        <span className='absolute inset-0 w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full'></span>
                                        <span className='relative z-10 transition-colors duration-500 group-hover:text-white'>
                                            VIEW PRODUCT
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
