import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  title: '3D Store - Công nghệ chính hãng',
  description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng: iPhone, Samsung, MacBook, Sony và nhiều thương hiệu hàng đầu thế giới.',
  keywords: 'điện thoại, laptop, tai nghe, đồng hồ thông minh, phụ kiện công nghệ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
