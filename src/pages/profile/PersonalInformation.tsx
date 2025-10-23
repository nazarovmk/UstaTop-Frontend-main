import { CiEdit } from "react-icons/ci";
import ProfileSidebar from "./ProfileSidebar";

function PersonalInformation() {
  return (
    <div className="lg:px-4 lg:py-8">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <ProfileSidebar />
        </div>

        {/* Forma qismi */}
        <div className="w-full flex-1 px-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[#0F172B] text-xl font-semibold">
              Shaxsiy maʼlumotlar
            </h2>
            <button className="flex items-center gap-2 text-sm text-white bg-[#FE9A00] px-4 py-2 rounded-full hover:bg-[#e68a00]">
              <CiEdit className="w-4 h-4" />
              Tahrirlash
            </button>
          </div>

          {/* Maʼlumotlar formasi */}
          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Ism
            </label>
            <input
              type="text"
              placeholder="Ismingizni kiriting"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Familiya
            </label>
            <input
              type="text"
              placeholder="Familiyangizni kiriting"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email manzilingizni kiriting"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Parol
            </label>
            <input
              type="password"
              placeholder="Yangi parol kiriting"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Manzil
            </label>
            <input
              type="text"
              placeholder="Masalan: Toshkent shahri, Chilonzor"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          {/* Aloqa ma'lumotlari */}
          <h2 className="text-[#0F172B] text-lg font-semibold mt-8 mb-4">
            Aloqa maʼlumotlari
          </h2>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Telefon raqam
            </label>
            <input
              type="tel"
              placeholder="+998901234567"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-1">
              Telegram
            </label>
            <input
              type="text"
              placeholder="@username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#009966]"
            />
          </div>

          {/* Tugmalar */}
          <div className="flex justify-end gap-3 mt-6">
            <button className="px-4 py-2 bg-[#009966] text-white rounded-lg font-medium hover:bg-[#007d50]">
              Saqlash
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400">
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
