import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaSearch,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

function Billing() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: "",
    service_name: "",
    amount: "",
    billing_date: "",
  });

  useEffect(() => {
    fetchBills();
    fetchPatients();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/billing"
      );

      setBills(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/patients"
      );

      setPatients(res.data);

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

      await axios.post(
        "http://localhost:5000/api/billing",
        formData
      );

      setShowModal(false);

      setFormData({
        patient_id: "",
        service_name: "",
        amount: "",
        billing_date: "",
      });

      fetchBills();

    } catch (error) {
      console.error(error);
    }
  };

  const markPaid = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/billing/${id}/pay`
      );

      fetchBills();

    } catch (error) {
      console.error(error);
    }
  };

  const deleteBill = async (id) => {

    if (!window.confirm("Delete this invoice?"))
      return;

    try {

      await axios.delete(
        `http://localhost:5000/api/billing/${id}`
      );

      fetchBills();

    } catch (error) {
      console.error(error);
    }
  };

  const filteredBills = bills.filter(
    (bill) =>
      bill.patient_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      bill.service_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalRevenue = bills
    .filter((b) => b.payment_status === "Paid")
    .reduce(
      (sum, b) => sum + Number(b.amount),
      0
    );

  const paidBills = bills.filter(
    (b) => b.payment_status === "Paid"
  ).length;

  const pendingBills = bills.filter(
    (b) => b.payment_status === "Pending"
  ).length;

  return (
  <DashboardLayout>

    {/* HEADER */}

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Billing & Finance
        </h1>

        <p className="text-slate-500 mt-2">
          Manage invoices, payments and hospital revenue.
        </p>

      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
      >
        <FaPlus />
        New Invoice
      </button>

    </div>

    {/* SUMMARY CARDS */}

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">

          <FaMoneyBillWave className="text-green-600 text-2xl" />

        </div>

        <h3 className="mt-4 text-4xl font-bold">
          ${totalRevenue.toFixed(2)}
        </h3>

        <p className="text-slate-500">
          Revenue Collected
        </p>

      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">

          <FaFileInvoiceDollar className="text-blue-600 text-2xl" />

        </div>

        <h3 className="mt-4 text-4xl font-bold">
          {bills.length}
        </h3>

        <p className="text-slate-500">
          Total Invoices
        </p>

      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">

          <FaCheckCircle className="text-green-600 text-2xl" />

        </div>

        <h3 className="mt-4 text-4xl font-bold">
          {paidBills}
        </h3>

        <p className="text-slate-500">
          Paid Invoices
        </p>

      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">

          <FaClock className="text-red-600 text-2xl" />

        </div>

        <h3 className="mt-4 text-4xl font-bold">
          {pendingBills}
        </h3>

        <p className="text-slate-500">
          Pending Bills
        </p>

      </div>

    </div>

    {/* SEARCH */}

    <div className="bg-white rounded-3xl p-4 shadow-sm mb-6">

      <div className="flex items-center gap-3">

        <FaSearch className="text-slate-400" />

        <input
          type="text"
          placeholder="Search patient or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />

      </div>

    </div>

    {/* TABLE */}

    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="text-left p-5">Patient</th>

            <th className="text-left p-5">Service</th>

            <th className="text-left p-5">Amount</th>

            <th className="text-left p-5">Date</th>

            <th className="text-left p-5">Status</th>

            <th className="text-left p-5">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredBills.map((bill) => (

            <tr
              key={bill.bill_id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-5 font-medium">
                {bill.patient_name}
              </td>

              <td className="p-5">
                {bill.service_name}
              </td>

              <td className="p-5 font-semibold">
                ${Number(bill.amount).toFixed(2)}
              </td>

              <td className="p-5">
                {bill.billing_date}
              </td>

              <td className="p-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    bill.payment_status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {bill.payment_status}
                </span>

              </td>

              <td className="p-5 flex gap-3">

                {bill.payment_status === "Pending" && (

                  <button
                    onClick={() => markPaid(bill.bill_id)}
                    className="text-green-600 hover:underline"
                  >
                    Mark Paid
                  </button>

                )}

                <button
                  onClick={() => deleteBill(bill.bill_id)}
                  className="text-red-600"
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* ADD BILL MODAL */}

    {showModal && (

      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Create Invoice
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
              className="w-full border rounded-xl p-3"
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

            <input
              type="text"
              name="service_name"
              placeholder="Service Name"
              value={formData.service_name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="number"
              step="0.01"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <input
              type="date"
              name="billing_date"
              value={formData.billing_date}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
            >
              Create Invoice
            </button>

          </form>

        </div>

      </div>

    )}

  </DashboardLayout>
);
}

export default Billing;