import db from "../config/db.js";

export const getReportData = async (req, res) => {
  try {

    // KPI Cards

    const [[patients]] = await db.query(`
      SELECT COUNT(*) AS totalPatients
      FROM patients
    `);

    const [[doctors]] = await db.query(`
      SELECT COUNT(*) AS totalDoctors
      FROM doctors
    `);

    const [[appointments]] = await db.query(`
      SELECT COUNT(*) AS totalAppointments
      FROM appointments
    `);

    const [[revenue]] = await db.query(`
      SELECT
        IFNULL(SUM(amount),0) AS totalRevenue
      FROM billing
      WHERE payment_status='Paid'
    `);

    // Monthly Patients

    const [patientGrowth] = await db.query(`
      SELECT
      DATE_FORMAT(created_at,'%b') AS month,
      COUNT(*) AS patients
      FROM patients
      GROUP BY MONTH(created_at)
      ORDER BY MONTH(created_at)
    `);

    // Monthly Revenue

    const [revenueTrend] = await db.query(`
      SELECT
      DATE_FORMAT(created_at,'%b') AS month,
      SUM(amount) AS revenue
      FROM billing
      WHERE payment_status='Paid'
      GROUP BY MONTH(created_at)
      ORDER BY MONTH(created_at)
    `);

    // Department Distribution

    const [departments] = await db.query(`
      SELECT
      department AS name,
      COUNT(*) AS value
      FROM doctors
      GROUP BY department
    `);

    res.json({
      patients: patients.totalPatients,
      doctors: doctors.totalDoctors,
      appointments: appointments.totalAppointments,
      revenue: revenue.totalRevenue,
      patientGrowth,
      revenueTrend,
      departments,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error loading reports",
    });

  }
};