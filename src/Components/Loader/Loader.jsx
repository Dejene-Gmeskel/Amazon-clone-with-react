import React from 'react'
import {FadeLoader} from 'react-spinners'
const Loader = () => {
  return (
    <div  style={{
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        height:"50vh"
    }}>
    <FadeLoader color="#ff8c00" />


    </div>
  )
}

export default Loader