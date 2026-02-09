import { createContext, useState, useEffect } from "react";
import { supabase } from "../components/supabaseClient";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);
    const [recentOrder, setRecentOrder] = useState(null);

    //GETTING USERS
    const fetchProfile = async (sessionUser) => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", sessionUser.id)
                .single();

            if (error) {
                if (error.code === "PGRST116") return; // No rows found
                throw error;
            }

            if (data) {
                setUser(prev => ({
                    ...prev,
                    ...data,
                    fullName: data.full_name,
                    profilePic: data.avatar_url,
                    shippingAddress: data.shipping_address
                }));
            }
        } catch (error) {
            console.log("Error fetching profile", error);
        }
    }

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email });
                await fetchProfile(session.user);
            }
            setIsLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email });
                await fetchProfile(session.user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);


    //SIGNUP
    const registerUser = async (data) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email.toLowerCase(),
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        phone: data.phone,
                    }
                }
            })

            if (authError) {
                throw authError;
            }

            toast.success("Registration successful! Please check your email for verification.");
            return authData;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //LOGIN
    const loginUser = async (data) => {
        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })

            if (authError) {
                throw authError;
            }

            toast.success("Login successful!");
            return authData;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //LOGOUT
    const logoutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            setUser(null);
            toast.success("Logout successful!");
            return true;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //UPDATING PROFILE
    const updateProfile = async (data) => {
        try {
            if (!user) return;
            const { error } = await supabase.from("profiles").upsert({
                id: user.id,
                full_name: data.fullName,
                phone: data.phone,
                shipping_address: data.shippingAddress,
                updated_at: new Date().toISOString()
            })

            if (error) {
                throw error;
            }

            setUser(prev => ({
                ...prev,
                fullName: data.fullName,
                phone: data.phone,
                shippingAddress: data.shippingAddress
            }))

            toast.success("Profile Details updated successfully!");
            return true;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //UPDATING PROFILE PIC
    const updateProfilePic = async (imgUrl) => {
        try {
            if (!user) return;
            const { error } = await supabase.from("profiles").upsert({
                id: user.id,
                avatar_url: imgUrl,
                updated_at: new Date().toISOString()
            })

            if (error) {
                throw error;
            }

            setUser(prev => ({
                ...prev,
                profilePic: imgUrl
            }))

            toast.success("Profile Picture updated successfully!");
            return true;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //PLACING ORDER
    const placeOrder = async (cartItems, totalAmount, address) => {
        try {
            if (!user) return;
            const { data, error } = await supabase.from("orders").insert({
                user_id: user.id,
                items: cartItems,
                total_amount: totalAmount,
                status: "orderplaced"
            }).select().single();

            if (error) {
                throw error;
            }

            await updateProfile({ shippingAddress: address });

            setRecentOrder(data);
            setShowOrderSuccess(true);
            toast.success("Order placed successfully!");
            return data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //ADMIN CONTROL

    //GETTING ALL ORDERS
    const getAllOrders = async () => {
        try {
            const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }

    //UPDATING ORDER STATUS
    const updateOrderStatus = async (orderId, status) => {
        try {
            const { error } = await supabase.from("orders").update({
                status: status,
                updated_at: new Date().toISOString()
            }).eq("id", orderId)

            if (error) {
                throw error;
            }

            toast.success("Order status updated successfully!");
            return true;
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }


    //DELETING ORDER
    const deleteOrder = async (orderId) => {
        try {
            const { error } = await supabase.from("orders").delete().eq("id", orderId)

            if (error) {
                throw error;
            }

            toast.success("Order deleted successfully!", { id: "orderDeleted" });
            return true;
        } catch (error) {
            toast.error(error.message, { id: "orderDeleted" });
            throw error;
        }
    }

    //GET ALL STATUS
    const getAllStatus = async () => {
        try {

            const { data: order, error: orderError } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
            const { count: userCount, error: userError } = await supabase.from("profiles").select("*", { count: "exact", head: true });
            if (orderError || userError) {
                throw orderError || userError;
            }

            const newOrders = order.filter(order => order.status === "orderplaced").length;
            const totalRevenue = order.reduce((total, order) => total + order.total_amount, 0);
            const totalOrders = order.length;

            return { newOrders, totalRevenue, totalOrders, userCount };
        } catch (error) {
            toast.error(error.message);
            return { newOrders: 0, totalRevenue: 0, totalOrders: 0, userCount: 0 };
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            registerUser,
            loginUser,
            logoutUser,
            updateProfile,
            updateProfilePic,
            placeOrder,
            getAllOrders,
            updateOrderStatus,
            deleteOrder,
            getAllStatus,
            showOrderSuccess,
            setShowOrderSuccess,
            recentOrder,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
