import { motion } from "framer-motion";
import {
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaHospitalUser,
} from "react-icons/fa";

function ServicesSection() {
  const services = [
    {
      icon: <FaHospitalUser className="text-green-500 text-4xl" />,
      title: "Patient Management",
      desc: "Manage patient profiles and history.",
    },
    {
      icon: <FaUserMd className="text-blue-500 text-4xl" />,
      title: "Doctor Scheduling",
      desc: "Efficient doctor appointment planning.",
    },
    {
      icon: <FaCalendarCheck className="text-green-500 text-4xl" />,
      title: "Appointments",
      desc: "Easy appointment booking and tracking.",
    },
    {
      icon: <FaFileMedical className="text-blue-500 text-4xl" />,
      title: "Medical Records",
      desc: "Secure patient medical records storage.",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-[#EEF7F4]"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Our Services
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to manage a modern hospital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{
                duration: 0.25,
              }}
              className="bg-white rounded-3xl p-8 shadow-lg cursor-pointer"
            >
              {service.icon}

              <h3 className="mt-6 text-xl font-bold">
                {service.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {service.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default ServicesSection;