import { useParams, Link } from 'react-router-dom'
import { PRODUCTS, formatPrice } from '@/lib/mockData'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { useState } from 'react'
import { Star, Minus, Plus, Heart, Truck, RotateCcw, Shield } from 'lucide-react'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = PRODUCTS.find(p => p.slug === slug)
  const addItem = useCartStore(s => s.addItem)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Product not found</h1>
        <Link to="/shop" style={{ color: '#525252', marginTop: '12px', display: 'inline-block' }}>← Back to shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return }
    if (!selectedColor) { toast.error('Please select a color'); return }
    addItem({
      variant_id: `${product.id}-${selectedSize}-${selectedColor}`,
      product_name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      quantity,
      image_url: product.images[0],
    })
    toast.success(`${product.name} added to cart!`)
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="container" style={{ padding: '32px 1rem 64px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#737373', marginBottom: '32px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#737373' }}>Home</Link>
        <span>/</span>
        <Link to="/shop" style={{ textDecoration: 'none', color: '#737373' }}>Shop</Link>
        <span>/</span>
        <span style={{ color: '#0a0a0a' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }} className="pdp-grid">
        {/* Images */}
        <div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#f5f5f5', marginBottom: '12px' }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: selectedImage === i ? '2px solid #0a0a0a' : '2px solid transparent',
                  padding: 0,
                  cursor: 'pointer',
                  background: 'none',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span style={{
              display: 'inline-block',
              background: product.badge === 'Sale' ? '#fef2f2' : '#f5f5f5',
              color: product.badge === 'Sale' ? '#dc2626' : '#0a0a0a',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '12px',
            }}>
              {product.badge}
            </span>
          )}

          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} fill={i <= Math.round(product.rating) ? '#facc15' : '#e5e5e5'} stroke={i <= Math.round(product.rating) ? '#facc15' : '#e5e5e5'} />
              ))}
            </div>
            <span style={{ fontSize: '13px', color: '#737373' }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700 }}>{formatPrice(product.price)}</span>
            {product.original_price && (
              <>
                <span style={{ fontSize: '18px', color: '#a3a3a3', textDecoration: 'line-through' }}>
                  {formatPrice(product.original_price)}
                </span>
                <span style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p style={{ color: '#525252', lineHeight: 1.7, marginBottom: '28px', fontSize: '15px' }}>
            {product.description}
          </p>

          {/* Color */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Color: {selectedColor && <span style={{ fontWeight: 400, textTransform: 'capitalize' }}>{selectedColor}</span>}
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.colors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: selectedColor === c.name ? '3px solid #0a0a0a' : '2px solid #e5e5e5',
                    cursor: 'pointer',
                    padding: 0,
                    outline: selectedColor === c.name ? '2px solid #fff' : 'none',
                    outlineOffset: '-4px',
                  }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Size
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    minWidth: '48px',
                    height: '44px',
                    borderRadius: '8px',
                    background: selectedSize === s ? '#0a0a0a' : '#fff',
                    color: selectedSize === s ? '#fff' : '#0a0a0a',
                    border: selectedSize === s ? 'none' : '1px solid #d4d4d4',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '0 16px',
                    transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 16px', fontWeight: 600, fontSize: '14px', minWidth: '32px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                minWidth: '200px',
                background: '#0a0a0a',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              Add to Cart — {formatPrice(product.price * quantity)}
            </button>
            <button style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Heart size={18} />
            </button>
          </div>

          {/* Benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px', background: '#fafafa', borderRadius: '12px' }}>
            {[
              { icon: <Truck size={16} />, text: 'Free shipping over KSh 5,000' },
              { icon: <RotateCcw size={16} />, text: '30-day hassle-free returns' },
              { icon: <Shield size={16} />, text: 'Secure M-Pesa & card payment' },
            ].map(b => (
              <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#525252' }}>
                {b.icon}
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .pdp-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
