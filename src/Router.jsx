import React from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51OngRxF0YRBRcn68jUehKRu42fxUZWJVBMC5FWQteXUiss2MyuW5sTugMxnqynVBPySKuz2lKf05VECDZEIgqrrV00yeV3aJ5k');

const Routering = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element ={<Landing/>}/>
       <Route path="auth" element ={<Auth/>}/>
       <Route path="/cart/:payment" element ={
        <ProtectedRoute msg={"You must log in to Pay"} redirect={"/payment"}>
          <Elements stripe={stripePromise}>
          <Payment/>
       </Elements>
        </ProtectedRoute>
       }/>
       <Route path="orders" element ={ <Orders/>}/>
       <Route path="/category/:categoryName" element ={<Results/>}/>
       <Route path="/products/:productId" element ={<ProductDetails/>}/>
       <Route path="cart" element ={<Cart/>}/>
      </Routes>
    </Router>
  )
}

export default Routering;