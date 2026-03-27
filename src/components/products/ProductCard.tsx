'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, formatDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const [isWished, setIsWished] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.images[0])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    openCart()
  }

  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : 0

  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.slug}`} className="card flex gap-4 p-4 hover:shadow-lg">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
          <Image src={imgSrc} alt={product.name} fill className="object-cover" sizes="128px"
            onError={() => setImgSrc('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600')} />
          {product.isSale && discount > 0 && (
            <span className="absolute top-2 left-2 badge bg-red-500 text-white text-xs">-{discount}%</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs text-blue-600 font-medium">{product.category}</span>
              <h3 className="font-semibold text-gray-900 mt-0.5 line-clamp-2">{product.name}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-1 mt-2">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <button onClick={handleAddToCart} className="btn-primary text-sm">
              <ShoppingCart size={16} /> Thêm vào giỏ
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.slug}`} className="card group block overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600')}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && <span className="badge bg-blue-600 text-white">Mới</span>}
          {product.isSale && discount > 0 && <span className="badge bg-red-500 text-white">-{discount}%</span>}
        </div>

        {/* Actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => { e.preventDefault(); setIsWished(!isWished) }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${isWished ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
          >
            <Heart size={16} className={isWished ? 'fill-current' : ''} />
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Add to cart bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <ShoppingCart size={16} /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-500 mt-1">Chỉ còn {product.stock} sản phẩm</p>
        )}
      </div>
    </Link>
  )
}
