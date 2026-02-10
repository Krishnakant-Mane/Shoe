import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ShoppingBag } from 'lucide-react';
import { Products } from './Products';
import { VideoPlayer } from './VideoPlayer';
import { Link } from 'react-router-dom';
import { Carts } from '../components/Carts';

export const Hero = () => {

    const floatAnimation = {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
                <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20">
                    {/* Background Radial Gradient */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-linear-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse" />

                    <div className="text-center z-10 max-w-5xl mx-auto space-y-8 relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-6xl md:text-9xl font-black tracking-tighter text-[#1A1A1A] leading-none"
                        >
                            Walk on Air.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed"
                        >
                            Engineered for elegance. Designed for the everyday. <br className="hidden md:block" />
                            Experience the weightless comfort of <span className="text-black font-bold">LunaStep Air</span>.
                        </motion.p>
                    </div>

                    {/* Hero Shoe Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, type: "spring" }}
                        className="relative mt-12 mb-12 hover:scale-105 transition-transform duration-500 cursor-pointer z-10"
                    >
                        {/* Using a placeholder or the actual hero image from design if available via URL, otherwise logical fallback */}
                        <motion.img
                            src="https://s.yimg.com/ny/api/res/1.2/.poahHt.fSN4C6.b0SRm8w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwNDg7aD0xMzY2O2NmPXdlYnA-/https://media.zenfs.com/en/footwear_news_642/9d6fc4a8f1253f353ade16bf5d685e43"
                            alt="LunaStep Air"
                            className="w-[300px] md:w-[600px] object-contain drop-shadow-2xl translate-y-6"
                            animate={floatAnimation}
                        />

                        {/* Decorative Elements behind shoe */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] border border-gray-200 rounded-full -z-10 opacity-50" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[900px] md:h-[900px] border border-dashed border-gray-300 rounded-full -z-10 opacity-30 animate-[spin_60s_linear_infinite]" />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 items-center z-10"
                    >
                        <Link to="/products" >
                            <button className="hover:cursor-pointer bg-[#1A1A90] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-800 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-3 shadow-lg shadow-blue-900/20">
                                Shop LunaStep Air <ArrowRight size={18} />
                            </button>
                        </Link>
                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="bg-white text-black border border-gray-200 px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:border-black hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <Play size={16} className="fill-black" /> Watch the Film
                        </button>
                    </motion.div>
                </section>

                {/* Video Player Overlay */}
                <AnimatePresence>
                    {isVideoOpen && <VideoPlayer onClose={() => setIsVideoOpen(false)} />}
                </AnimatePresence>


                {/* Featured Collections */}
                <section className="max-w-[1400px] mx-auto px-6 py-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-12 text-[#1A1A1A] tracking-tight">Featured Collections</h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">

                        {/* Large Card - Urban Runner */}
                        <div className="md:col-span-8 relative rounded-[2.5rem] overflow-hidden group min-h-[400px] md:min-h-[600px] shadow-sm hover:shadow-2xl transition-all duration-500">
                            <img
                                src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/312706/01/sv01/fnd/IND/fmt/png/Softride-Premier-GlideKnit-Walking-Shoes"
                                alt="Urban Runner"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.85]"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-14 text-white max-w-2xl">
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block text-blue-300">New Release</span>
                                <h3 className="text-4xl md:text-6xl font-black mb-4 leading-none">Urban Runner Series</h3>
                                <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed max-w-lg">Performance meets street style. Built for the concrete jungle with advanced grip technology and responsive cushioning.</p>
                                <Link to="/products">
                                <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border-b-2 border-white pb-2 hover:text-blue-300 hover:border-blue-300 transition-colors flex items-center gap-2 group/btn">
                                    Explore Collection <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                </Link>
                            </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col gap-6">
                            {/* Top Right - Cart Studio */}
                            <Link to="/carts" className="flex-1 flex flex-col">
                                <div className="flex-1 min-h-[300px] rounded-[2.5rem] bg-white border border-gray-100 p-10 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 to-purple-500" />
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                        <ShoppingBag size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A]">Cart</h3>
                                    <p className="text-sm text-gray-500 mb-8 max-w-[220px] leading-relaxed">See Your Air</p>
                                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 px-6 py-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">Mine AIR</button>
                                </div>
                            </Link>

                            {/* Bottom Right - Midnight Edition */}
                            <div className="flex-1 min-h-[300px] relative rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000"
                                    alt="Midnight"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                                    <h3 className="text-2xl font-bold mb-1">Midnight Edition</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Stealth mode activated.</p>
                                </div>
                                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <ArrowRight className="text-white" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}
