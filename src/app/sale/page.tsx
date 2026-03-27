import Link from 'next/link'
import { Tag } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { products } from '@/data/products'

export default function SalePage() {
  const saleProducts = products.filter(p => p.isSale)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Tag size={24} />
            <span className="font-semibold text-lg">FLASH SALE</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Siêu khuyến mãi</h1>
          <p className="text-red-100">Giảm đến 30% cho các sản phẩm chọn lọc · {saleProducts.length} sản phẩm đang sale</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
