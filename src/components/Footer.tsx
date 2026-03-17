export default function Footer() {
  return (
    <footer className="bg-[#1F3D2B] text-white py-10">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-2xl font-semibold">
          Oxygen Planterium
        </h2>

        <p className="mt-2 text-gray-300">
          Where Every Plant Finds A Happy Place
        </p>

        <p className="mt-6">
          Hubli, Karnataka
        </p>

        <a
          href="https://wa.me/919380329328?text=Hello! I have a question about your plants."
          className="inline-block mt-4 bg-green-600 px-6 py-2 rounded-full"
        >
          Chat on WhatsApp
        </a>

        <p className="mt-6 text-sm text-gray-400">
          © 2026 Oxygen Planterium
        </p>

      </div>

    </footer>
  );
}