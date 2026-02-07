import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from './supabaseClient';

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (formData) => {

        // Signup
        const { data: authData, error: signupError } =
            await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

        if (signupError) return alert(signupError.message);

        // Login immediately (fixes 401)
        await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        // Insert profile
        const { error: profileError } = await supabase
            .from("profiles")
            .insert([
                {
                    id: authData.user.id,
                    username: formData.username,
                    role: "user",
                },
            ]);

        if (profileError) alert(profileError.message);
        else alert("User created successfully!");
    };



    return (
        <div className="flex min-h-screen">
            {/* Left Side - Image/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0f1c] text-white flex-col justify-end p-12 overflow-hidden">
                {/* Background Overlay/Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                        alt="Sneaker"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 mb-8">
                    <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider border rounded-full border-gray-600 backdrop-blur-sm bg-white/10">
                        New Collection
                    </span>
                    <h1 className="text-5xl font-serif font-bold mb-4 leading-tight">
                        Redefining movement.
                    </h1>
                    <p className="text-gray-300 text-lg max-w-md">
                        Experience the fusion of luxury materials and ergonomic design in our lightest silhouette yet.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Join the Community</h2>
                        <p className="text-gray-500">Exclusive access to limited drops and premium footwear. Step into the future of comfort.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none placeholder-gray-400`}
                                    placeholder="Jane Doe"
                                    {...register("username", { required: "Username is required" })}
                                />
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none placeholder-gray-400`}
                                    placeholder="jane@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors outline-none placeholder-gray-400`}
                                    placeholder="Minimum 8 characters"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300 rounded focus:ring-blue-600"
                                    {...register("terms", { required: "You must agree to the terms" })}
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="text-gray-500">
                                    I agree to the <a href="#" className="text-blue-700 hover:underline font-medium">Terms</a> and <a href="#" className="text-blue-700 hover:underline font-medium">Privacy Policy</a>.
                                </label>
                                {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1a237e] hover:bg-[#151b60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Logins */}
                    <div className="flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <img src="https://www.svgrepo.com/show/445657/apple.svg" alt="Apple" className="h-5 w-5" />
                            <span className="text-sm font-medium text-gray-700">Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
