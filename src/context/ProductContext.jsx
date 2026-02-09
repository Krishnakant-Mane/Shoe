/* eslint-disable react-refresh/only-export-components */
// src/context/ProductContext.jsx
import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../components/supabaseClient";

export const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: "",
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_QUERY":
      return { ...state, searchQuery: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products whenever searchQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        let query = supabase.from('products').select('*');

        if (state.searchQuery) {
          const q = state.searchQuery;
          // Search in title, description, category, and brand, and image_url
          query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%,brand.ilike.%${q}%,image_url.ilike.%${q}%`);
        }

        const { data, error } = await query;

        if (error) throw error;

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.error("Error fetching products:", err);
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    };

    fetchProducts();

    // Real-time subscription
    const channel = supabase
      .channel('room1')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        // Handle different events
        if (payload.eventType === 'INSERT') {
          dispatch({ type: "ADD_PRODUCT", payload: payload.new });
        } else if (payload.eventType === 'UPDATE') {
          dispatch({ type: "UPDATE_PRODUCT", payload: payload.new });
        } else if (payload.eventType === 'DELETE') {
          dispatch({ type: "DELETE_PRODUCT", payload: payload.old.id });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [state.searchQuery]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};