import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../productList/products.jsx';
import { Heart, ShoppingBag, Star, ChevronDown, ChevronUp, Truck, ShieldCheck } from 'lucide-react';

export const ViewProduct = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { productId } = useParams();
    const product = products.find((item) => item.id.toString() === productId);

    const [mainImg, setMainImg] = useState(product?.productImage);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState('Midnight Black');
    const [openSection, setOpenSection] = useState(null);

    // Update main image if product changes
    useEffect(() => {
        if (product) {
            setMainImg(product.productImage);
        }
    }, [product]);

    if (!product) return <div className="p-20 text-center text-2xl font-bold">Product not found!</div>;

    const thumbnails = Object.values(product.productImages || {}).filter(img => img !== "");

    // Mock Data for UI
    const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'];
    const colors = [
        { name: 'Midnight Black', hex: '#000000' },
        { name: 'Cloud White', hex: '#F0F0F0' },
        { name: 'Navy Blue', hex: '#1e3a8a' }
    ];

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
        <div className=' pt-25'>
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 min-h-screen font-sans">

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT SIDE: Image Gallery */}
                    <div className="flex-1 space-y-4">
                        {/* Main Image */}
                        <div className="w-full aspect-square md:aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative group">
                            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
                                New Release
                            </span>
                            <img
                                src={mainImg}
                                alt={product.productName}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Secondary Images Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {thumbnails.slice(0, 2).map((img, idx) => (
                                <div
                                    key={idx}
                                    className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-black transition-all"
                                    onClick={() => setMainImg(img)}
                                >
                                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Lifestyle/Third Image */}
                        {thumbnails[2] && (
                            <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mt-4">
                                <img
                                    src={thumbnails[2]}
                                    alt="Lifestyle Shot"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Product Info */}
                    <div className="flex-1 lg:max-w-xl space-y-8 sticky top-4 h-fit">

                        {/* Header */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.productName}</h1>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-red-500">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-gray-900">${product.productPrice.toFixed(2)}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">In Stock</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span>(128 Reviews)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                            {product.productDescription || "Engineered for the urban sprinter. The Velocity Air combines aerospace-grade mesh with our signature LunaCore foam for weightless propulsion. Experience energy return like never before."}
                        </p>

                        {/* Color Selection */}
                        <div className="space-y-3">
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Color: <span className="text-gray-600 font-normal ml-1">{selectedColor}</span>
                            </span>
                            <div className="flex gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color.name ? 'border-black ring-1 ring-black ring-offset-2' : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        aria-label={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">Select Size</span>
                                <button className="text-xs text-blue-600 font-semibold hover:underline">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                            ? 'bg-black text-white shadow-lg scale-105'
                                            : 'bg-white border border-gray-200 text-gray-900 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Bag Button */}
                        <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg hover:bg-gray-900 transition-all hover:shadow-xl active:scale-95 group">
                            <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
                            Add to Bag
                        </button>
                        <p className="text-xs text-center text-gray-500">Free shipping on orders over $150. 30-day returns.</p>

                        {/* Accordions */}
                        <div className="border-t border-gray-200 pt-6 space-y-4">
                            {/* Features */}
                            <div className="border-b border-gray-100 pb-4">
                                <button
                                    onClick={() => toggleSection('features')}
                                    className="w-full flex justify-between items-center py-2 text-left"
                                >
                                    <span className="font-semibold text-gray-900">Product Features</span>
                                    {openSection === 'features' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {openSection === 'features' && (
                                    <div className="pt-2 text-sm text-gray-600 space-y-2 animate-fadeIn">
                                        <p>• Breathable aerospace mesh upper</p>
                                        <p>• LunaCore foam midsole for energy return</p>
                                        <p>• Durable rubber outsole with traction pattern</p>
                                    </div>
                                )}
                            </div>

                            {/* Shipping */}
                            <div className="border-b border-gray-100 pb-4">
                                <button
                                    onClick={() => toggleSection('shipping')}
                                    className="w-full flex justify-between items-center py-2 text-left"
                                >
                                    <span className="font-semibold text-gray-900">Shipping & Returns</span>
                                    {openSection === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {openSection === 'shipping' && (
                                    <div className="pt-2 text-sm text-gray-600 space-y-2 animate-fadeIn">
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            <span>Free standard shipping on all orders</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span>30-day money-back guarantee</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>

    );
};
