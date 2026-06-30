import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import api from "../../api/axios";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "Male",
  });

  // FETCH PATIENTS

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");

      setPatients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // FORM INPUT CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE PATIENT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        await api.put(
          `/patients/${editingPatient.patient_id}`,
          formData
        );
      } else {
        await api.post(
          "/patients",
          formData
        );
      }

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "Male",
      });

      setEditingPatient(null);
      setShowModal(false);

      fetchPatients();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PATIENT

  const handleEdit = (patient) => {
    setEditingPatient(patient);

    setFormData({
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
    });

    setShowModal(true);
  };

  // DELETE PATIENT

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/patients/${id}`
      );

      fetchPatients();

    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH

  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.first_name} ${patient.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Patients
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all registered patients.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingPatient(null);

            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              gender: "Male",
            });

            setShowModal(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />
          Add Patient
        </button>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">

        <div className="flex items-center gap-3">

          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>
              <th className="text-left p-5">ID</th>
              <th className="text-left p-5">Patient Name</th>
              <th className="text-left p-5">Email</th>
              <th className="text-left p-5">Gender</th>
              <th className="text-left p-5">Phone</th>
              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredPatients.map((patient) => (

              <tr
                key={patient.patient_id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-5">
                  {patient.patient_id}
                </td>

                <td className="p-5 font-medium">
                  {patient.first_name} {patient.last_name}
                </td>

                <td className="p-5">
                  {patient.email}
                </td>

                <td className="p-5">
                  {patient.gender}
                </td>

                <td className="p-5">
                  {patient.phone}
                </td>

                <td className="p-5">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </span>

                </td>

                <td className="p-5">

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(patient)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          patient.patient_id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-slate-800">

                {editingPatient
                  ? "Edit Patient"
                  : "Add Patient"}

              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingPatient(null);
                }}
                className="text-slate-500 hover:text-red-500"
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-5"
            >

              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />

              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option>Male</option>
                <option>Female</option>
              </select>

              <div></div>

              <button
                type="submit"
                className="md:col-span-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition"
              >
                {editingPatient
                  ? "Update Patient"
                  : "Save Patient"}
              </button>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Patients;