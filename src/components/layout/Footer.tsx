import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Đơn hàng từ 500.000đ' },
            { icon: Shield, title: 'Bảo hành chính hãng', desc: 'Bảo hành 12-24 tháng' },
            { icon: RotateCcw, title: 'Đổi trả dễ dàng', desc: 'Trong vòng 30 ngày' },
            { icon: CreditCard, title: 'Thanh toán an toàn', desc: 'SSL 256-bit encryption' },
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{feature.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <div>
              <div className="font-bold text-white">3D Store</div>
              <div className="text-xs text-gray-400">Tech & Gadgets</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Chuyên cung cấp các sản phẩm công nghệ chính hãng, uy tín hàng đầu Việt Nam từ năm 2026.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Sản phẩm</h3>
          <ul className="space-y-2">
            {['Điện thoại', 'Laptop', 'Tai nghe', 'Đồng hồ thông minh', 'Máy tính bảng', 'Phụ kiện'].map((item) => (
              <li key={item}>
                <Link href="/products" className="text-sm hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Hỗ trợ</h3>
          <ul className="space-y-2">
            {['Tra cứu đơn hàng', 'Chính sách vận chuyển', 'Chính sách đổi trả', 'Bảo hành', 'Câu hỏi thường gặp', 'Liên hệ'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
              123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Phone size={16} className="flex-shrink-0 text-blue-400" />
              1800-9999 (Miễn phí)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail size={16} className="flex-shrink-0 text-blue-400" />
              support@3dstore.vn
            </li>
          </ul>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white mb-2">Nhận tin khuyến mãi</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2026 3D Store. Tất cả quyền được bảo lưu.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-gray-300">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-300">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
