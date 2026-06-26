import db from "../config/db.js";

export const getDashboardData = async (req, res) => {
  try {
    // Total Patients
    const [patients] = await db.query(`
      SELECT COUNT(*) AS totalPatients
      FROM patients
    `);

    // Total Doctors
    const [doctors] = await db.query(`
      SELECT COUNT(*) AS totalDoctors
      FROM doctors
    `);

    // Total Appointments
    const [appointments] = await db.query(`
      SELECT COUNT(*) AS totalAppointments
      FROM appointments
    `);

    // Total Revenue (Paid Bills)
    const [revenue] = await db.query(`
  SELECT IFNULL(SUM(amount),0) AS monthlyRevenue
  FROM billing
  WHERE payment_status='Paid'
  `);
    // Patient Growth
    const [growth] = await db.query(`
      SELECT
      MONTH(created_at) AS monthNumber,
      DATE_FORMAT(created_at,'%b') AS month,
      COUNT(*) AS patients
      FROM patients
      GROUP BY MONTH(created_at),DATE_FORMAT(created_at,'%b')
      ORDER BY MONTH(created_at)
    `);

    // Recent Patients
    const [recentPatients] = await db.query(`
  SELECT
    patient_id,
    CONCAT(first_name,' ',last_name) AS name,
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age,
    gender
  FROM patients
  ORDER BY patient_id DESC
  LIMIT 5
`);

    // Recent Activity
    const [activity] = await db.query(`
      (
        SELECT
        CONCAT(first_name,' ',last_name) AS subtitle,
        'New Patient Registered' AS title,
        created_at
        FROM patients
      )

      UNION ALL

      (
        SELECT
        CONCAT('Appointment #',appointment_id),
        'Appointment Scheduled',
        created_at
        FROM appointments
      )

      UNION ALL

      (
        SELECT
        CONCAT(first_name,' ',last_name),
        'Doctor Added',
        created_at
        FROM doctors
      )

      ORDER BY created_at DESC
      LIMIT 5
    `);

    res.json({
      totalPatients: patients[0].totalPatients,
      totalDoctors: doctors[0].totalDoctors,
      totalAppointments: appointments[0].totalAppointments,
      monthlyRevenue: revenue[0].monthlyRevenue,
      patientGrowth: growth,
      recentPatients,
      recentActivity: activity,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load dashboard."
    });
  }
};