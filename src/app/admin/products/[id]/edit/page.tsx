import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()

  const images = JSON.parse(product.images) as string[]
  const tags = JSON.parse(product.tags) as string[]

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: String(product.price),
    originalPrice: product.originalPrice ? String(product.originalPrice) : '',
    images,
    category: product.category,
    tags: tags.join(', '),
    stock: String(product.stock),
    rating: String(product.rating),
    reviewCount: String(product.reviewCount),
    featured: product.featured,
    isNew: product.isNew,
    isSale: product.isSale,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{product.name}</p>
        </div>
      </div>
      <ProductForm mode="edit" initialData={initialData} />
    </div>
  )
}
