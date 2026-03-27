'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Số lượng:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200 ${
            added
              ? 'bg-green-600 text-white'
              : product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-700'
          }`}
        >
          {added ? (
            <><Check size={20} /> Đã thêm vào giỏ</>
          ) : (
            <><ShoppingCart size={20} /> {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}</>
          )}
        </button>
        <button className="px-6 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all">
          Mua ngay
        </button>
      </div>
    </div>
  )
}
