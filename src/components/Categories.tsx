export default function Categories() {
  return (
    <section className="py-20 bg-[#F5F1E8]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-semibold text-center text-[#1F3D2B] mb-16">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Plants */}
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-[#1F3D2B]">Plants</h3>
            <p className="mt-3 text-gray-500">
              Indoor & outdoor plants for every space
            </p>
          </div>

          {/* Pots */}
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-[#1F3D2B]">Pots</h3>
            <p className="mt-3 text-gray-500">
              Luxury ceramic and terracotta pots
            </p>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-[#1F3D2B]">Services</h3>
            <p className="mt-3 text-gray-500">
              Balcony & terrace garden setup
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}