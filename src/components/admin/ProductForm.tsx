'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus, X, Save } from 'lucide-react'

interface ProductFormData {
  id?: string
  name: string
  slug: string
  description: string
  price: string
  originalPrice: string
  images: string[]
  category: string
  tags: string
  stock: string
  rating: string
  reviewCount: string
  featured: boolean
  isNew: boolean
  isSale: boolean
}

const defaultForm: ProductFormData = {
  name: '',
  slug: '',
  description: '',
  price: '',
  originalPrice: '',
  images: [''],
  category: '',
  tags: '',
  stock: '0',
  rating: '0',
  reviewCount: '0',
  featured: false,
  isNew: false,
  isSale: false,
}

const CATEGORIES = ['Điện thoại', 'Laptop', 'Tai nghe', 'Đồng hồ', 'Máy tính bảng', 'Phụ kiện']

interface ProductFormProps {
  initialData?: Partial<ProductFormData>
  mode: 'create' | 'edit'
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>({ ...defaultForm, ...initialData })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      stock: Number(form.stock),
      rating: Number(form.rating),
      reviewCount: Number(form.reviewCount),
      images: form.images.filter(Boolean),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }

    try {
      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${form.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Có lỗi xảy ra')
        return
      }

      router.push('/admin/products')
      router.refresh()
    } catch {
      setError('Có lỗi xảy ra, thử lại')
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase()
      .replace(/đ/g, 'd').replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    setForm(p => ({ ...p, name, slug }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Thông tin cơ bản</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="iPhone 15 Pro Max 256GB"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
            placeholder="iphone-15-pro-max-256gb"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Mô tả chi tiết sản phẩm..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
          <select
            required
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm bg-white"
          >
            <option value="">-- Chọn danh mục --</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
            placeholder="apple, iphone, flagship"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Price & Stock */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Giá & Kho hàng</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ) *</label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
              placeholder="33990000"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (VNĐ)</label>
            <input
              type="number"
              min="0"
              value={form.originalPrice}
              onChange={e => setForm(p => ({ ...p, originalPrice: e.target.value }))}
              placeholder="36990000"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng kho *</label>
            <input
              type="number"
              required
              min="0"
              value={form.stock}
              onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
              placeholder="10"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <h2 className="font-semibold text-gray-900">Hình ảnh sản phẩm</h2>
        {form.images.map((img, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="url"
              value={img}
              onChange={e => {
                const newImages = [...form.images]
                newImages[i] = e.target.value
                setForm(p => ({ ...p, images: newImages }))
              }}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
            />
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
            )}
            {form.images.length > 1 && (
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm(p => ({ ...p, images: [...p.images, ''] }))}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={14} /> Thêm ảnh
        </button>
      </div>

      {/* Status */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Trạng thái</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { key: 'featured', label: 'Sản phẩm nổi bật', desc: 'Hiển thị ở trang chủ' },
            { key: 'isNew', label: 'Hàng mới về', desc: 'Hiển thị badge "Mới"' },
            { key: 'isSale', label: 'Đang giảm giá', desc: 'Hiển thị badge "Sale"' },
          ].map(opt => (
            <label key={opt.key} className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${form[opt.key as keyof ProductFormData] ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="checkbox"
                checked={form[opt.key as keyof ProductFormData] as boolean}
                onChange={e => setForm(p => ({ ...p, [opt.key]: e.target.checked }))}
                className="mt-0.5"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">{opt.label}</div>
                <div className="text-xs text-gray-500">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {mode === 'create' ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
