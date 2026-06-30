CREATE DATABASE IF NOT EXISTS ohms_db;
USE ohms_db;

-- -----------------------------------------------------
-- Table: roles
-- -----------------------------------------------------
CREATE TABLE roles (
    role_id INT(11) NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (role_id),
    UNIQUE KEY role_name (role_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: users
-- -----------------------------------------------------
CREATE TABLE users (
    user_id INT(11) NOT NULL AUTO_INCREMENT,
    role_id INT(11) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id),
    UNIQUE KEY email (email),
    KEY role_id (role_id),

    CONSTRAINT users_ibfk_1
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: patients
-- -----------------------------------------------------
CREATE TABLE patients (
    patient_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('Male','Female') NOT NULL,
    date_of_birth DATE DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    blood_group VARCHAR(5) DEFAULT NULL,
    emergency_contact VARCHAR(100) DEFAULT NULL,
    emergency_phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: doctors
-- -----------------------------------------------------
CREATE TABLE doctors (
    doctor_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) DEFAULT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    user_id INT(11) NOT NULL,
    specialization VARCHAR(150) DEFAULT NULL,
    department VARCHAR(150) DEFAULT NULL,
    status ENUM('Available','Busy','On Leave') DEFAULT 'Available',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (doctor_id),
    KEY user_id (user_id),

    CONSTRAINT doctors_ibfk_1
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: appointments
-- -----------------------------------------------------
CREATE TABLE appointments (
    appointment_id INT(11) NOT NULL AUTO_INCREMENT,
    patient_id INT(11) NOT NULL,
    doctor_id INT(11) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT DEFAULT NULL,
    status ENUM('Scheduled','Completed','Cancelled') DEFAULT 'Scheduled',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (appointment_id),
    KEY patient_id (patient_id),
    KEY doctor_id (doctor_id),

    CONSTRAINT appointments_ibfk_1
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id),

    CONSTRAINT appointments_ibfk_2
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: billing
-- -----------------------------------------------------
CREATE TABLE billing (
    bill_id INT(11) NOT NULL AUTO_INCREMENT,
    patient_id INT(11) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Pending','Paid') DEFAULT 'Pending',
    billing_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (bill_id),
    KEY patient_id (patient_id),

    CONSTRAINT billing_ibfk_1
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: invoices
-- -----------------------------------------------------
CREATE TABLE invoices (
    invoice_id INT(11) NOT NULL AUTO_INCREMENT,
    patient_id INT(11) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    invoice_date DATE DEFAULT NULL,
    status ENUM('Paid','Pending','Overdue') DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (invoice_id),
    KEY patient_id (patient_id),

    CONSTRAINT invoices_ibfk_1
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: payments
-- -----------------------------------------------------
CREATE TABLE payments (
    payment_id INT(11) NOT NULL AUTO_INCREMENT,
    invoice_id INT(11) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('Cash','Card','Mobile Money','Bank Transfer') DEFAULT NULL,
    payment_date DATE DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (payment_id),
    KEY invoice_id (invoice_id),

    CONSTRAINT payments_ibfk_1
        FOREIGN KEY (invoice_id)
        REFERENCES invoices(invoice_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: medical_records
-- -----------------------------------------------------
CREATE TABLE medical_records (
    record_id INT(11) NOT NULL AUTO_INCREMENT,
    patient_id INT(11) NOT NULL,
    doctor_id INT(11) NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT DEFAULT NULL,
    prescription TEXT DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    visit_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (record_id),
    KEY patient_id (patient_id),
    KEY doctor_id (doctor_id),

    CONSTRAINT medical_records_ibfk_1
        FOREIGN KEY (patient_id)
        REFERENCES patients(patient_id),

    CONSTRAINT medical_records_ibfk_2
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- -----------------------------------------------------
-- Table: settings
-- -----------------------------------------------------
CREATE TABLE settings (
    setting_id INT(11) NOT NULL AUTO_INCREMENT,
    hospital_name VARCHAR(150) DEFAULT NULL,
    registration_number VARCHAR(100) DEFAULT NULL,
    hospital_email VARCHAR(100) DEFAULT NULL,
    hospital_phone VARCHAR(30) DEFAULT NULL,
    hospital_address TEXT DEFAULT NULL,
    website VARCHAR(150) DEFAULT NULL,
    currency VARCHAR(20) DEFAULT NULL,
    timezone VARCHAR(100) DEFAULT NULL,
    language VARCHAR(50) DEFAULT NULL,
    email_notifications TINYINT(1) DEFAULT 1,
    sms_notifications TINYINT(1) DEFAULT 0,
    appointment_reminders TINYINT(1) DEFAULT 1,
    billing_reminders TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (setting_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO roles (role_name)
VALUES
('Admin'),
('Doctor'),
('Receptionist'),
('Accountant');