import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

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
      images
    }`,
    { slug }
  )
}

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-gray-800 mb-4">Invalid plant link</h1>
          <Link
            href="/plants"
            className="inline-block bg-green-800 text-white px-6 py-3 rounded-full"
          >
            Back to Plants
          </Link>
        </div>
      </div>
    )
  }

  const plant = await getPlant(slug)

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-gray-800 mb-4">Plant not found</h1>
          <Link
            href="/plants"
            className="inline-block bg-green-800 text-white px-6 py-3 rounded-full"
          >
            Back to Plants
          </Link>
        </div>
      </div>
    )
  }

  const allImages = [plant.image, ...(plant.images || [])].filter(Boolean)

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#eef5ec] to-[#e6efe9] py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/plants"
          className="inline-block mb-8 text-green-800 font-medium hover:underline"
        >
          ← Back to All Plants
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="rounded-3xl overflow-hidden bg-white shadow-lg p-4">
              <img
                src={
                  plant?.image
                    ? urlFor(plant.image).width(800).url()
                    : '/placeholder.png'
                }
                alt={plant?.name || 'Plant image'}
                className="w-full h-[320px] md:h-[500px] object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {allImages.map((img: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden bg-white shadow p-2"
                  >
                    <img
                      src={urlFor(img).width(300).url()}
                      alt={`${plant?.name || 'Plant'} ${index + 1}`}
                      className="w-full h-28 object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 md:p-8">
            <p className="text-sm uppercase tracking-wide text-green-800 font-semibold mb-2">
              {plant?.category || 'Plant'}
            </p>

            <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
              {plant?.name || 'Unnamed Plant'}
            </h1>

            <p className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
              ₹{plant?.price || 0}
            </p>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {plant?.description || 'No description available for this plant yet.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/plants"
                className="text-center border border-green-800 text-green-800 px-6 py-3 rounded-full hover:bg-green-50 transition"
              >
                Continue Shopping
              </Link>

              <a
                href={`https://wa.me/919380329328?text=${encodeURIComponent(
                  `Hi, I want to enquire about this plant:\n\n🌿 ${plant?.name}\n💰 Price: ₹${plant?.price}\n📂 Category: ${plant?.category}\n\nPlease share more details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-green-800 text-white px-6 py-3 rounded-full hover:bg-green-900 transition"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}