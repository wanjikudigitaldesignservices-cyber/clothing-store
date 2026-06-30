import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

export default function Contact() {
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success('Message sent! We\'ll get back to you within 24 hours.')
    }, 1000)
  }

  return (
    <div className="container" style={{ padding: '64px 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.5px' }}>Get in Touch</h1>
        <p style={{ color: '#737373', fontSize: '15px' }}>We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }} className="contact-grid">
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { icon: <Mail size={20} />, title: 'Email', value: 'hello@mavazi.co.ke' },
            { icon: <Phone size={20} />, title: 'Phone', value: '+254 700 000 000' },
            { icon: <MapPin size={20} />, title: 'Location', value: 'Nairobi, Kenya' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', background: '#f5f5f5', borderRadius: '10px', color: '#525252' }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#737373', margin: 0 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input placeholder="Your name" required style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
            <input placeholder="Email address" type="email" required style={{ padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
          </div>
          <input placeholder="Subject" required style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          <textarea
            placeholder="Your message..."
            rows={6}
            required
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
          <button type="submit" disabled={sending} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#0a0a0a',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            opacity: sending ? 0.7 : 1,
            alignSelf: 'flex-start',
          }}>
            <Send size={14} /> {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1.5fr !important; }
        }
      `}</style>
    </div>
  )
}
