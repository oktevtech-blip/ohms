import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FaPlus,
  FaSearch,
  FaUserMd,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import api from "../../api/axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
  });

  // FETCH DOCTORS

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // FORM CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDoctor) {
        await api.put(
          `/doctors/${editingDoctor.doctor_id}`,
          formData
        );
      } else {
        await api.post(
          "/doctors",
          formData
        );
      }

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        specialization: "",
        department: "",
      });

      setEditingDoctor(null);
      setShowModal(false);

      fetchDoctors();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);

    setFormData({
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      department: doctor.department,
    });

    setShowModal(true);
  };

  // DELETE

  const handleDelete = async (id) => {
    if (!window.confirm("Delete doctor?"))
      return;

    try {
      await api.delete(
        `/doctors/${id}`
      );

      fetchDoctors();

    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH

  const filteredDoctors = doctors.filter(
    (doctor) =>
      `${doctor.first_name} ${doctor.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Doctors
          </h1>

          <p className="text-slate-500 mt-2">
            Manage doctors and medical staff.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingDoctor(null);

            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              specialization: "",
              department: "",
            });

            setShowModal(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Doctor
        </button>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-3xl p-4 shadow-sm mb-8">

        <div className="flex items-center gap-3">

          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search doctor..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* DOCTOR CARDS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredDoctors.map((doctor) => (

          <div
            key={doctor.doctor_id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
          >

            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-3xl">
              <FaUserMd />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-800">
              Dr. {doctor.first_name} {doctor.last_name}
            </h3>

            <p className="text-green-600 font-medium mt-2">
              {doctor.specialization}
            </p>

            <p className="text-slate-500 mt-1">
              {doctor.department}
            </p>

            <p className="text-slate-500 text-sm mt-2">
              {doctor.email}
            </p>

            <p className="text-slate-500 text-sm">
              {doctor.phone}
            </p>

            <div className="mt-4">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Active
              </span>

            </div>

            <div className="mt-6 flex gap-2">

              <button
                onClick={() =>
                  handleEdit(doctor)
                }
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
              >
                <FaEdit className="mx-auto" />
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    doctor.doctor_id
                  )
                }
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
              >
                <FaTrash className="mx-auto" />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                {editingDoctor
                  ? "Edit Doctor"
                  : "Add Doctor"}

              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
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
                className="border rounded-xl p-4"
                required
              />

              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="border rounded-xl p-4"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold"
              >
                {editingDoctor
                  ? "Update Doctor"
                  : "Save Doctor"}
              </button>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Doctors;