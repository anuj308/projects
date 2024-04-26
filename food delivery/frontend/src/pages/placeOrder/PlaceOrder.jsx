import React, { useContext, useEffect, useState } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function PlaceOrder() {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id],
          orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    console.log(response)
    if (response.data.success) {
      const { session_url } = response.data;
      console.log(session_url)
      window.location.replace(session_url);
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  }, [token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <div className="title">Delivery Information</div>
        <div className="multi-fields">
          <input type="text" placeholder='First name' name="firstName" onChange={onChangeHandler} value={data.firstName} required />
          <input type="text" placeholder='Last name' name="lastName" onChange={onChangeHandler} value={data.lastName} required />
        </div>
        <input type="email" placeholder='Email address' name="email" onChange={onChangeHandler} value={data.email} required />
        <input type="text" placeholder='street' name="street" onChange={onChangeHandler} value={data.street} required />
        <div className="multi-fields">
          <input type="text" placeholder='City' name="city" onChange={onChangeHandler} value={data.city} required />
          <input type="text" placeholder='State' name="state" onChange={onChangeHandler} value={data.state} required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' name="zipCode" onChange={onChangeHandler} value={data.zipCode} required />
          <input type="text" placeholder='Country' name="country" onChange={onChangeHandler} value={data.country} required />
        </div>
        <input type="text" placeholder='Phone no' name="phone" onChange={onChangeHandler} value={data.phone} required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Free</p><p>₹{2}</p></div>
            <hr />
            <div className="cart-total-details"><p>Total</p><p>₹{getTotalCartAmount() + 2}</p></div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder