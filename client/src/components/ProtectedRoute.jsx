import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute(props) {

    if(localStorage.getItem('token')){
        return props.children
    } else{
        return <Navigate to='/sign-in'/>
    }

}

export default ProtectedRoute
