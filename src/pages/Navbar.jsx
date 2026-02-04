import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = ['Home', 'Mens', 'Womens', 'Contact'];

    return (
        <nav className="fixed top-0 left-0 w-full z-500 backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-sm">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 md:py-6 flex justify-between items-center relative">

                {/* Brand Identity - Always visible and consistent */}
                <div className="text-2xl md:text-3xl cursor-pointer font-semibold font-[Playfair_Display] text-black z-60">
                    <a href="#home">LunaStep</a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-10">
                    {navLinks.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative text-[12px] uppercase tracking-[0.25em] text-[#2E2E2E] font-medium group transition-colors duration-300 hover:text-black"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Hamburger Button - Higher Z-index to stay above overlay */}
                <button
                    className="md:hidden z-60 p-2 text-black transition-transform duration-300 active:scale-90"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>
        </nav>
    );
};