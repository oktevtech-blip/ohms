import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-24 bg-green-500">

      <div className="max-w-5xl mx-auto text-center px-8">

        <h2 className="text-5xl font-bold text-white">
          Ready To Modernize Your Hospital?
        </h2>

        <p className="mt-6 text-green-100 text-lg">
          Join healthcare providers using OHMS to improve patient care and streamline hospital operations.
        </p>

        <button className="mt-10 px-8 py-4 bg-white text-green-600 rounded-2xl font-bold hover:scale-105 transition">
          <Link to="/register">Get started</Link>
        </button>

      </div>

    </section>
  );
}

export default CTASection;