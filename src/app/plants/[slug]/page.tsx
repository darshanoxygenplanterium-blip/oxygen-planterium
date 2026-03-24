import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { Sun, Droplets, Ruler, Flower2, ShieldCheck } from 'lucide-react'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

async function getPlant(slug: string) {
  try {
    return await client.fetch(
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
  } catch (error) {
    console.error('Error fetching plant:', error)
    return null
  }
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const plant = await getPlant(slug)

  if (!plant) {
    return (
      <section className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <h1 className="text-xl">Plant not found</h1>
      </section>
    )
  }

  const allImages = [plant.image, ...(plant.images || [])].filter(Boolean)

  return (
    <section className="min-h-screen bg-[#f5f1e8] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <div className="rounded-3xl bg-white p-4 shadow-md">
            <img
              src={urlFor(plant.image).url()}
              alt={plant.name}
              className="w-full h-[300px] md:h-[450px] object-contain"
            />
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {allImages.map((img: any, i: number) => (
                <img
                  key={i}
                  src={urlFor(img).url()}
                  alt="thumb"
                  className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div>
          <Link
            href="/plants"
            className="inline-block mb-4 text-green-800 hover:underline"
          >
            ← Back to All Plants
          </Link>

          <h1 className="text-2xl md:text-4xl font-serif text-gray-900">
            {plant.name}
          </h1>

          <p className="text-green-800 text-xl md:text-2xl font-bold mt-3">
            ₹{plant.price}
          </p>

          {/* ✅ LINE-BY-LINE DESCRIPTION */}
          <div className="mt-4 text-gray-700 leading-7 space-y-2">
            {(plant?.description || 'Beautiful plant for your home.')
              .split('\n')
              .map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
          </div>

          {/* WHATSAPP BUTTON */}
          <a
            href={`https://wa.me/919380329328?text=${encodeURIComponent(
              `Hi, I want to enquire about this plant:\n\n🌿 ${plant.name}\n💰 ₹${plant.price}`
            )}`}
            target="_blank"
            className="mt-6 inline-block w-full text-center bg-green-800 text-white py-3 rounded-xl shadow-md hover:bg-green-900 transition"
          >
            Enquire on WhatsApp
          </a>

          {/* PLANT DETAILS */}
          <div className="mt-8 rounded-3xl border border-green-100 bg-white shadow-lg">

            <div className="px-5 py-4 border-b border-green-100 bg-[#eef8f0]">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Flower2 className="text-green-700" />
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
              <p className="text-xs text-gray-500 italic leading-relaxed">
                Plants Are Natural Products. Size And Appearance May Vary Slightly From Images.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}