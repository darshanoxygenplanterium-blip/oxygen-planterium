'use client'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/hero.jpg"
        alt="Plants"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        
        <div className="max-w-3xl text-white">

          {/* Small Tag */}
          <p className="text-sm tracking-widest uppercase text-green-300">
            Hubli’s Premium Plant Store
          </p>

          {/* Main Heading */}
          <h1 className="mt-4 text-4xl md:text-6xl font-serif leading-tight">
            Oxygen Planterium
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Where Every Plant Finds A Happy Place 🌿
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <a
              href="#products"
              className="px-8 py-3 bg-green-700 rounded-full text-white hover:bg-green-800 transition shadow-lg"
            >
              Explore Plants 🌿
            </a>

            <a
              href="https://wa.me/919380329328"
              target="_blank"
              className="px-8 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
            >
              WhatsApp Us
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}