import React, { useState, useEffect } from 'react'
import { WomenSample } from '../productList/WomenSample';
import { motion } from "framer-motion";
import { products } from '../productList/products';
const ProductCard = ({ product, isMobile }) => {
  return (
    <div className='group w-full md:h-screen h-1/2 overflow-hidden perspective-1000' style={{ perspective: "1000px" }}>
      <motion.div
        className='relative w-full h-full'
        initial={{ rotateY: 0 }}
        whileHover={!isMobile ? { rotateY: 180 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className='absolute w-full h-full'
          style={{ backfaceVisibility: "hidden" }}
        >
          <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>

        {/* Back Side */}
        <div
          className='absolute w-full h-full bg-black text-white flex items-center justify-center'
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h2 className='text-2xl font-bold'>View Details</h2>
        </div>
      </motion.div>
    </div>
  );
};

export const WomensProductSample = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className='md:flex w-full h-screen'>
        {WomenSample.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} isMobile={isMobile} />
        ))}
      </div>
    </>
  )
}