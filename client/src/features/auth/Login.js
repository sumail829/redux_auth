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
            errRef.current?.focus();

        }
     }

     const handleUserInput=(e)=>setUser(e.target.value)
     const handlePwdInput=(e)=>setPwd(e.target.value)


     const content=isLoading?<h1>Loading.....</h1>:
    
     (
        <section className="login">
    <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}>{errMsg}</p>
    <h1>Student login</h1>
<form onSubmit={handleSubmit} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
    <input type="text" id="username" ref={userRef}  value={user} onChange={handleUserInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" onChange={handlePwdInput} value={pwd} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button>Sign In</button>
</form>

</section>
     )

  return content
}

export default Login