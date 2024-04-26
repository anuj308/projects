import React, { useState, useEffect } from 'react'
import "./Add.css"
import { assets } from "../../assets/admin_assets/assets"
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
  const url = "http://localhost:4000"
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onchangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toString.error(response.data.message)
    }
  }


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : assets.upload_area} /></label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" onChange={onchangeHandler} value={data.name} name="name" placeholder='Type here' />
        </div>
        <div className="add-product-description flec-col">
          <p>Product description</p>
          <textarea onChange={onchangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product Category</p>
            <select onChange={onchangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodels">Noodels</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onchangeHandler} value={data.price} type="Number" name="price" placeholder='₹200' />
          </div>
          <button type="submit" className='add-btn'>
            ADD
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add