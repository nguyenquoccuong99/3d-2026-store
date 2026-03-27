import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin user created')

  // Seed products
  const products = [
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, màn hình Super Retina XDR 6.7 inch, camera 48MP chuyên nghiệp và thiết kế titan sang trọng.',
      price: 33990000,
      originalPrice: 36990000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600']),
      category: 'Điện thoại',
      tags: JSON.stringify(['apple', 'iphone', 'flagship']),
      rating: 4.9,
      reviewCount: 2847,
      stock: 15,
      featured: true,
      isNew: true,
      isSale: true,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Galaxy S24 Ultra với bút S Pen tích hợp, màn hình Dynamic AMOLED 6.8 inch, camera 200MP và hiệu năng AI tiên tiến.',
      price: 31990000,
      originalPrice: 34990000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600', 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600']),
      category: 'Điện thoại',
      tags: JSON.stringify(['samsung', 'android', 'flagship']),
      rating: 4.8,
      reviewCount: 1923,
      stock: 22,
      featured: true,
      isNew: true,
      isSale: true,
    },
    {
      name: 'MacBook Pro 14" M3 Pro',
      slug: 'macbook-pro-14-m3-pro',
      description: 'MacBook Pro 14 inch với chip M3 Pro, màn hình Liquid Retina XDR, thời lượng pin lên đến 18 giờ và hiệu năng vượt trội.',
      price: 52990000,
      originalPrice: 56990000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', 'https://images.unsplash.com/photo-1611186871525-12af56e2c6f3?w=600']),
      category: 'Laptop',
      tags: JSON.stringify(['apple', 'macbook', 'laptop']),
      rating: 4.9,
      reviewCount: 1456,
      stock: 8,
      featured: true,
      isNew: false,
      isSale: true,
    },
    {
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh-1000xm5',
      description: 'Tai nghe chống ồn hàng đầu thế giới với chất lượng âm thanh Hi-Res, 30 giờ pin và thiết kế gập gọn tiện lợi.',
      price: 8490000,
      originalPrice: 9990000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600']),
      category: 'Tai nghe',
      tags: JSON.stringify(['sony', 'headphone', 'anc']),
      rating: 4.8,
      reviewCount: 3201,
      stock: 45,
      featured: true,
      isNew: false,
      isSale: true,
    },
    {
      name: 'Apple Watch Series 9 GPS 45mm',
      slug: 'apple-watch-series-9-gps-45mm',
      description: 'Apple Watch Series 9 với chip S9 SiP, màn hình Always-On Retina, tính năng Double Tap và theo dõi sức khỏe toàn diện.',
      price: 11990000,
      originalPrice: 13490000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600', 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600']),
      category: 'Đồng hồ',
      tags: JSON.stringify(['apple', 'smartwatch', 'health']),
      rating: 4.7,
      reviewCount: 987,
      stock: 30,
      featured: false,
      isNew: true,
      isSale: true,
    },
    {
      name: 'iPad Pro 12.9" M2 WiFi 256GB',
      slug: 'ipad-pro-129-m2-wifi-256gb',
      description: 'iPad Pro với chip M2, màn hình Liquid Retina XDR 12.9 inch, hỗ trợ Apple Pencil 2 và Magic Keyboard.',
      price: 28990000,
      originalPrice: null,
      images: JSON.stringify(['https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600']),
      category: 'Máy tính bảng',
      tags: JSON.stringify(['apple', 'ipad', 'tablet']),
      rating: 4.8,
      reviewCount: 756,
      stock: 12,
      featured: false,
      isNew: false,
      isSale: false,
    },
    {
      name: 'AirPods Pro 2nd Generation',
      slug: 'airpods-pro-2nd-gen',
      description: 'AirPods Pro thế hệ 2 với chip H2, chống ồn chủ động ANC cải tiến, âm thanh Spatial Audio và IP54 chống nước.',
      price: 6490000,
      originalPrice: 7490000,
      images: JSON.stringify(['https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=600', 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600']),
      category: 'Tai nghe',
      tags: JSON.stringify(['apple', 'airpods', 'tws']),
      rating: 4.8,
      reviewCount: 4521,
      stock: 60,
      featured: true,
      isNew: false,
      isSale: true,
    },
    {
      name: 'Dell XPS 15 9530 Intel Core i9',
      slug: 'dell-xps-15-9530-i9',
      description: 'Dell XPS 15 với Intel Core i9 thế hệ 13, màn hình OLED 3.5K cảm ứng, NVIDIA RTX 4070 và thiết kế premium.',
      price: 48990000,
      originalPrice: null,
      images: JSON.stringify(['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600']),
      category: 'Laptop',
      tags: JSON.stringify(['dell', 'xps', 'gaming']),
      rating: 4.6,
      reviewCount: 432,
      stock: 6,
      featured: false,
      isNew: true,
      isSale: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Products seeded:', products.length)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
