import React from 'react'
import {useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    const userRef=useRef()
    const errRef=useRef()
    const [user,setUser]=useState('')
    const [pwd,setPwd]=useState('')
    const [errMsg,setErrMsg]=useState('')
    const navigate=useNavigate()

    const [login,{isLoading}]=useLoginMutation()
    const dispatch=useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    },[])
    
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])
   
     const handleSubmit=async (e)=>{
        e.preventDefault()

        try{
            const userData=await login({user,pwd}).unwrap()
            dispatch(setCredentials({...userData,user})) 
            setUser('')
            setPwd('')
            navigate('/welcome')
        }catch(err){
            if(!err?.response){
                setErrMsg('No server response');
            } else if(err.response?.status===400){
                setErrMsg('Missing username or password');
            } else if(err.response?.status===401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();

        }
     }

     const handleUserInput=(e)=>setUser(e.target.value)
     const handlePwdInput=(e)=>setPwd(e.target.value)


     const content=isLoading?<h1>Loading.....</h1>:
     (
        <section className="login">
    <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}></p>

<form onSubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="text" id="username" ref={userRef}  value={user} onChange={handleUserInput} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" onChange={handlePwdInput} value={pwd} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

</section>
     )

  return content
}

export default Login