import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { slug } = useParams()
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Product: {slug}</h1>
      <p className="mt-4 text-muted-foreground">Product details, variants, and add to cart go here.</p>
    </div>
  )
}
