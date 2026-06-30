import { Outlet, Link } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/40">
      <aside className="w-full md:w-64 border-r bg-background flex flex-col">
        <div className="p-4 border-b h-16 flex items-center">
          <span className="font-bold">Admin Portal</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link to="/admin" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Dashboard</Link>
          <Link to="/admin/orders" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Orders</Link>
          <Link to="/admin/products" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium">Products</Link>
          <Link to="/" className="px-3 py-2 rounded-md hover:bg-muted text-sm font-medium mt-auto">Back to Store</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
