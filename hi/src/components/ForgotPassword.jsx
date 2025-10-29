import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'  // Make sure you have axios installed

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const res = await axios.post('http://localhost:3001/api/forgot-password', { email })
      // You can customize message based on your backend response
      setMessage("If your email is registered, you’ll receive reset instructions.")
    } catch (err) {
      // Show a generic error message for security purposes
      setError('An error occurred. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative w-full min-h-screen flex items-center justify-center bg-gray-900 px-4'>
      {/* Background (optional) - add if you want consistent look with Login/Signup */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/thumbnails/001/401/677/small_2x/abstract-polygonal-shape-black-background-free-vector.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 z-0" />

      {/* Form Container */}
      <form 
        onSubmit={handleReset} 
        className='relative z-10 bg-white p-8 rounded-xl shadow-md w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h2>
        <p className='text-sm text-gray-600 mb-6 text-center'>
          Enter your email and we’ll send you reset instructions.
        </p>

        <input 
          type='email' 
          required 
          placeholder='Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className='w-full mb-4 p-2 border rounded-xl'
          disabled={loading}
        />

        <button 
          type='submit' 
          className='w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50' 
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default ForgotPassword
