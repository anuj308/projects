import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Navabar({setShowLogin}) {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate()

    const { getTotalCartAmount,token,setToken } = useContext(StoreContext)

    const logout = ()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }
    return (
        <div className="navbar">
            <Link to="/"><img src={assets.logo} className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to= "/" className={menu==="home"?"active":""} onClick={() => setMenu("home")}>Home</Link>
                <a href="#explore-menu" className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
                <a href="#app-download" className={menu === "mobile" ? "active" : ""} onClick={() => setMenu("mobile")}>Mobile-app</a>
                <a href="#footer" className={menu === "contact" ? "active" : ""} onClick={() => setMenu("contact")}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>  
            {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>:<>
                <div className="navbar-profile">
                <img src={assets.profile_icon}/>
                <ul className='nav-profile-dropdown'>
                    <li onClick={()=> navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr/>
                    <li ><img src={assets.logout_icon} alt="" /><p onClick={logout}>Logout</p></li>
                </ul>
                </div>
                </>}
            </div>
            
        </div>
    )
}

export default Navabar