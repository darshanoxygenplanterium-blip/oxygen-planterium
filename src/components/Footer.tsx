import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear(); // dynamically get current year

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

        {/* Social Media Icons */}
        <div className="flex justify-center mt-6 space-x-6">
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-sm text-gray-400">
          &copy; {year} Oxygen Planterium. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}