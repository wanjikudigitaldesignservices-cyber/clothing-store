import { Link, useParams } from 'react-router-dom'
import { PRODUCTS, formatPrice } from '@/lib/mockData'
import { Star, SlidersHorizontal } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { useState, useMemo } from 'react'

export default function Shop() {
  const { slug } = useParams()
  const addItem = useCartStore(s => s.addItem)
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS]

    // Filter by route param (gender or category)
    if (slug) {
      list = list.filter(p =>
        p.gender === slug || p.category === slug
      )
    }

    // Filter by sidebar category
    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return list
  }, [slug, sortBy, selectedCategory])

  const title = slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : 'All Products'

  const categories = [...new Set(PRODUCTS.map(p => p.category))]

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
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
    <div className="container" style={{ padding: '32px 1rem 64px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#737373', marginBottom: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#737373' }}>Home</Link>
        <span>/</span>
        <span style={{ color: '#0a0a0a' }}>{title}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
          {title}
          <span style={{ fontSize: '15px', fontWeight: 400, color: '#737373', marginLeft: '12px' }}>
            ({filteredProducts.length} products)
          </span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SlidersHorizontal size={16} color="#737373" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Sidebar Filters */}
        <aside style={{ width: '200px', flexShrink: 0, display: 'none' }} className="shop-sidebar">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Category
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                background: !selectedCategory ? '#0a0a0a' : 'transparent',
                color: !selectedCategory ? '#fff' : '#525252',
                border: '1px solid #e5e5e5',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#0a0a0a' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : '#525252',
                  border: '1px solid #e5e5e5',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#737373' }}>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>No products found</p>
              <p style={{ fontSize: '14px' }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '24px',
            }}>
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
                        textTransform: 'uppercase',
                      }}>
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); handleQuickAdd(product) }}
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
                        transition: 'opacity 0.3s',
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
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .shop-sidebar { display: block !important; }
        }
        div:hover > .quick-add-btn { opacity: 1 !important; }
      `}</style>
    </div>
  )
}
