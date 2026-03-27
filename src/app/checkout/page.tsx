'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, CreditCard, Truck, Shield, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderDone, setOrderDone] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', note: '',
    paymentMethod: 'cod',
  })

  const total = getTotalPrice()
  const shipping = total >= 500000 ? 0 : 30000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsProcessing(false)
    setOrderDone(true)
    clearCart()
  }

  if (orderDone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
          <p className="text-gray-500 mb-2">Mã đơn hàng: <strong>#3D{Date.now().toString().slice(-6)}</strong></p>
          <p className="text-gray-500 mb-6 text-sm">
            Chúng tôi sẽ liên hệ xác nhận và giao hàng trong 1-3 ngày làm việc. Cảm ơn bạn đã tin tưởng 3D Store!
          </p>
          <Link href="/" className="btn-primary w-full justify-center">Tiếp tục mua sắm</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Giỏ hàng trống</h2>
          <Link href="/products" className="btn-primary">Mua sắm ngay</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/products" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm">
          <ChevronLeft size={16} /> Tiếp tục mua sắm
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck size={18} /> Thông tin giao hàng
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Họ và tên', placeholder: 'Nguyễn Văn A', required: true },
                  { key: 'phone', label: 'Số điện thoại', placeholder: '0901 234 567', required: true },
                  { key: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email', required: true, full: false },
                  { key: 'city', label: 'Thành phố/Tỉnh', placeholder: 'TP. Hồ Chí Minh', required: true },
                ].map(field => (
                  <div key={field.key} className={field.full === false ? '' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <input
                    required
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                    value={form.address}
                    onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (tùy chọn)</label>
                  <textarea
                    rows={2}
                    placeholder="Ghi chú cho đơn hàng..."
                    value={form.note}
                    onChange={e => setForm(prev => ({ ...prev, note: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} /> Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán tiền mặt khi nhận hàng' },
                  { value: 'banking', label: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản qua tài khoản ngân hàng' },
                  { value: 'momo', label: 'Ví MoMo', desc: 'Thanh toán qua ví điện tử MoMo' },
                ].map(method => (
                  <label key={method.value} className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form.paymentMethod === method.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{method.label}</div>
                      <div className="text-xs text-gray-500">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary py-4 text-base justify-center"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                `Đặt hàng · ${formatPrice(total + shipping)}`
              )}
            </button>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="card p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Đơn hàng ({items.length} sản phẩm)</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white text-xs rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      {item.variant && <p className="text-xs text-gray-500">{item.variant.value}</p>}
                      <p className="text-sm font-semibold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tạm tính</span><span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Vận chuyển</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Tổng cộng</span><span className="text-lg">{formatPrice(total + shipping)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
              <Shield size={16} className="text-green-500" />
              Thanh toán được bảo mật SSL
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
