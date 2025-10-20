import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function Reyting() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-yellow-100 mb-6">
          <AlertTriangle className="w-10 h-10 text-yellow-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Sahifa topilmadi
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Hozircha <span className="font-semibold">Reyting</span> sahifasi
          mavjud emas. Tez orada bu bo‘lim ishga tushadi.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default Reyting;
