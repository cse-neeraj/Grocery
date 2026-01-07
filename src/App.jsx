import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home';
import { Toaster } from 'react-hot-toast';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
import Footer from './components/Footer';

const App = () => {
  const {showUserLogin} = useAppContext()
  const isSellerPath = useLocation().pathname.includes('seller')
  return (
    <div>
      {showUserLogin && <Login/>}
      {isSellerPath ? null:<Navbar/>}
      <Toaster/>

      
      <div className={`${isSellerPath ? '':'px-6 md:px-16 lg:px-24'}`}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        </Routes>

      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App