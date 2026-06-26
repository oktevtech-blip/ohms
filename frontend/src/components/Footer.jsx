import { FaHospital } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">

      <div className="max-w-7xl mx-auto px-8">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div>
            <div className="flex items-center gap-3">

              <FaHospital className="text-green-500 text-3xl" />

              <h3 className="text-2xl font-bold">
                OHMS
              </h3>

            </div>

            <p className="mt-4 text-slate-400 max-w-sm">
              Modern healthcare management designed for hospitals and clinics.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-slate-400">
              <li>Home</li>
              <li>Services</li>
              <li>Doctors</li>
              <li>Contact</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          © 2026 OHMS. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;