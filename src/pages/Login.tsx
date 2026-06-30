import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(isLogin ? 'Logged in successfully!' : 'Account created! Check your email.')
  }

  return (
    <div className="container" style={{ padding: '64px 1rem', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ color: '#737373', fontSize: '15px' }}>
          {isLogin ? 'Sign in to your account' : 'Join MAVAZI today'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {!isLogin && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input placeholder="First name" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
            <input placeholder="Last name" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
          </div>
        )}
        <input placeholder="Email address" type="email" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        <div style={{ position: 'relative' }}>
          <input
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            style={{ width: '100%', padding: '12px 16px', paddingRight: '44px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#737373' }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {!isLogin && (
          <input placeholder="Phone number" type="tel" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        )}

        <button type="submit" style={{
          width: '100%',
          background: '#0a0a0a',
          color: '#fff',
          padding: '14px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          marginTop: '8px',
        }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#525252', fontSize: '14px' }}
        >
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <strong style={{ color: '#0a0a0a' }}>{isLogin ? 'Sign up' : 'Sign in'}</strong>
        </button>
      </div>

      {isLogin && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <Link to="/forgot-password" style={{ fontSize: '13px', color: '#737373', textDecoration: 'none' }}>
            Forgot your password?
          </Link>
        </div>
      )}
    </div>
  )
}
