import React from 'react'
import { Navbar } from './src/pages/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './src/pages/Footer'

export const Layout = () => {
  return (
    <>
    <Navbar/>
    <div>
        <main><Outlet/></main>
    </div>
    <Footer/>
    </>
  )
}
