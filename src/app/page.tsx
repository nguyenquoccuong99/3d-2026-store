import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, TrendingUp, Award, ChevronRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { products, categories } from '@/data/products'

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured)
  const newProducts = products.filter(p => p.isNew)
  const saleProducts = products.filter(p => p.isSale)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium mb-6">
              <Zap size={14} />
              Bộ sưu tập 2026 đã ra mắt
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Công nghệ
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Đỉnh Cao
              </span>
              Cho Bạn
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              Khám phá hàng ngàn sản phẩm công nghệ chính hãng với giá tốt nhất. Bảo hành dài hạn, giao hàng tận nơi toàn quốc.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary bg-blue-600 hover:bg-blue-700 text-base px-8 py-4">
                Mua ngay <ArrowRight size={18} />
              </Link>
              <Link href="/sale" className="btn-secondary border-gray-500 text-gray-300 hover:bg-white hover:text-gray-900 text-base px-8 py-4">
                Xem khuyến mãi
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-10">
              {[
                { value: '50K+', label: 'Khách hàng' },
                { value: '10K+', label: 'Sản phẩm' },
                { value: '99%', label: 'Hài lòng' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1695048133142-1a20484bce71?w=600"
                alt="iPhone 15 Pro Max"
                fill
                className="object-contain p-8"
                sizes="500px"
                priority
              />
              {/* Floating card */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Bán chạy nhất</div>
                    <div className="text-xs text-gray-300">iPhone 15 Pro Max</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-yellow-400" />
                  <span className="text-sm font-medium">Chính hãng 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Danh mục sản phẩm</h2>
              <p className="text-gray-500 mt-1">Tìm kiếm theo danh mục bạn yêu thích</p>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="card p-4 text-center hover:border-blue-200 border-2 border-transparent group"
              >
                <div className="relative w-14 h-14 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-100">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="56px" />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 line-clamp-1">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{cat.productCount} SP</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
              <p className="text-gray-500 mt-1">Được lựa chọn kỹ lưỡng dành cho bạn</p>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden p-8 md:p-12">
            <div className="absolute right-0 top-0 w-96 h-full opacity-10">
              <Image src="https://images.unsplash.com/photo-1696048066442-c5b8e93cb7f7?w=600" alt="" fill className="object-cover" sizes="400px" />
            </div>
            <div className="relative max-w-lg">
              <span className="badge bg-yellow-400 text-yellow-900 mb-3">Flash Sale</span>
              <h3 className="text-3xl font-bold text-white mb-3">Giảm đến 30%<br />Sản phẩm Apple</h3>
              <p className="text-blue-200 mb-6">Ưu đãi có hạn trong tuần này. Đừng bỏ lỡ!</p>
              <Link href="/sale" className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Mua ngay <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hàng mới về</h2>
              <p className="text-gray-500 mt-1">Những sản phẩm mới nhất vừa cập bến</p>
            </div>
            <Link href="/products?filter=new" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Xem tất cả <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Đang giảm giá</h2>
              <p className="text-gray-500 mt-1">Tiết kiệm đến 30% cho các sản phẩm chọn lọc</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-gray-500 mb-10">Hơn 50,000 khách hàng hài lòng trên toàn quốc</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Nguyễn Văn An', role: 'Sinh viên', text: 'Mua hàng rất nhanh, sản phẩm đúng như mô tả. Sẽ tiếp tục ủng hộ 3D Store!', rating: 5 },
              { name: 'Trần Thị Bích', role: 'Designer', text: 'Chất lượng sản phẩm tuyệt vời, giá cả hợp lý. Nhân viên tư vấn nhiệt tình.', rating: 5 },
              { name: 'Lê Minh Tuấn', role: 'Kỹ sư IT', text: 'Giao hàng siêu nhanh, đóng gói cẩn thận. MacBook Pro nhận được hoàn hảo!', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="card p-6 text-left">
                <div className="flex mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
