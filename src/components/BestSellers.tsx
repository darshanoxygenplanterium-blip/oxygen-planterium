'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

export default function BestSellers() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchBestSellers() {
      try {
        const data = await client.fetch(
          `*[_type == "product" && bestSeller == true][0...8]{
            _id,
            name,
            slug,
            price,
            category,
            image
          }`
        )
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching best sellers:', error)
        setProducts([])
      }
    }

    fetchBestSellers()
  }, [])

  return (
    <section
      id="products"
      className="py-16 scroll-mt-15 md:scroll-mt-15 bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9]"
    >
      <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-800">
        Our Best Sellers 🌿
      </h2>

      <p className="text-center text-gray-600 mb-10 px-4">
        Discover our most popular plants, loved by our customers for their beauty and air-purifying qualities. These best sellers are a must-have for any plant enthusiast!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
        {products.map((product) => (
          <div
            key={product?._id}
            className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-2xl transition duration-500 group"
          >
            <Link href={`/plants/${product?.slug?.current || ''}`}>
              <div className="w-full h-40 md:h-56 flex items-center justify-center bg-white/50 cursor-pointer">
                <img
                  src={
                    product?.image
                      ? urlFor(product.image).url()
                      : '/placeholder.png'
                  }
                  alt={product?.name || 'Plant'}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            <div className="p-3 md:p-5">
              <Link href={`/plants/${product?.slug?.current || ''}`}>
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 cursor-pointer hover:text-green-800 transition">
                  {product?.name || 'Unnamed Plant'}
                </h3>
              </Link>

              <p className="text-green-800 font-bold mt-1 text-sm md:text-lg">
                ₹{product?.price || 0}
              </p>

              <p className="text-xs md:text-sm text-gray-500 mt-1 capitalize">
                {product?.category || 'plant'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/plants"
          className="bg-green-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-900 transition"
        >
          View All Plants
        </Link>
      </div>
    </section>
  )
}