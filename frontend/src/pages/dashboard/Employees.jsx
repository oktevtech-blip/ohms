import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

import {
  FaPlus,
  FaSearch,
  FaUsers,
  FaUserTie,
  FaCalculator,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Employees() {

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [generatedPassword, setGeneratedPassword] =
    useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: 3,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    try {

      const res = await api.get(
        "/employees"
      );

      setEmployees(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const filteredEmployees = useMemo(() => {

    return employees.filter((employee) => {

      const value = search.toLowerCase();

      return (

        employee.first_name.toLowerCase().includes(value) ||

        employee.last_name.toLowerCase().includes(value) ||

        employee.email.toLowerCase().includes(value) ||

        employee.role_name.toLowerCase().includes(value)

      );

    });

  }, [employees, search]);

  const receptionistCount =
    employees.filter(
      (e) => e.role_name === "Receptionist"
    ).length;

  const accountantCount =
    employees.filter(
      (e) => e.role_name === "Accountant"
    ).length;

  const openAddModal = () => {

    setEditingEmployee(null);

    setFormData({

      first_name: "",

      last_name: "",

      email: "",

      phone: "",

      role_id: 3,

    });

    setShowModal(true);

  };

  const openEditModal = (employee) => {

    setEditingEmployee(employee);

    setFormData({

      first_name: employee.first_name,

      last_name: employee.last_name,

      email: employee.email,

      phone: employee.phone || "",

      role_id: employee.role_id,

    });

    setShowModal(true);

  };

  const saveEmployee = async () => {

    try {

      if (editingEmployee) {

        await api.put(
          `/employees/${editingEmployee.user_id}`,
          formData
        );

        alert("Employee updated successfully");

      } else {

        const res = await api.post(
          "/employees",
          formData
        );

        setGeneratedPassword(res.data.password);

        alert(
          `Employee added successfully.\n\nTemporary Password: ${res.data.password}`
        );

      }

      setShowModal(false);

      fetchEmployees();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Something went wrong."
      );

    }

  };

  const deleteEmployee = async (id) => {

    if (
      !window.confirm(
        "Delete this employee?"
      )
    )
      return;

    try {

      await api.delete(
        `/employees/${id}`
      );

      fetchEmployees();

    } catch (err) {

      console.log(err);

      alert("Failed to delete employee");

    }

  };

  return (
  <DashboardLayout>

    {/* HEADER */}

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Employees
        </h1>

        <p className="text-slate-500 mt-2">
          Manage receptionists and accountants.
        </p>

      </div>

      <button
        onClick={openAddModal}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <FaPlus />
        Add Employee
      </button>

    </div>

    {/* SUMMARY */}

    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <FaUsers className="text-green-600 text-3xl" />

        <h2 className="text-4xl font-bold mt-3">
          {employees.length}
        </h2>

        <p className="text-slate-500">
          Total Employees
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <FaUserTie className="text-blue-600 text-3xl" />

        <h2 className="text-4xl font-bold mt-3">
          {receptionistCount}
        </h2>

        <p className="text-slate-500">
          Receptionists
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <FaCalculator className="text-purple-600 text-3xl" />

        <h2 className="text-4xl font-bold mt-3">
          {accountantCount}
        </h2>

        <p className="text-slate-500">
          Accountants
        </p>

      </div>

    </div>

    {/* SEARCH */}

    <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">

      <div className="flex items-center gap-3">

        <FaSearch className="text-slate-400" />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
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

            <th className="text-left p-5">
              Name
            </th>

            <th className="text-left p-5">
              Email
            </th>

            <th className="text-left p-5">
              Phone
            </th>

            <th className="text-left p-5">
              Role
            </th>

            <th className="text-left p-5">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan="5"
                className="p-6 text-center"
              >
                Loading...
              </td>

            </tr>

          ) : filteredEmployees.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="p-6 text-center"
              >
                No employees found.
              </td>

            </tr>

          ) : (

            filteredEmployees.map((employee) => (

              <tr
                key={employee.user_id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-5 font-medium">
                  {employee.first_name} {employee.last_name}
                </td>

                <td className="p-5">
                  {employee.email}
                </td>

                <td className="p-5">
                  {employee.phone}
                </td>

                <td className="p-5">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {employee.role_name}

                  </span>

                </td>

                <td className="p-5">

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        openEditModal(employee)
                      }
                    >

                      <FaEdit className="text-blue-600" />

                    </button>

                    <button
                      onClick={() =>
                        deleteEmployee(employee.user_id)
                      }
                    >

                      <FaTrash className="text-red-600" />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

    {/* ADD / EDIT MODAL */}

    {showModal && (

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

          <h2 className="text-2xl font-bold mb-6">

            {editingEmployee
              ? "Edit Employee"
              : "Add Employee"}

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-medium">
                First Name
              </label>

              <input
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_name: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Last Name
              </label>

              <input
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-medium">
                Phone
              </label>

              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Role
              </label>

              <select
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role_id: Number(e.target.value),
                  })
                }
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option value={3}>
                  Receptionist
                </option>

                <option value={4}>
                  Accountant
                </option>

              </select>

            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="px-6 py-3 rounded-xl bg-slate-200"
            >
              Cancel
            </button>

            <button
              onClick={saveEmployee}
              className="px-6 py-3 rounded-xl bg-green-500 text-white"
            >
              {editingEmployee
                ? "Update Employee"
                : "Add Employee"}
            </button>

          </div>

        </div>

      </div>

    )}

  </DashboardLayout>
);
}

export default Employees;