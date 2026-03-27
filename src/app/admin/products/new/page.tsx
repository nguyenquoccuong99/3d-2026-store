import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
          <p className="text-gray-500 text-sm mt-0.5">Điền thông tin để thêm sản phẩm vào cửa hàng</p>
        </div>
      </div>
      <ProductForm mode="create" />
    </div>
  )
}
