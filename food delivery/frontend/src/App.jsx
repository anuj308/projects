import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navabar"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PLaceOrder from "./pages/placeOrder/PlaceOrder"
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from "./pages/verify/verify"
import MyOrder from './pages/Myorders/MyOrder'

function App() {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PLaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrder/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
