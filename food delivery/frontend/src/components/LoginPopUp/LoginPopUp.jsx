import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopUp = ({ setShowLogin }) => {

    const {url,token,setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onLogin = async (event) =>{
        event.preventDefault()
        let newUrl = url;
        if(currentState==="Login"){
            newUrl +="/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

    // const onChangeHandler = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setData(data => ({...data, [name]: value }))
    // }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Sign Up" ? <input onChange={(e)=>setData(data=>({...data,name:e.target.value}))} value={data.name} type="text" placeholder='Your name' required /> : ""}

                    <input type="email" onChange={(e)=>setData(data=>({...data,email:e.target.value}))} value={data.email} placeholder='Your email' required />
                    <input type="password" onChange={(e)=>setData(data=>({...data,password:e.target.value}))} value={data.password} placeholder='Your password' required />
                </div>
                <button>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

                {currentState === "Sign Up" ? <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p> : <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>}

            </form>
        </div>
    )
}

export default LoginPopUp