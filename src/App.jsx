import { Route, Routes } from "react-router-dom"
import { Layout } from "../Layout"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { Intro } from "./components/Intro"
import { ViewProduct } from "./components/ViewProduct"
import { MensProducts } from "./components/MensProducts"
import { WomenProducts } from "./components/WomenProducts"
import { Contacts } from "./components/Contacts"
gsap.registerPlugin(ScrollTrigger)

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Intro/>} />
          <Route path="home" element={<Intro/>} />
          <Route path="viewproduct/:productId" element={<ViewProduct/>} />
          <Route path="mens" element={<MensProducts/>} />
          <Route path="womens" element={<WomenProducts/>} />
          <Route path="contacts" element={<Contacts/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
