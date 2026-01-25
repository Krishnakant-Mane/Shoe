import { Route, Routes } from "react-router-dom"
import { Layout } from "../Layout"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"
import { Intro } from "./components/Intro"
import { ViewProduct } from "./components/ViewProduct"
gsap.registerPlugin(ScrollTrigger)

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Intro/>} />
          <Route path="viewproduct/:productId" element={<ViewProduct/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
