import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Wishlist() {
  const items: never[] = []

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 1rem', textAlign: 'center' }}>
        <Heart size={48} color="#d4d4d4" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Your wishlist is empty</h1>
        <p style={{ color: '#737373', marginBottom: '24px', fontSize: '15px' }}>Save items you love for later.</p>
        <Link to="/shop" style={{
          display: 'inline-flex',
          background: '#0a0a0a',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 1rem 64px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>Wishlist</h1>
    </div>
  )
}
