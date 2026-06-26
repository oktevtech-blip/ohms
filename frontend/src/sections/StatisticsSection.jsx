import { motion } from "framer-motion";

function StatisticsSection() {
  const stats = [
    {
      value: "15K+",
      label: "Patients",
      color: "text-green-600",
    },
    {
      value: "350+",
      label: "Doctors",
      color: "text-blue-500",
    },
    {
      value: "98%",
      label: "Satisfaction",
      color: "text-green-600",
    },
    {
      value: "24/7",
      label: "Support",
      color: "text-blue-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="bg-slate-50 rounded-3xl p-8 text-center shadow-sm"
            >
              <h2 className={`text-5xl font-bold ${stat.color}`}>
                {stat.value}
              </h2>

              <p className="mt-3 text-slate-600">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default StatisticsSection;