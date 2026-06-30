import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES, formatPrice } from '@/lib/mockData'
import { ArrowRight, Truck, Shield, RotateCcw, Star } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const addItem = useCartStore(s => s.addItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      variant_id: `${product.id}-${product.sizes[0]}-${product.colors[0].name}`,
      product_name: product.name,
      size: product.sizes[0],
      color: product.colors[0].name,
      price: product.price,
      quantity: 1,
      image_url: product.images[0],
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', background: '#f5f5f5' }}>
        <div style={{ position: 'relative', paddingBottom: '125%', overflow: 'hidden' }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: product.badge === 'Sale' ? '#dc2626' : '#0a0a0a',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {product.badge}
          </span>
        )}
        <button
          onClick={handleQuickAdd}
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            background: 'rgba(10,10,10,0.9)',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all 0.3s ease',
          }}
          className="quick-add-btn"
        >
          Quick Add
        </button>
      </div>
      <div style={{ padding: '12px 4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>{product.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          <Star size={12} fill="#facc15" stroke="#facc15" />
          <span style={{ fontSize: '12px', color: '#737373' }}>{product.rating} ({product.reviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700 }}>{formatPrice(product.price)}</span>
          {product.original_price && (
            <span style={{ fontSize: '13px', color: '#a3a3a3', textDecoration: 'line-through' }}>
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
          {product.colors.map(c => (
            <span key={c.name} style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: c.hex,
              border: '1px solid #e5e5e5',
            }} />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const featured = PRODUCTS.slice(0, 4)
  const newArrivals = PRODUCTS.slice(4)

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '500px',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop"
          alt="Fashion hero"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }} />
        <div className="container" style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '80px',
          color: '#fff',
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            color: '#d4d4d4',
          }}>
            NEW COLLECTION 2026
          </span>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.05,
            margin: '0 0 20px',
            maxWidth: '600px',
            letterSpacing: '-1.5px',
          }}>
            Elevate Your Wardrobe
          </h1>
          <p style={{
            fontSize: '16px',
            maxWidth: '450px',
            marginBottom: '32px',
            color: '#d4d4d4',
            lineHeight: 1.6,
          }}>
            Discover premium quality clothing crafted for the modern lifestyle. Free shipping on orders over KSh 5,000.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff',
              color: '#0a0a0a',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'transform 0.2s',
            }}>
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link to="/category/women" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              Women's Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{
        borderBottom: '1px solid #e5e5e5',
        padding: '24px 0',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          textAlign: 'center',
        }}>
          {[
            { icon: <Truck size={20} />, title: 'Free Shipping', sub: 'On orders over KSh 5,000' },
            { icon: <Shield size={20} />, title: 'Secure Payment', sub: 'M-Pesa & Card accepted' },
            { icon: <RotateCcw size={20} />, title: 'Easy Returns', sub: '30-day return policy' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ color: '#525252' }}>{item.icon}</div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 600, fontSize: '13px', margin: 0 }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: '#737373', margin: 0 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Shop by Category</h2>
            <Link to="/shop" style={{ fontSize: '14px', color: '#525252', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', paddingBottom: '100%' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  }} />
                  <span style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '15px',
                  }}>
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>Featured Products</h2>
            <Link to="/shop" style={{ fontSize: '14px', color: '#525252', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section style={{
        background: '#f5f5f5',
        padding: '80px 0',
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#737373' }}>
            LIMITED TIME
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, margin: '12px 0 16px', letterSpacing: '-1px' }}>
            Up to 40% Off New Season Styles
          </h2>
          <p style={{ color: '#737373', marginBottom: '28px', fontSize: '15px' }}>
            Don't miss our biggest sale of the year. Use code WELCOME10 at checkout.
          </p>
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
            Shop the Sale <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 32px', letterSpacing: '-0.5px' }}>New Arrivals</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <style>{`
        .quick-add-btn:hover { opacity: 1 !important; }
        div:hover > .quick-add-btn { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </div>
  )
}
