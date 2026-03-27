import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-4">
      <div>
        <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trang không tồn tại</h2>
        <p className="text-gray-500 mb-6">Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm.</p>
        <Link href="/" className="btn-primary">Về trang chủ</Link>
      </div>
    </div>
  )
}
