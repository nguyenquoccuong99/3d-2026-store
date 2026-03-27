'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, Heart, User, ChevronDown, Phone, Mail } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { categories } from '@/data/products'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products', hasDropdown: true },
    { label: 'Khuyến mãi', href: '/sale' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
  ]

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> 1800-9999</span>
            <span className="flex items-center gap-1"><Mail size={12} /> support@3dstore.vn</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Miễn phí vận chuyển đơn từ 500K</span>
            <span>|</span>
            <span>Bảo hành chính hãng 12 tháng</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <div>
                <span className="font-bold text-lg text-gray-900">3D Store</span>
                <span className="block text-xs text-gray-500 -mt-1">Tech & Gadgets</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex">
                <Heart size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex">
                <User size={20} className="text-gray-600" />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} className="text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-slide-up">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm"
                  autoFocus
                />
                {searchQuery && (
                  <Link
                    href={`/products?search=${searchQuery}`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 font-medium"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Tìm kiếm
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
