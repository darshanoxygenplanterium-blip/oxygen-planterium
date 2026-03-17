export default function Location() {
  return (
    <section id="location" className="py-20 bg-[#F5F1E8]">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-semibold text-[#1F3D2B] mb-10">
          Visit Our Store
        </h2>

        <p className="mb-8 text-gray-600">
          Oxygen Planterium — Hubli, Karnataka
        </p>

        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.823539624981!2d75.097668274586!3d15.331821958757613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d711099c5e5f%3A0x7ba43cf900121ea1!2sOxygen%20Planterium!5e0!3m2!1sen!2sin!4v1773659518842!5m2!1sen!2sin" 
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        </div>

      </div>

    </section>
  );
}