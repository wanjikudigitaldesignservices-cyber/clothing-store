import { Outlet, Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Heart, Search } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop All' },
  { to: '/category/men', label: 'Men' },
  { to: '/category/women', label: 'Women' },
  { to: '/category/unisex', label: 'Unisex' },
]

export default function Layout() {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Announcement Bar */}
      <div style={{
        background: '#0a0a0a',
        color: '#fafafa',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.5px',
      }}>
        FREE SHIPPING ON ORDERS OVER KSh 5,000 | USE CODE: <strong>WELCOME10</strong>
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Left: Menu + Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'none',
              }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link to="/" style={{
              fontWeight: 800,
              fontSize: '22px',
              letterSpacing: '-0.5px',
              textDecoration: 'none',
              color: '#0a0a0a',
              textTransform: 'uppercase',
            }}>
              MAVAZI
            </Link>
          </div>

          {/* Center: Nav */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: location.pathname === link.to ? '#0a0a0a' : '#737373',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link to="/shop" style={{ padding: '8px', color: '#0a0a0a' }}>
              <Search size={20} />
            </Link>
            <Link to="/wishlist" style={{ padding: '8px', color: '#0a0a0a' }}>
              <Heart size={20} />
            </Link>
            <Link to="/account" style={{ padding: '8px', color: '#0a0a0a' }}>
              <User size={20} />
            </Link>
            <Link to="/cart" style={{
              padding: '8px',
              color: '#0a0a0a',
              position: 'relative',
            }}>
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: '#0a0a0a',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            borderBottom: '1px solid #e5e5e5',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#0a0a0a',
                  padding: '8px 0',
                  borderBottom: '1px solid #f5f5f5',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        background: '#0a0a0a',
        color: '#a3a3a3',
        padding: '64px 0 32px',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}>
            {/* Brand */}
            <div>
              <h3 style={{ color: '#fafafa', fontSize: '20px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                MAVAZI
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Premium fashion for the modern Kenyan. Quality clothing delivered to your doorstep.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 style={{ color: '#fafafa', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Shop
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/category/men" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>Men</Link>
                <Link to="/category/women" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>Women</Link>
                <Link to="/shop" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>All Products</Link>
              </div>
            </div>

            {/* Help */}
            <div>
              <h4 style={{ color: '#fafafa', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Help
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/contact" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>Contact Us</Link>
                <span style={{ fontSize: '14px' }}>Shipping Info</span>
                <span style={{ fontSize: '14px' }}>Returns</span>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 style={{ color: '#fafafa', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Connect
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>Instagram</span>
                <span style={{ fontSize: '14px' }}>Twitter / X</span>
                <span style={{ fontSize: '14px' }}>TikTok</span>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #262626',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <p style={{ fontSize: '13px' }}>© 2026 MAVAZI. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
              <span>M-Pesa</span>
              <span>Visa</span>
              <span>Mastercard</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  )
}
