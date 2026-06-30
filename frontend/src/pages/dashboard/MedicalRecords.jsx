import { useEffect, useState } from "react";
import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: "",
    visit_date: "",
  });

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/medical-records");
      setRecords(res.data);
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
      await api.post(
        "/medical-records",
        formData
      );

      fetchRecords();

      setShowModal(false);

      setFormData({
        patient_id: "",
        doctor_id: "",
        diagnosis: "",
        treatment: "",
        prescription: "",
        notes: "",
        visit_date: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this medical record?")) {
      return;
    }

    try {
      await api.delete(
        `/medical-records/${id}`
      );

      fetchRecords();

    } catch (error) {
      console.error(error);
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.patient_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      record.doctor_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      record.diagnosis
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Medical Records
          </h1>

          <p className="text-slate-500 mt-2">
            Manage patient medical history.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />
          New Record
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">

        <div className="flex items-center gap-3">
          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search medical records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

      </div>

      {/* RECORDS TABLE */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>
              <th className="p-5 text-left">Patient</th>
              <th className="p-5 text-left">Doctor</th>
              <th className="p-5 text-left">Diagnosis</th>
              <th className="p-5 text-left">Treatment</th>
              <th className="p-5 text-left">Visit Date</th>
              <th className="p-5 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.record_id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-5">{record.patient_name}</td>

                  <td className="p-5">
                    Dr. {record.doctor_name}
                  </td>

                  <td className="p-5">
                    {record.diagnosis}
                  </td>

                  <td className="p-5">
                    {record.treatment}
                  </td>

                  <td className="p-5">
                    {record.visit_date?.split("T")[0]}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() =>
                        deleteRecord(record.record_id)
                      }
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-slate-500"
                >
                  No medical records found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

              <h2 className="text-2xl font-bold text-slate-800">
                Create Medical Record
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-red-500 text-xl"
              >
                <FaTimes />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </select>

              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    Dr. {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </select>

              <textarea
                name="diagnosis"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <textarea
                name="treatment"
                placeholder="Treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                name="prescription"
                placeholder="Prescription"
                value={formData.prescription}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                name="notes"
                placeholder="Doctor Notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="date"
                name="visit_date"
                value={formData.visit_date}
                onChange={handleChange}
                className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              {/* Footer Buttons */}
              <div className="sticky bottom-0 bg-white pt-4 pb-2 flex gap-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-300 py-3 rounded-xl hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Save Medical Record
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default MedicalRecords;