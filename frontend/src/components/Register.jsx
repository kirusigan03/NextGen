import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../redux/features/auth/authApi'

const Register = () => {
    const [message] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const [registerUser, {isLoading}] = useRegisterUserMutation();
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        }
        try {
          await registerUser(data).unwrap();
          alert("Registration successful!")
          navigate('/login')
        } catch (error) {
          setMessage("Registration failed")
        }

      
    }
  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-8!'>
        <h2 className='text-2xl font-semibold pt-5!'>Please Login</h2>
        <form onSubmit={handleRegister} className='space-y-5! max-w-sm mx-auto pt-8!'>

            <input type="text" name="username" id="username"
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder='username' required
            className='w-full bg-gray-100 focus:outline-none px-5! py-3!'
            />

            <input type="email" name="email" id="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='Email Address' required
            className='w-full bg-gray-100 focus:outline-none px-5! py-3!'
            />

            <input type="password" name="password" id="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder='password' required
            className='w-full bg-gray-100 focus:outline-none px-5! py-3!'
            />
            {
                message && <p className='text-red-500'>{message}</p>
            }

            <button type='submit'
            className='w-full mt-5! bg-primary text-white hover:bg-indigo-500 font-meadium
            py-3! rounded-md'
            >Register</button>
        </form>

        <p className='my-5! italic text-sm text-center'> Have an account? Please 
            <Link to="/login" className='text-red-700 px-1! underline!'> Login</Link>.</p>
      </div>
    </section>
  )
}

export default Register
