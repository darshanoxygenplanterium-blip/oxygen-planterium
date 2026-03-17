export default function Reviews() {
  return (
    <section className="py-16 bg-green-50 text-center">
      
      <h2 className="text-2xl font-semibold mb-10">
        What Our Customers Say 🌿
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-6">

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3 text-gray-600">
            Amazing quality plants. Very fresh and healthy!
          </p>
          <h4 className="mt-4 font-semibold">– Rahul, Hubli</h4>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3 text-gray-600">
            Loved the service. Delivery was quick and smooth.
          </p>
          <h4 className="mt-4 font-semibold">– Sneha, Hubli</h4>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          ⭐⭐⭐⭐⭐
          <p className="mt-3 text-gray-600">
            Beautiful pots and plants. Highly recommended!
          </p>
          <h4 className="mt-4 font-semibold">– Amit, Hubli</h4>
        </div>

      </div>

    </section>
  );
}