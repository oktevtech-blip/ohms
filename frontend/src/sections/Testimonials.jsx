function Testimonials() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Trusted By Healthcare Providers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-slate-50 p-8 rounded-3xl">
            <p className="text-slate-600">
              "OHMS transformed the way we manage patient records and appointments."
            </p>

            <h4 className="mt-6 font-bold">
              St. Mary's Hospital
            </h4>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl">
            <p className="text-slate-600">
              "The dashboard provides incredible visibility into our operations."
            </p>

            <h4 className="mt-6 font-bold">
              Regional Medical Center
            </h4>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl">
            <p className="text-slate-600">
              "Simple, modern and very efficient for daily hospital workflows."
            </p>

            <h4 className="mt-6 font-bold">
              Healthcare Plus
            </h4>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;