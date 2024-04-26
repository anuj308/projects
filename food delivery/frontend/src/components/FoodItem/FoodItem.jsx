import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from "../../assets/frontend_assets/assets"

const FoodItem = ({ id, name, price,  description, image }) => {

  const { cartItem,url, addToCart, removeFromCart , food_list} = useContext(StoreContext)
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/api/images/"+image} alt="" />
        {!cartItem[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} /> : <div className='food-item-counter'>
          <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
          <p>{cartItem[id]}</p>
          <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
        </div>}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>

    </div>
  )
}

export default FoodItem