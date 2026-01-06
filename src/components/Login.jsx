import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Login = () => {

  const { setShowUserLogin, setUser } = useAppContext()
  const [currState, setCurrState] = useState('Login')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Simulate login for now
    setUser({name: "User"})
    setShowUserLogin(false)
  }

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ()=>{
        document.body.style.overflow = 'unset';
    }
  },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{currState}</h1>
        <p className='text-sm text-center mt-2 mb-6'>Welcome back to BuyFresh</p>
        
        {currState === 'Sign Up' && 
          <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.profile_icon} className='w-5' alt="" />
            <input className='outline-none text-sm' type="text" placeholder='Your Name' required />
          </div>
        }
        
        <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <input className='outline-none text-sm w-full' type="email" placeholder='Email Id' required />
        </div>

        <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <input className='outline-none text-sm w-full' type="password" placeholder='Password' required />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

        <button className='bg-primary w-full text-white py-2 rounded-full text-base'>{currState === 'Login' ? 'Login' : 'Create Account'}</button>

        {currState === 'Login' 
          ? <p className='text-sm mt-5 text-center'>Don't have an account? <span onClick={()=>setCurrState('Sign Up')} className='text-primary cursor-pointer font-medium'>Sign Up</span></p>
          : <p className='text-sm mt-5 text-center'>Already have an account? <span onClick={()=>setCurrState('Login')} className='text-primary cursor-pointer font-medium'>Login</span></p>
        }

        <img onClick={()=>setShowUserLogin(false)} src={assets.remove_icon} className='absolute top-5 right-5 w-3 cursor-pointer' alt="" />
      </form>
    </div>
  )
}

export default Login