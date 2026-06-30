import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/mockData'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore()
  const total = getCartTotal()

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 1rem', textAlign: 'center' }}>
        <ShoppingBag size={48} color="#d4d4d4" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Your cart is empty</h1>
        <p style={{ color: '#737373', marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
        <Link to="/shop" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#0a0a0a',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 1rem 64px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.5px' }}>
        Shopping Cart
        <span style={{ fontSize: '15px', fontWeight: 400, color: '#737373', marginLeft: '8px' }}>
          ({items.length} {items.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="cart-grid">
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(item => (
            <div key={item.variant_id} style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
            }}>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 4px' }}>{item.product_name}</h3>
                  <p style={{ fontSize: '13px', color: '#737373', margin: 0 }}>
                    {item.color} / {item.size}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e5e5e5',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}>
                    <button onClick={() => updateQuantity(item.variant_id, Math.max(1, item.quantity - 1))} style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: '0 12px', fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variant_id, item.quantity + 1)} style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{formatPrice(item.price * item.quantity)}</span>
                  <button onClick={() => removeItem(item.variant_id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc2626',
              fontSize: '13px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              padding: '4px 0',
            }}
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div style={{
          padding: '24px',
          background: '#fafafa',
          borderRadius: '16px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px' }}>Order Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#737373' }}>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#737373' }}>Shipping</span>
              <span style={{ color: total >= 5000 ? '#16a34a' : 'inherit' }}>
                {total >= 5000 ? 'Free' : formatPrice(300)}
              </span>
            </div>
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px' }}>
              <span>Total</span>
              <span>{formatPrice(total >= 5000 ? total : total + 300)}</span>
            </div>
          </div>

          <Link to="/checkout" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#0a0a0a',
            color: '#fff',
            padding: '14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            width: '100%',
          }}>
            Proceed to Checkout <ArrowRight size={16} />
          </Link>

          <Link to="/shop" style={{
            display: 'block',
            textAlign: 'center',
            color: '#525252',
            fontSize: '13px',
            marginTop: '12px',
            textDecoration: 'none',
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cart-grid { grid-template-columns: 1fr 380px !important; }
        }
      `}</style>
    </div>
  )
}
