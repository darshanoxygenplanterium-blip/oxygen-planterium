'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { useCart } from '@/context/CartContext'
import { Sun, Droplets, Ruler, Flower2, ShieldCheck } from 'lucide-react'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getPlant(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      price,
      category,
      description,
      image,
      images,
      height,
      potSize,
      light,
      water
    }`,
    { slug }
  )
}

export default function PlantPage({ params }: any) {
  const [plant, setPlant] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchData() {
      const data = await getPlant(params.slug)
      setPlant(data)
      setSelectedImage(data?.image)
    }
    fetchData()
  }, [params.slug])

  if (!plant) return <div className="p-10 text-center">Loading...</div>

  return (
    <section className="min-h-screen bg-[#f5f1e8] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGE SECTION */}
        <div>
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <img
              src={urlFor(selectedImage).url()}
              alt={plant.name}
              className="w-full h-[300px] md:h-[450px] object-contain"
            />
          </div>

          {/* THUMBNAILS */}
          {plant?.images?.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {[plant.image, ...(plant.images || [])].map((img: any, i: number) => (
                <img
                  key={i}
                  src={urlFor(img).url()}
                  alt="thumb"
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 object-cover rounded-xl cursor-pointer border ${
                    selectedImage === img
                      ? 'border-green-700'
                      : 'border-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div>
          <h1 className="text-2xl md:text-4xl font-serif text-gray-900">
            {plant.name}
          </h1>

          <p className="text-green-800 text-xl md:text-2xl font-bold mt-3">
            ₹{plant.price}
          </p>

          <p className="text-gray-600 mt-4 leading-6">
            {plant.description || 'Beautiful plant for your home.'}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(plant)}
            className="mt-6 w-full bg-green-800 text-white py-3 rounded-xl shadow-md hover:bg-green-900 transition"
          >
            Add to Cart 🛒
          </button>

          {/* PREMIUM PLANT DETAILS */}
          <div className="mt-8 rounded-3xl border border-green-100 bg-white/80 backdrop-blur-md shadow-lg overflow-hidden">

            <div className="px-5 py-4 border-b border-green-100 bg-[#eef8f0]">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-green-700" />
                Plant Details
              </h3>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4">

              <div className="flex gap-3">
                <Ruler className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Height</p>
                  <p className="font-semibold">
                    {plant?.height || '20–30 cm'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Flower2 className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Pot Size</p>
                  <p className="font-semibold">
                    {plant?.potSize || '5 inch'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Sun className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Light</p>
                  <p className="font-semibold">
                    {plant?.light || 'Indirect sunlight'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Droplets className="text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Water</p>
                  <p className="font-semibold">
                    {plant?.water || '2–3 times a week'}
                  </p>
                </div>
              </div>

            </div>

            {/* DISCLAIMER */}
            <div className="bg-[#f3faf5] p-4 border-t border-green-100 flex gap-3">
              <ShieldCheck className="text-green-700" />
              <p className="text-xs text-gray-600">
                Plants are natural products. Size and appearance may vary
                slightly from images.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}