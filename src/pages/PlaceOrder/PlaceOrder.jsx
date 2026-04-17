import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => {
      const updatedData = { ...data, [name]: value };
      console.log(updatedData);
      return updatedData;
    });
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token])


  const placeOrder = async (event) => {
  event.preventDefault();

  let orderItems = [];

  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      let itemInfo = { ...item };
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  });

  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 40,
    paymentMethod: paymentMethod
  };

  try {
    const response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      if (paymentMethod === "Stripe") {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.success("Order placed successfully");
        setTimeout(() => {
          navigate("/myorders");
        }, 1500);
      }
    } else {
      toast.error("Something went wrong while placing the order.");
    }

  } catch (error) {
    console.error("Order error:", error);
    toast.error("Failed to place order. Please try again.");
  }
};



  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>

          <h2>Payment Method</h2>
<div className="payment-method">
  <label>
    <input
      type="radio"
      name="paymentMethod"
      value="COD"
      checked={paymentMethod === "COD"}
      onChange={() => setPaymentMethod("COD")}
    />
    COD (Cash on delivery)
  </label>
  <br />
  <label>
    <input
      type="radio"
      name="paymentMethod"
      value="Stripe"
      checked={paymentMethod === "Stripe"}
      onChange={() => setPaymentMethod("Stripe")}
    />
    Stripe (Credit / Debit)
  </label>
</div>

          <button type='submit'>Place Order</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
