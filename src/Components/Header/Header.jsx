import React,{useContext} from 'react'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css"
import LowerHeader from "./LowerHeader"
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/FireBase';
 


const Header = () => {
   const[{cart,user},dispatch] =useContext(DataContext)
   const totalItem = cart?.reduce((amount,item)=>{
    return item.amount + amount
   },0)
  return (
   <section className={classes.fixed}>
    <section >
     <div className={classes.header_container}>
        <div className={classes.logo_container}>
             
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </Link>
            <div className={classes.delivery}>
            <span>
            <SlLocationPin />
            </span>
           
            <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
            </div>
            </div>
    </div>
        <div className={classes.search}>
         
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" placeholder='Search Product'/>
            <BsSearch size={38}/>
        </div>
       
        <div className={classes.order_container}>
         <a href='' className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1024px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt='Flag'/>
            <select>
                <option value="">EN</option>
            </select>
         </a>
         <Link to={!user && "/auth"}>
            <div>
                <div>
                  {
                   user ? (
                    <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                  ) :(
                  <>
                  <p>Hello,Sign In</p>
                  <span>Account & lists</span>
                  </>
                  )
                  }   
                </div>
                
            </div>
         </Link>
         <Link to="/orders">
            <p>Returns</p>
            <span>&orders</span>
         </Link>
         <Link to='/cart' className={classes.cart}>
            <BiCart size={25}/>
            <span>{totalItem}</span>
            
         </Link>
 
        </div>
    </div>
</section>
     <LowerHeader/>
   </section>
  
  )
}

export default Header