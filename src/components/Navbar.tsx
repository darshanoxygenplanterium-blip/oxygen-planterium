import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Oxygen Planterium Logo"
            width={50}
            height={20}
            className="object-contain"
          />
          <span className="text-lg font-serif text-gray-900 leading-none">
            Oxygen Planterium
          </span>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 text-gray-800">
          <a href="#" className="hover:text-green-700 transition">Home</a>
          <a href="#products" className="hover:text-green-700 transition">Plants</a>
          <a href="#location" className="hover:text-green-700 transition">Location</a>
        </nav>

      </div>
    </header>
  );
}