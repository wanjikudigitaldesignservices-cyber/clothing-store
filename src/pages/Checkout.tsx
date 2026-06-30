import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { formatPrice } from '@/lib/mockData'
import { useState } from 'react'
import { Lock, CreditCard, Phone } from 'lucide-react'
import { toast } from 'sonner'

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore()
  const total = getCartTotal()
  const shipping = total >= 5000 ? 0 : 300
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa')

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>No items to checkout</h1>
        <Link to="/shop" style={{ color: '#525252', marginTop: '12px', display: 'inline-block', textDecoration: 'none' }}>← Back to shop</Link>
      </div>
    )
  }

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully! You will receive an M-Pesa prompt shortly.')
    clearCart()
  }

  return (
    <div className="container" style={{ padding: '32px 1rem 64px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.5px' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="checkout-grid">
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Contact */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input placeholder="Email address" type="email" style={{
                width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }} />
              <input placeholder="Phone number (for M-Pesa)" type="tel" style={{
                width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }} />
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Shipping Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input placeholder="First name" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                <input placeholder="Last name" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
              </div>
              <input placeholder="Address" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input placeholder="City / Town" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
                <input placeholder="Postal code" style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
              </div>
              <input placeholder="County" style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                border: paymentMethod === 'mpesa' ? '2px solid #0a0a0a' : '1px solid #e5e5e5',
                borderRadius: '10px',
                cursor: 'pointer',
                background: paymentMethod === 'mpesa' ? '#fafafa' : '#fff',
              }}>
                <input type="radio" name="payment" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} />
                <Phone size={20} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>M-Pesa</span>
                  <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>Pay via M-Pesa STK Push</p>
                </div>
                <span style={{ marginLeft: 'auto', background: '#16a34a', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                  Popular
                </span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                border: paymentMethod === 'card' ? '2px solid #0a0a0a' : '1px solid #e5e5e5',
                borderRadius: '10px',
                cursor: 'pointer',
                background: paymentMethod === 'card' ? '#fafafa' : '#fff',
              }}>
                <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <CreditCard size={20} />
                <div>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Credit / Debit Card</span>
                  <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>Visa, Mastercard</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{
          padding: '24px',
          background: '#fafafa',
          borderRadius: '16px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px' }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {items.map(item => (
              <div key={item.variant_id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {item.image_url && (
                  <img src={item.image_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, margin: 0 }}>{item.product_name}</p>
                  <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{item.color} / {item.size} × {item.quantity}</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#737373' }}>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: '#737373' }}>Shipping</span>
              <span style={{ color: shipping === 0 ? '#16a34a' : 'inherit' }}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px' }}>
              <span>Total</span>
              <span>{formatPrice(total + shipping)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#0a0a0a',
              color: '#fff',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <Lock size={14} /> Place Order — {formatPrice(total + shipping)}
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#737373', marginTop: '12px' }}>
            Secured by IntaSend. Your data is protected.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr 400px !important; }
        }
      `}</style>
    </div>
  )
}
