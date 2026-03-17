import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#f5f1e8] text-gray-800">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <Hero />
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-b from-[#f5f1e8] to-[#eef5ec]">
        <div className="max-w-7xl mx-auto px-6">
          <Categories />
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-gradient-to-b from-[#eef5ec] to-[#e6efe9]">
        <div className="max-w-7xl mx-auto px-6">
          <Products />
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Location />
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}