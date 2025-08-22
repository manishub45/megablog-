import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import authService from '../../appwrite/auth'
import {logout} from "../../store/authSlice"

function LogoutBtn() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const logoutHandler = async ()=> {
        
        
      try {
         setLoading(true)
         await authService.logout()  // Appwrite session delete
         dispatch(logout()) // Redux state clear
        
      } catch (error) {
         console.error("Logout failed:", error);
        
      } finally{
        setLoading(false)
      }
    }
        
 

  return (
    
      <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
    
  ) }


export default LogoutBtn
