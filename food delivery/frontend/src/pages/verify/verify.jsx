import React, { useContext, useEffect, useState } from 'react'
import "./verify.css"
import { useSearchParams ,useNavigate} from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const success =searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPaymnet = async ()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.success){
            navigate("/myorders");
        }else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPaymnet();
    },[])
    return (    
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default verify