import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";

import { motion } from "framer-motion";

function DashboardPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Healthcare Intelligence Platform
          </h2>

          <p className="mt-4 text-slate-600 text-lg">
            Monitor patients, doctors and appointments from one place.
          </p>
        </div>

        <div className="mt-16 bg-slate-50 rounded-[40px] shadow-xl p-10">

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                icon: <FaUserInjured className="text-green-500 text-3xl" />,
                title: "Patients",
                value: "12,540",
              },
              {
                icon: <FaCalendarCheck className="text-blue-500 text-3xl" />,
                title: "Appointments",
                value: "1,250",
              },
              {
                icon: <FaUserMd className="text-green-500 text-3xl" />,
                title: "Doctors",
                value: "245",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="bg-white rounded-3xl p-6 shadow-sm"
              >
                {card.icon}

                <h3 className="mt-4 text-4xl font-bold">
                  {card.value}
                </h3>

                <p className="text-slate-500">
                  {card.title}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;