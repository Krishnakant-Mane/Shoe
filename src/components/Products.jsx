import React from 'react'
import { products } from '../productList/products.jsx'
import { Link } from 'react-router-dom'

export const Products = () => {

    return (
        <>
            <div id='shopnow' className='flex justify-center w-full md:py-5 md:pt-20 pt-25'>
                <h1 className='md:text-6xl playfair text-5xl font-semibold'>Our Resources</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:px-50 md:py-5 py-5  md:h-screen">
                {products.map((item) => (
                    <div key={item.id} className='flex flex-col md:w-120 md:h-170 md:p-5 p-5 rounded-2xl shadow-2xl bg-gray-50 gap-5'>
                        <div>
                            <h1 className='md:text-4xl font-semibold playfair'>{item.productName}</h1>
                        </div>
                        <div className='h-100 w-full relative group overflow-hidden'>
                            <p className='flex justify-center items-center playfair absolute border m-2 w-20 z-100 font-semibold bg-black text-white'>{100 - Math.floor((item.productPrice / item.productMRP) * 100)}% OFF</p>
                            <img className='w-full h-full object-cover z-0 hover:scale-120 transition-transform duration-500' src={item.productImage} alt="" />
                        </div>
                        <div>
                            <p className='md:text-2xl playfair'>{item.productDescription}</p>
                            <div className='flex justify-between items-center '>
                                <h3 className='md:text-3xl playfair'>₨. {item.productPrice}</h3>
                                <h3 className='md:text-3xl playfair line-through'>₨. {item.productMRP}</h3>
                            </div>
                            <Link to={`/viewproduct/${item.id}`} className='w-full'>
                                <button className='border w-full rounded-2xl md:py-2 py-2 my-2 playfair font-extrabold hover:cursor-pointer hover:bg-black hover:text-white hover:transition-transform duration -150'>
                                    View
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
