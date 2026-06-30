import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

function Settings() {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const isAdmin = user.role === "Admin";

  const [hospital, setHospital] = useState({
    hospital_name: "",
    registration_number: "",
    hospital_email: "",
    hospital_phone: "",
    hospital_address: "",
    website: "",
  });

  const [preferences, setPreferences] = useState({
    currency: "UGX",
    timezone: "Africa/Kampala",
    language: "English",
    email_notifications: true,
    sms_notifications: false,
    appointment_reminders: true,
    billing_reminders: true,
  });

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {

    if (isAdmin) {
      loadSettings();
    }

    loadProfile();

  }, []);

  const loadSettings = async () => {

    try {

      const res = await api.get("/settings");

      setHospital({
        hospital_name:
          res.data.hospital_name || "",
        registration_number:
          res.data.registration_number || "",
        hospital_email:
          res.data.hospital_email || "",
        hospital_phone:
          res.data.hospital_phone || "",
        hospital_address:
          res.data.hospital_address || "",
        website:
          res.data.website || "",
      });

      setPreferences({
        currency: res.data.currency,
        timezone: res.data.timezone,
        language: res.data.language,
        email_notifications: Boolean(
          res.data.email_notifications
        ),
        sms_notifications: Boolean(
          res.data.sms_notifications
        ),
        appointment_reminders: Boolean(
          res.data.appointment_reminders
        ),
        billing_reminders: Boolean(
          res.data.billing_reminders
        ),
      });

    } catch (err) {

      console.error(err);

    }

  };

  const loadProfile = async () => {

    try {

      const res = await api.get(
        `/users/${user.user_id}`
      );

      setProfile({
        first_name:
          res.data.first_name || "",
        last_name:
          res.data.last_name || "",
        email:
          res.data.email || "",
        phone:
          res.data.phone || "",
      });

    } catch (err) {

      console.error(err);

    }

  };

  const saveHospital = async () => {

    try {

      await api.put(
        "/settings",
        hospital
      );

      alert(
        "Hospital information updated successfully."
      );

    } catch (err) {

      console.error(err);

    }

  };

  const savePreferences = async () => {

    try {

      await api.put(
        "/settings/preferences",
        preferences
      );

      alert("Preferences updated.");

    } catch (err) {

      console.error(err);

    }

  };

  const saveProfile = async () => {

    try {

      await api.put(
        `/users/${user.user_id}`,
        profile
      );

      alert("Profile updated.");

      loadProfile();

    } catch (err) {

      console.error(err);

    }

  };

  const changePassword = async () => {

    if (
      password.newPassword !==
      password.confirmPassword
    ) {

      alert("Passwords do not match.");
      return;

    }

    try {

      await api.put(
        "/settings/password",
        {
          currentPassword:
            password.currentPassword,
          newPassword:
            password.newPassword,
        }
      );

      alert("Password changed.");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {

      console.error(err);

    }

  };

  return (
  <DashboardLayout>

    <h1 className="text-4xl font-bold mb-8">
      Settings
    </h1>

    {/* ================= ADMIN ONLY ================= */}

    {isAdmin && (
      <>
        {/* Hospital Information */}

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Hospital Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              className="border rounded-xl p-3"
              placeholder="Hospital Name"
              value={hospital.hospital_name}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  hospital_name: e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Registration Number"
              value={hospital.registration_number}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  registration_number:
                    e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Hospital Email"
              value={hospital.hospital_email}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  hospital_email:
                    e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Hospital Phone"
              value={hospital.hospital_phone}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  hospital_phone:
                    e.target.value,
                })
              }
            />

            <input
              className="border rounded-xl p-3 md:col-span-2"
              placeholder="Website"
              value={hospital.website}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  website: e.target.value,
                })
              }
            />

            <textarea
              className="border rounded-xl p-3 md:col-span-2"
              rows="3"
              placeholder="Address"
              value={hospital.hospital_address}
              onChange={(e) =>
                setHospital({
                  ...hospital,
                  hospital_address:
                    e.target.value,
                })
              }
            />

          </div>

          <button
            onClick={saveHospital}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Save Hospital Information
          </button>

        </div>
      </>
    )}

    {/* ================= EVERYONE ================= */}

    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        My Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          className="border rounded-xl p-3"
          placeholder="First Name"
          value={profile.first_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              first_name: e.target.value,
            })
          }
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Last Name"
          value={profile.last_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              last_name: e.target.value,
            })
          }
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Email"
          value={profile.email}
          onChange={(e) =>
            setProfile({
              ...profile,
              email: e.target.value,
            })
          }
        />

        <input
          className="border rounded-xl p-3"
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) =>
            setProfile({
              ...profile,
              phone: e.target.value,
            })
          }
        />

      </div>

      <button
        onClick={saveProfile}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Update Profile
      </button>

    </div>

    {/* Change Password */}

    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <div className="grid gap-5">

        <input
          type="password"
          className="border rounded-xl p-3"
          placeholder="Current Password"
          value={password.currentPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              currentPassword:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          className="border rounded-xl p-3"
          placeholder="New Password"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              newPassword:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          className="border rounded-xl p-3"
          placeholder="Confirm Password"
          value={password.confirmPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              confirmPassword:
                e.target.value,
            })
          }
        />

      </div>

      <button
        onClick={changePassword}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Change Password
      </button>

    </div>

    {/* ================= ADMIN ONLY ================= */}

    {isAdmin && (
      <div className="bg-white rounded-3xl shadow-sm p-8">

        <h2 className="text-2xl font-bold mb-6">
          System Preferences
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            className="border rounded-xl p-3"
            placeholder="Currency"
            value={preferences.currency}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                currency:
                  e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Timezone"
            value={preferences.timezone}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                timezone:
                  e.target.value,
              })
            }
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Language"
            value={preferences.language}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                language:
                  e.target.value,
              })
            }
          />

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {[
            [
              "email_notifications",
              "Email Notifications",
            ],
            [
              "sms_notifications",
              "SMS Notifications",
            ],
            [
              "appointment_reminders",
              "Appointment Reminders",
            ],
            [
              "billing_reminders",
              "Billing Reminders",
            ],
          ].map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3"
            >

              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    [key]:
                      e.target.checked,
                  })
                }
              />

              {label}

            </label>
          ))}

        </div>

        <button
          onClick={savePreferences}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Save Preferences
        </button>

      </div>
    )}

  </DashboardLayout>
);
}

export default Settings;