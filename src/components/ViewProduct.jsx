import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../productList/products.jsx';


export const ViewProduct = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { productId } = useParams();
    const product = products.find((item) => item.id.toString() === productId);

    // 1. Initialize state with the main productImage
    const [mainImg, setMainImg] = useState(product?.productImage);

    if (!product) return <div className="p-20 text-center">Product not found!</div>;

    // 2. Convert the productImages object into a simple array
    const thumbnails = Object.values(product.productImages).filter(img => img !== "");

    return (
        <div className="flex flex-col md:flex-row gap-5 p-10 md:pt-25 pt-25 max-w-7xl mx-auto h-screen">

            {/* LEFT SIDE: Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4 flex-1">

                {/* Thumbnails List */}
                <div className="flex md:flex-col gap-3 overflow-x-auto">
                    {/* Include the default main image in thumbnails too */}
                    <img
                        src={product.productImage}
                        onClick={() => setMainImg(product.productImage)}
                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImg === product.productImage ? 'border-black' : 'border-transparent'}`}
                    />

                    {thumbnails.map((imgUrl, index) => (
                        <img
                            key={index}
                            src={imgUrl}
                            alt={`Thumbnail ${index}`}
                            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImg === imgUrl ? 'border-black' : 'border-transparent'}`}
                            onClick={() => setMainImg(imgUrl)}
                        />
                    ))}
                </div>

                {/* Big Main Image */}
                <div className="w-full h-[325px] sm:h-[250px] md:h-[500px] lg:h-[500px] bg-gray-100 rounded-2xl overflow-hidden">
                    <img src={mainImg} alt="Product Main" className="w-full h-full object-cover transition-opacity duration-300" />
                </div>
            </div>

            {/* RIGHT SIDE: Product Info */}
            <div className="flex-1 flex flex-col gap-4">
                <p className="text-gray-500 uppercase tracking-widest">{product.productGender} / {product.productCategory}</p>
                <h1 className="text-5xl font-bold playfair">{product.productName}</h1>
                <p className="text-xl text-gray-600 playfair">{product.productDescription}</p>

                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-semibold playfair">Rs. {product.productPrice}</h2>
                    <h2 className="text-xl line-through text-gray-400 playfair">Rs. {product.productMRP}</h2>
                </div>

                <button className="bg-black md:text-2xl text-white py-2 rounded-2xl font-semibold playfair hover:bg-gray-800 transition-colors mt-5 hover:cursor-pointer">
                    Order {product.productCategory} Now
                </button>

                <div className='flex md:flex-row flex-col w-full shadow-2xl card justify-between rounded-2xl'>
                    <div className='flex flex-col md:w-1/2 p-2'> 
                        <div>
                            <h1 className='font-bold'>Other Places</h1>
                            <h3 className='playfair'>DADAR, KURLA</h3>
                            <div className='flex justify-between'>
                                <div className='playfair'>Traveling Time</div>
                                <div className='playfair'>1Hr/2Hr</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='playfair'>Bargaing</div>
                                <div className='playfair'>Fustration</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='playfair'>Traveling cost from station</div>
                                <div className='playfair'>+10/+20/+30</div>
                            </div>
                            <div className='flex justify-between border-b-1'>
                                <div className='playfair'>Product Cost</div>
                                <div className='playfair'>+{product.productOtherPrice}</div>
                            </div>
                            <div className='flex justify-between pt-5'>
                                <div className='playfair font-bold'>Total Cost</div>
                                <div className='playfair font-bold'>{product.productOtherPrice + 10}/{product.productOtherPrice + 20}/{product.productOtherPrice + 30}</div>
                            </div>
                        </div>
                    </div>

                    <span className='border-1'/>

                    <div className='flex flex-col w-1/2 p-2'>
                        <div>
                            <h1 className='font-bold'>Our Place</h1>
                            <h3 className='playfair'>LUNASTEP</h3>
                            <div className='flex justify-between'>
                                <div className='playfair'>Traveling Time</div>
                                <div className='playfair'>0Hr</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='playfair'>Bargaing</div>
                                <div className='playfair'>0</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='playfair'>Traveling cost from station</div>
                                <div className='playfair'>0</div>
                            </div>
                            <div className='flex justify-between border-b-1'>
                                <div className='playfair'>Product Cost</div>
                                <div className='playfair'>{product.productPrice}</div>
                            </div>
                            <div className='flex justify-between pt-5'>
                                <div className='playfair font-bold'>Total Cost</div>
                                <div className='playfair font-bold'>{product.productPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};