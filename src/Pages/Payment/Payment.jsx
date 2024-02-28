import React, { useContext,useState} from 'react';
import Layout from '../../Components/Layout/Layout';
import classes from './Payment.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from"../../Components/Product/ProductCard"
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/Axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/FireBase';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [{ cart,user }] = useContext(DataContext); 
  const totalItem = cart?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total= cart.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  const stripe = useStripe();
  const elements = useElements();
  const navigate =useNavigate()
 
 
  const [cardError,setCardError]=useState(null)
  const [processing,setProcessing]=useState(false)
  const handleChange=(e)=>{
  console.log(e)
  e?.error?.message ? setCardError(e.error.message): setCardError("")
  }
  const handlePayment = async (e) => {
    e.preventDefault();
  
    try {
      setProcessing(true)
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
  
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      // console.log(paymentIntent);
      

      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
        cart:cart,
        amount:paymentIntent.amount,
        created:paymentIntent.created
      })
      setProcessing(false)
      navigate("/orders",{state:{msg:"You have placed a new order"}})
    } catch (error) {
      console.error("Error processing payment:", error);
      setProcessing(false)
    }
  };
  

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout {totalItem} items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
        {user && (
          <div>
          <h3>Delivery Address</h3>
          <div>
         <div>{user?.email}</div>
        <div>Dj React Dev Lane</div>
         <div>Addis Ababa, ET</div>
    </div>
  </div>
)}

        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              cart?.map((item)=><ProductCard product={item} flex={true} renderAdd={true}/>)
            }
          </div>
        </div>
        <hr />
        {/* card */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* card error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* payment card */}
               <CardElement onChange={handleChange}/>
               {/* price total */}
               <div className={classes.payment_price}>
                <div>
                  <span style={{display:"flex",gap:"10px"}}>
                    <p >Total order |</p><CurrencyFormat amount={total}/>   
                  </span>
                </div>
                <button type='submit'>
                  {
                    processing ?(
                      <div className={classes.loading}>
                        <ClipLoader color='gray' size={12}/>
                        <p>Please Wait...</p>
                      </div>
                    ):(" Pay Now")
                  }
                  
                  
                 </button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
