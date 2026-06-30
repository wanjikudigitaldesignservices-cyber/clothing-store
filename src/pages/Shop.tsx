import { useParams } from 'react-router-dom'

export default function Shop() {
  const { slug } = useParams()
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold capitalize">{slug ? `${slug} Collection` : 'All Products'}</h1>
      <p className="mt-4 text-muted-foreground">Product grid goes here.</p>
    </div>
  )
}
