'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const total = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gray-700" />
            <span className="font-semibold text-gray-900">Giỏ hàng</span>
            <span className="badge bg-gray-100 text-gray-700">{totalItems} sản phẩm</span>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">Giỏ hàng trống</h3>
              <p className="text-sm text-gray-400 mb-4">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
              <button
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{item.product.name}</h4>
                  {item.variant && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.variant.value}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-900 text-sm">{formatPrice(item.product.price)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                        className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                        className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id, item.variant?.id)}
                  className="p-1 hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 size={16} className="text-gray-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Tạm tính</span>
              <span className="font-medium text-gray-900">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Phí vận chuyển</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
              <span>Tổng cộng</span>
              <span className="text-lg">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full btn-primary justify-center text-sm"
            >
              Thanh toán ngay <ArrowRight size={16} />
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  )
}
