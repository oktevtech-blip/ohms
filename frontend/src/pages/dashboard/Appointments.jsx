import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaCalendarPlus, FaSearch, FaTimes } from "react-icons/fa";
import api from "../../api/axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "Scheduled",
  });

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", formData);

      setShowModal(false);

      setFormData({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
        status: "Scheduled",
      });

      fetchAppointments();
    } catch (error) {
      console.error(error);
      alert("Failed to create appointment");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Appointments
          </h1>

          <p className="text-slate-500 mt-2">
            Manage patient appointments and schedules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaCalendarPlus />
          New Appointment
        </button>
      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl p-4 shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search appointment..."
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-5">Patient</th>
              <th className="text-left p-5">Doctor</th>
              <th className="text-left p-5">Date</th>
              <th className="text-left p-5">Time</th>
              <th className="text-left p-5">Reason</th>
              <th className="text-left p-5">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.appointment_id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-5">
                  {appointment.patient_name}
                </td>

                <td className="p-5">
                  {appointment.doctor_name}
                </td>

                <td className="p-5">
                  {appointment.appointment_date}
                </td>

                <td className="p-5">
                  {appointment.appointment_time}
                </td>

                <td className="p-5">
                  {appointment.reason}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                New Appointment
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient.patient_id}
                    value={patient.patient_id}
                  >
                    {patient.first_name}{" "}
                    {patient.last_name}
                  </option>
                ))}
              </select>

              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor.doctor_id}
                    value={doctor.doctor_id}
                  >
                    Dr. {doctor.first_name}{" "}
                    {doctor.last_name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              />

              <input
                type="time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              />

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason for appointment"
                className="w-full border p-3 rounded-xl"
                rows="4"
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-xl"
              >
                Create Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Appointments;