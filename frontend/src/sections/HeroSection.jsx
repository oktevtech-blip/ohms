import doctor from "../assets/doctor.png";

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F5FBF8] to-[#EEF7F4] pt-36"
    >
      {/* Background Shapes */}

      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/40 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}

          <div>

            <span className="inline-flex items-center px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              Trusted By Healthcare Professionals
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
              Smarter Healthcare
              <br />
              Starts With
              <span className="text-green-600"> OHMS</span>
            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-xl">
              Simplify patient care, doctor scheduling,
              appointments, billing and medical records
              using one modern healthcare management system.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-100 transition-all duration-300">
                Book Appointment
              </button>

              <button className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl font-semibold transition-all duration-300">
                Learn More
              </button>

            </div>

            {/* TRUST STATS */}

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">

              <div>
                <h3 className="text-3xl font-bold text-green-600">
                  15K+
                </h3>
                <p className="text-slate-500 mt-1">
                  Patients
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-500">
                  350+
                </h3>
                <p className="text-slate-500 mt-1">
                  Doctors
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-600">
                  98%
                </h3>
                <p className="text-slate-500 mt-1">
                  Satisfaction
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative">

            {/* Main Image Card */}

            <div className="relative bg-white rounded-[40px] shadow-2xl p-6">

              <img
                src={doctor}
                alt="Doctor"
                className="w-full h-[600px] object-cover rounded-[30px]"
              />

            </div>

            {/* Floating Card 1 */}

            <div className="absolute -left-8 top-20 bg-white rounded-3xl shadow-xl px-6 py-5 hidden md:block">

              <p className="text-slate-500 text-sm">
                Today's Visits
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-1">
                245
              </h3>

            </div>

            {/* Floating Card 2 */}

            <div className="absolute -right-8 bottom-20 bg-white rounded-3xl shadow-xl px-6 py-5 hidden md:block">

              <p className="text-slate-500 text-sm">
                Active Doctors
              </p>

              <h3 className="text-3xl font-bold text-blue-500 mt-1">
                128
              </h3>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;