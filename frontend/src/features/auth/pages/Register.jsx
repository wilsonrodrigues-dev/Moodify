import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate=useNavigate()

  const {loading,handleRegister}=useAuth()


  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({username,email,password})

    navigate("/")
    

  }

  if(loading){
    return (<main><h1>Loading...</h1></main>)
  }





  return (
    <main>
        <h1>Register</h1>
        <form >
            <input
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            
            type="text" placeholder='Username' />
            <input
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            
            type="email" placeholder='Email' />
            <input
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            
            type="password" placeholder='Password' />
            <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </main>
  )
}

export default Register