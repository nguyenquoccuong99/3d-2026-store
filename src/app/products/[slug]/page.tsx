import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Truck, Shield, RotateCcw, ChevronRight, Package } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice, formatDiscount } from '@/lib/utils'
import AddToCartButton from '@/components/products/AddToCartButton'
import ProductCard from '@/components/products/ProductCard'

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : 0
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-gray-700">Sản phẩm</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.isSale && discount > 0 && (
                <div className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1">-{discount}%</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white border-2 border-gray-200 cursor-pointer hover:border-gray-900 transition-colors">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-3" sizes="100px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-blue-50 text-blue-700">{product.category}</span>
              {product.isNew && <span className="badge bg-green-50 text-green-700">Mới</span>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString()} đánh giá)</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 text-sm font-medium">Còn {product.stock} sản phẩm</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge bg-red-100 text-red-600 text-sm">Tiết kiệm {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Lựa chọn màu sắc:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      className="px-4 py-2 border-2 border-gray-200 hover:border-gray-900 rounded-lg text-sm font-medium transition-colors"
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Guarantees */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: 'Miễn phí vận chuyển' },
                { icon: Shield, text: 'Bảo hành 12 tháng' },
                { icon: RotateCcw, text: 'Đổi trả 30 ngày' },
                { icon: Package, text: 'Hàng chính hãng' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon size={16} className="text-green-600 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
