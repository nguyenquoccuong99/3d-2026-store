import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package, TrendingUp, ShoppingBag, Tag, Plus, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [totalProducts, featuredCount, saleCount, newCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({ where: { isSale: true } }),
    prisma.product.count({ where: { isNew: true } }),
  ])

  const recentProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const stats = [
    { label: 'Tổng sản phẩm', value: totalProducts, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Sản phẩm nổi bật', value: featuredCount, icon: TrendingUp, color: 'bg-yellow-500', link: '/admin/products?filter=featured' },
    { label: 'Đang giảm giá', value: saleCount, icon: Tag, color: 'bg-red-500', link: '/admin/products?filter=sale' },
    { label: 'Hàng mới về', value: newCount, icon: ShoppingBag, color: 'bg-green-500', link: '/admin/products?filter=new' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Xin chào, Admin! Đây là tổng quan cửa hàng.</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Thêm sản phẩm
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Sản phẩm mới thêm</h2>
          <Link href="/admin/products" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentProducts.map((product) => {
            const images = JSON.parse(product.images) as string[]
            return (
              <div key={product.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category} · Còn {product.stock} SP</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </p>
                  <div className="flex gap-1 justify-end mt-1">
                    {product.featured && <span className="badge bg-yellow-100 text-yellow-700 text-xs">Nổi bật</span>}
                    {product.isSale && <span className="badge bg-red-100 text-red-600 text-xs">Sale</span>}
                  </div>
                </div>
                <Link href={`/admin/products/${product.id}/edit`} className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-700 flex-shrink-0">
                  <ArrowRight size={16} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
