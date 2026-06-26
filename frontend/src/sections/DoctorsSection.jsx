import { motion } from "framer-motion";

import doctor1 from "../assets/doctor1.png";
import doctor2 from "../assets/doctor2.png";
import doctor3 from "../assets/doctor3.png";

function DoctorsSection() {
  const doctors = [
    {
      img: doctor1,
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
    },
    {
      img: doctor2,
      name: "Dr. Michael Adams",
      role: "Neurologist",
    },
    {
      img: doctor3,
      name: "Dr. Emily Brown",
      role: "Pediatrician",
    },
  ];

  return (
    <section
      id="doctors"
      className="py-24 bg-[#EEF7F4]"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Meet Our Specialists
          </h2>

          <p className="mt-4 text-slate-600">
            Experienced healthcare professionals dedicated to your care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {doctors.map((doctor) => (
            <motion.div
              key={doctor.name}
              whileHover={{
                y: -15,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {doctor.name}
                </h3>

                <p className="mt-2 text-green-600 font-medium">
                  {doctor.role}
                </p>

                <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">
                  View Profile
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default DoctorsSection;