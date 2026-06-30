import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    monthlyRevenue: 0,
    patientGrowth: [],
    recentPatients: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setDashboard(res.data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-lg">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back. Here's what's happening today.
          </p>

        </div>

        {/* STATISTICS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">

              <FaUserInjured className="text-green-600 text-2xl" />

            </div>

            <h3 className="mt-5 text-4xl font-bold text-slate-800">
              {dashboard.totalPatients}
            </h3>

            <p className="text-slate-500 mt-2">
              Total Patients
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">

              <FaUserMd className="text-blue-600 text-2xl" />

            </div>

            <h3 className="mt-5 text-4xl font-bold text-slate-800">
              {dashboard.totalDoctors}
            </h3>

            <p className="text-slate-500 mt-2">
              Doctors
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">

              <FaCalendarCheck className="text-green-600 text-2xl" />

            </div>

            <h3 className="mt-5 text-4xl font-bold text-slate-800">
              {dashboard.totalAppointments}
            </h3>

            <p className="text-slate-500 mt-2">
              Appointments
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">

              <FaMoneyBillWave className="text-blue-600 text-2xl" />

            </div>

            <h3 className="mt-5 text-4xl font-bold text-slate-800">
              ${Number(dashboard.monthlyRevenue).toLocaleString()}
            </h3>

            <p className="text-slate-500 mt-2">
              Revenue
            </p>

          </div>

        </div>

        {/* CHART + ACTIVITY */}

        <div className="grid xl:grid-cols-3 gap-6 mt-8">

          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-bold text-slate-800">
                Patient Growth
              </h2>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={dashboard.patientGrowth}>

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#22C55E"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <ActivityItem
                title={`${dashboard.totalPatients} Patients Registered`}
                subtitle="Current Total"
              />

              <ActivityItem
                title={`${dashboard.totalDoctors} Doctors Available`}
                subtitle="Current Staff"
              />

              <ActivityItem
                title={`${dashboard.totalAppointments} Appointments`}
                subtitle="Scheduled"
              />

              <ActivityItem
                title={`$${Number(
                  dashboard.monthlyRevenue
                ).toLocaleString()} Revenue`}
                subtitle="Collected"
              />

            </div>

          </div>

        </div>

        {/* RECENT PATIENTS */}

        <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Patients
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Patient
                  </th>

                  <th className="text-left py-4">
                    Age
                  </th>

                  <th className="text-left py-4">
                    Gender
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recentPatients.length > 0 ? (
                  dashboard.recentPatients.map((patient) => (
                    <PatientRow
                      key={patient.patient_id}
                      name={patient.name}
                      age={patient.age}
                      gender={patient.gender}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-6 text-slate-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

function ActivityItem({ title, subtitle }) {
  return (
    <div className="flex gap-4">

      <div className="w-3 h-3 mt-2 bg-green-500 rounded-full"></div>

      <div>

        <h4 className="font-medium text-slate-700">
          {title}
        </h4>

        <p className="text-sm text-slate-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
}

function PatientRow({ name, age, gender }) {
  return (
    <tr className="border-b last:border-none">

      <td className="py-4 font-medium text-slate-700">
        {name}
      </td>

      <td>{age}</td>

      <td>{gender}</td>

    </tr>
  );
}

export default Dashboard;