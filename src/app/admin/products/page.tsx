import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Search, Package } from 'lucide-react'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} sản phẩm</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
          <Plus size={16} /> Thêm sản phẩm
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Sản phẩm</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Danh mục</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Giá</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Kho</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Trạng thái</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => {
                const images = JSON.parse(product.images) as string[]
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {images[0] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </span>
                      {product.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex gap-1 justify-center flex-wrap">
                        {product.featured && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Nổi bật</span>}
                        {product.isNew && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Mới</span>}
                        {product.isSale && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-medium">Sale</span>}
                        {!product.featured && !product.isNew && !product.isSale && (
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">Thường</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-gray-500"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={15} />
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p>Chưa có sản phẩm nào</p>
            <Link href="/admin/products/new" className="mt-3 inline-flex items-center gap-1 text-blue-600 text-sm hover:underline">
              <Plus size={14} /> Thêm sản phẩm đầu tiên
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
