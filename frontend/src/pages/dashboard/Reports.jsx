import { useEffect, useState } from "react";
import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#3B82F6",
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

function Reports() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    revenue: 0,
  });

  const [patientGrowth, setPatientGrowth] = useState([]);

  const [revenueTrend, setRevenueTrend] = useState([]);

  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");

      setStats({
        patients: res.data.patients,
        doctors: res.data.doctors,
        appointments: res.data.appointments,
        revenue: res.data.revenue,
      });

      setPatientGrowth(res.data.patientGrowth);

      setRevenueTrend(res.data.revenueTrend);

      setDepartmentData(res.data.departments);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <h2 className="text-2xl font-semibold text-slate-600">
            Loading Reports...
          </h2>

        </div>

      </DashboardLayout>
    );
  }

  return (
  <DashboardLayout>

    {/* Header */}

    <div className="mb-8">

      <h1 className="text-4xl font-bold text-slate-800">
        Reports & Analytics
      </h1>

      <p className="text-slate-500 mt-2">
        Monitor hospital performance and trends.
      </p>

    </div>

    {/* KPI Cards */}

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h4 className="text-slate-500">
          Total Patients
        </h4>

        <h2 className="text-4xl font-bold mt-2">
          {stats.patients}
        </h2>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h4 className="text-slate-500">
          Revenue
        </h4>

        <h2 className="text-4xl font-bold mt-2">
          ${Number(stats.revenue).toLocaleString()}
        </h2>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h4 className="text-slate-500">
          Appointments
        </h4>

        <h2 className="text-4xl font-bold mt-2">
          {stats.appointments}
        </h2>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h4 className="text-slate-500">
          Doctors
        </h4>

        <h2 className="text-4xl font-bold mt-2">
          {stats.doctors}
        </h2>

      </div>

    </div>

    {/* Charts */}

    <div className="grid xl:grid-cols-2 gap-6 mt-8">

      {/* Patient Growth */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">
          Patient Growth
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={patientGrowth}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="patients"
                fill="#22C55E"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Department Distribution */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">
          Department Distribution
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={departmentData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {departmentData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

    {/* Revenue Trend */}

    <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold mb-6">
        Revenue Trend
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={revenueTrend}>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  </DashboardLayout>
);

}

export default Reports;