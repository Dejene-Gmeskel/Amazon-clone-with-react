import React, {useState,useContext}from 'react'
import classes from "./Auth.module.css"
import {Link,useNavigate} from "react-router-dom"
import {auth} from "../../Utility/FireBase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext}from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/ActionType'
import {ClipLoader}from "react-spinners"


const Auth = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState('')
  const [error,setError]=useState("")
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })

  const [{user}, dispatch]=useContext(DataContext)
  const navigate = useNavigate()
  const authHandler = async(e)=> {
    e.preventDefault()
    console.log(e.target.name)
    if(e.target.name ==='signIn'){
      setLoading({...loading,signIn:true})
      navigate("/")
     signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
    
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user
      });
      setLoading({...loading,signIn:false})
    }).catch((err)=>{
      setError(err.message)
      setLoading({...loading,signIn:false})
    })
    }else{
      setLoading({...loading,signUp:true})
      navigate("/")
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
    
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });
        setLoading({...loading,signUp:false})
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading,signUp:false})
      })

    }
  }
 
  return <section className={classes.login}>

   <Link to="/">
   <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="" />
   </Link>
<div className={classes.login_container}>
<h1>Sign-in</h1>
<form action="">
<div>
<label htmlFor="email">E-mail</label>
<input value={email}onChange={(e)=>setEmail(e.target.value)} type="email" id='email'/>

</div>
<div>
<label htmlFor="password">Password</label>
<input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" id='password'/>

</div>
<button type='submit' onClick={authHandler} name='signIn' className={classes.login_signInButton}>
  {
  loading.signIn ? (<ClipLoader color="#000" size={15} />):("Sign In")
  }
</button>



</form>
<p>
  By sigining in you agree to the AMAZON TAKE CLONE conditions of use & sale. Please see our Privacy Notice,our cookies Notice and our Interest-Based Ads Notice.
</p>
<button type='submit' onClick={authHandler} name='signUp' className={classes.login_registerButton}>
  {
  loading.signUp ? (<ClipLoader color="#000" size={15} />):("Create your Amazon Account")
  }
  </button>
{error && <small style={{paddingTop:"5px",color:"red"}}>{error}</small>}


</div>

 
  </section>
   
      
    
    
   
  
}

export default Auth