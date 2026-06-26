// import Navbar from "../components/Navbar";
// import {
//   FaUserMd,
//   FaCalendarCheck,
//   FaFileMedical,
//   FaHospitalUser,
// } from "react-icons/fa";

// function Home() {
//   return (
//     <>
//       <Navbar />

//       {/* HERO */}
//       <section
//         id="home"
//         className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF7F4] pt-36"
//       >
//         <div className="max-w-7xl mx-auto px-8">

//           <div className="grid lg:grid-cols-2 gap-20 items-center">

//             {/* LEFT */}

//             <div>

//               <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                 Trusted By Healthcare Professionals
//               </span>

//               <h1 className="mt-8 text-6xl font-bold text-slate-900 leading-tight">
//                 Trusted Healthcare
//                 <br />
//                 Management
//                 <span className="text-green-600">
//                   {" "}Platform
//                 </span>
//               </h1>

//               <p className="mt-8 text-xl text-slate-600 max-w-xl leading-relaxed">
//                 Simplify patient care, doctor scheduling,
//                 appointments and medical records with one
//                 intelligent healthcare platform.
//               </p>

//               <div className="mt-10 flex gap-5">

//                 <button className="px-8 py-4 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition">
//                   Book Appointment
//                 </button>

//                 <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-semibold">
//                   Learn More
//                 </button>

//               </div>

//             </div>

//             {/* RIGHT */}

//             <div className="relative">

//               <div className="absolute inset-0 bg-green-200 blur-3xl opacity-20 rounded-full"></div>

//               <div className="relative bg-white rounded-[40px] shadow-2xl p-8">

//                 <img
//                   src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
//                   alt="Doctor"
//                   className="rounded-[30px] h-[500px] w-full object-cover"
//                 />

//               </div>

//             </div>

//           </div>

//         </div>
//       </section>

//       {/* STATISTICS */}

//       <section className="py-24 bg-white">

//         <div className="max-w-7xl mx-auto px-8">

//           <div className="grid md:grid-cols-4 gap-8">

//             <div className="text-center">
//               <h2 className="text-5xl font-bold text-green-600">
//                 15K+
//               </h2>
//               <p className="mt-2 text-slate-600">
//                 Patients
//               </p>
//             </div>

//             <div className="text-center">
//               <h2 className="text-5xl font-bold text-blue-500">
//                 350+
//               </h2>
//               <p className="mt-2 text-slate-600">
//                 Doctors
//               </p>
//             </div>

//             <div className="text-center">
//               <h2 className="text-5xl font-bold text-green-600">
//                 98%
//               </h2>
//               <p className="mt-2 text-slate-600">
//                 Satisfaction
//               </p>
//             </div>

//             <div className="text-center">
//               <h2 className="text-5xl font-bold text-blue-500">
//                 24/7
//               </h2>
//               <p className="mt-2 text-slate-600">
//                 Support
//               </p>
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* SERVICES */}

//       <section
//         id="services"
//         className="py-24 bg-[#EEF7F4]"
//       >

//         <div className="max-w-7xl mx-auto px-8">

//           <div className="text-center">

//             <h2 className="text-5xl font-bold text-slate-900">
//               Our Services
//             </h2>

//             <p className="mt-4 text-slate-600">
//               Everything you need to manage a modern hospital.
//             </p>

//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

//             <div className="bg-white rounded-3xl p-8 shadow-lg">
//               <FaHospitalUser className="text-green-500 text-4xl" />
//               <h3 className="mt-6 text-xl font-bold">
//                 Patient Management
//               </h3>
//               <p className="mt-3 text-slate-600">
//                 Manage patient profiles and history.
//               </p>
//             </div>

//             <div className="bg-white rounded-3xl p-8 shadow-lg">
//               <FaUserMd className="text-blue-500 text-4xl" />
//               <h3 className="mt-6 text-xl font-bold">
//                 Doctor Scheduling
//               </h3>
//               <p className="mt-3 text-slate-600">
//                 Efficient doctor appointment planning.
//               </p>
//             </div>

//             <div className="bg-white rounded-3xl p-8 shadow-lg">
//               <FaCalendarCheck className="text-green-500 text-4xl" />
//               <h3 className="mt-6 text-xl font-bold">
//                 Appointments
//               </h3>
//               <p className="mt-3 text-slate-600">
//                 Easy appointment booking and tracking.
//               </p>
//             </div>

//             <div className="bg-white rounded-3xl p-8 shadow-lg">
//               <FaFileMedical className="text-blue-500 text-4xl" />
//               <h3 className="mt-6 text-xl font-bold">
//                 Medical Records
//               </h3>
//               <p className="mt-3 text-slate-600">
//                 Secure patient medical records storage.
//               </p>
//             </div>

//           </div>

//         </div>

//       </section>

//       {/* DASHBOARD PREVIEW */}

//       <section className="py-24 bg-white">

//         <div className="max-w-7xl mx-auto px-8">

//           <div className="text-center">

//             <h2 className="text-5xl font-bold">
//               Powerful Dashboard
//             </h2>

//             <p className="mt-4 text-slate-600">
//               Complete visibility into hospital operations.
//             </p>

//           </div>

//           <div className="mt-16 bg-slate-50 rounded-[40px] shadow-xl p-10">

//             <div className="grid md:grid-cols-3 gap-6">

//               <div className="bg-white rounded-3xl p-6 shadow">
//                 <h3 className="font-semibold">
//                   Patients
//                 </h3>
//                 <p className="text-4xl font-bold mt-3">
//                   12,540
//                 </p>
//               </div>

//               <div className="bg-white rounded-3xl p-6 shadow">
//                 <h3 className="font-semibold">
//                   Appointments
//                 </h3>
//                 <p className="text-4xl font-bold mt-3">
//                   1,250
//                 </p>
//               </div>

//               <div className="bg-white rounded-3xl p-6 shadow">
//                 <h3 className="font-semibold">
//                   Doctors
//                 </h3>
//                 <p className="text-4xl font-bold mt-3">
//                   245
//                 </p>
//               </div>

//             </div>

//           </div>

//         </div>

//       </section>
//     </>
//   );
// }

// export default Home;


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HeroSection from "../sections/HeroSection";
import StatisticsSection from "../sections/StatisticsSection";
import ServicesSection from "../sections/ServicesSection";
import DashboardPreview from "../sections/DashboardPreview";
import DoctorsSection from "../sections/DoctorsSection";
import Testimonials from "../sections/Testimonials";
import CTASection from "../sections/CTASection";

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <DashboardPreview />
      <DoctorsSection />
      <Testimonials />
      <CTASection />

      <Footer />
    </>
  );
}

export default Home;