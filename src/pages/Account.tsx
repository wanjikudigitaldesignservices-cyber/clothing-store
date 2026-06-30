import { Link } from 'react-router-dom'
import { Package, Heart, MapPin, LogOut, User as UserIcon } from 'lucide-react'

export default function Account() {
  const isLoggedIn = false

  if (!isLoggedIn) {
    return (
      <div className="container" style={{ padding: '80px 1rem', textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}>
        <UserIcon size={48} color="#d4d4d4" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Sign in to your account</h1>
        <p style={{ color: '#737373', marginBottom: '24px', fontSize: '15px' }}>View orders, manage your wishlist, and update your details.</p>
        <Link to="/login" style={{
          display: 'inline-flex',
          background: '#0a0a0a',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 1rem 64px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.5px' }}>My Account</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {[
          { icon: <Package size={24} />, title: 'My Orders', desc: 'Track and manage orders', to: '/account/orders' },
          { icon: <Heart size={24} />, title: 'Wishlist', desc: 'Your saved items', to: '/wishlist' },
          { icon: <MapPin size={24} />, title: 'Addresses', desc: 'Manage shipping addresses', to: '/account/addresses' },
          { icon: <LogOut size={24} />, title: 'Sign Out', desc: 'Log out of your account', to: '/login' },
        ].map(item => (
          <Link key={item.title} to={item.to} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color 0.2s',
          }}>
            <div style={{ color: '#525252' }}>{item.icon}</div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#737373', margin: 0 }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
