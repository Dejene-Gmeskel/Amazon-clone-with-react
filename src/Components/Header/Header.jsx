import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css"

const Header = () => {
  return (
   < >
    <section >
     <div className={classes.header_container}>
        <div className={classes.logo_container}>
             
            {/* logo */}
            <a href="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
            </a>
            
            {/* delivery */}
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
            {/* search bar */}
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" placeholder='Search Product'/>
            <BsSearch size={25}/>
        </div>
        {/* right side link */}
        <div className={classes.order_container}>
         <a href='' className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1024px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt='Flag'/>
            <select>
                <option value="">EN</option>
            </select>
         </a>
         <a href="">
            <div>
                <p>Sign In</p>
                <span>Account & lists</span>
            </div>
         </a>
         {/* orders */}
         <a href="">
            <p>Returns</p>
            <span>&orders</span>
         </a>
         {/* cart */}
         <a href='' className={classes.cart}>
            <BiCart size={25}/>
            <span>0</span>
            
         </a>
 
        </div>
    </div>
</section>
   </>
  )
}

export default Header