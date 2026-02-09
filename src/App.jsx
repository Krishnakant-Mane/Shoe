import { Route, Routes } from "react-router-dom"
import { Layout } from "../Layout"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { Intro } from "./components/Intro"
import { Contacts } from "./components/Contacts"
import { Signup } from "./components/Signup"
import { Products } from "./components/Products"
import { AuthProvider } from "./context/AuthContext"
import CartProvider from "./context/CartProvider"
import { ProductProvider } from "./context/ProductContext"

gsap.registerPlugin(ScrollTrigger)

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Intro />} />
              <Route path="home" element={<Intro />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:keyword" element={<Products />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
