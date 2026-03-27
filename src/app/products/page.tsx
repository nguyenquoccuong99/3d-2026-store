'use client'

import { useState, useMemo } from 'react'
import { Filter, Grid3X3, List, ChevronDown } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/data/products'

const sortOptions = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'new', label: 'Mới nhất' },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000000])
  const [showFilters, setShowFilters] = useState(false)
  const [filterNew, setFilterNew] = useState(false)
  const [filterSale, setFilterSale] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory || categories.find(c => c.slug === selectedCategory)?.name === p.category)
    if (filterNew) result = result.filter(p => p.isNew)
    if (filterSale) result = result.filter(p => p.isSale)
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'new': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return result
  }, [selectedCategory, sortBy, priceRange, filterNew, filterSale])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Tất cả sản phẩm</h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} sản phẩm</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className={`w-64 flex-shrink-0 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                Tất cả ({products.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {cat.name} ({cat.productCount})
                </button>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Lọc</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filterNew} onChange={e => setFilterNew(e.target.checked)} className="rounded" />
                <span className="text-sm text-gray-700">Hàng mới về</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filterSale} onChange={e => setFilterSale(e.target.checked)} className="rounded" />
                <span className="text-sm text-gray-700">Đang giảm giá</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <Filter size={16} /> Bộ lọc
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-gray-400 bg-white"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-2">Không tìm thấy sản phẩm</p>
              <button onClick={() => { setSelectedCategory(''); setFilterNew(false); setFilterSale(false) }} className="btn-primary text-sm mt-4">
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
