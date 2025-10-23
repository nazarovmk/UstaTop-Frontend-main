import { useTranslation } from "react-i18next";
import { HeartOff } from "lucide-react";
import { CiStar } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import ProfileSidebar from "./ProfileSidebar";

export default function FavoriteAds() {
  const { t } = useTranslation();

  return (
    <div className="lg:px-4 lg:py-8">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <ProfileSidebar />
        </div>

        {/* Content */}
        <div className="w-full flex-1 px-5">
          <h2 className="text-[#0F172B] text-xl font-semibold mb-5">
            {t("favorites.title") || "Sevimli ustalar"}
          </h2>

          {/* E’lonlar ro‘yxati (demo uchun bitta element) */}
          <div className="mt-5">
            <div className="p-5 border border-[#90A4BB] rounded-lg mb-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Chap blok */}
                <div className="flex md:flex-col items-center md:items-start gap-2 shrink-0">
                  <img
                    src="/default-avatar.png"
                    alt="user avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium text-[#0F172BB2]">Usta</p>
                  <p className="text-sm font-medium text-[#90A4BB]">
                    150000 so‘m
                  </p>
                </div>

                {/* O‘rta blok */}
                <div className="flex flex-col md:w-[200px]">
                  <p className="text-[#0F172B] text-base font-semibold">
                    Ali Usta
                  </p>
                  <div className="flex gap-2 items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CiStar key={i} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-xs text-[#0F172BB2]">5 ta sharh</p>
                  </div>
                </div>

                {/* O‘ng blok */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-[#0F172B] text-sm md:text-base font-medium mb-2">
                    Elektrik xizmatlari
                  </h3>
                  <div className="flex flex-wrap gap-2 text-[#90A4BB] text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <IoLocation />
                      <span>Toshkent</span>
                    </div>
                    <span className="ml-auto md:ml-0">21.10.2025</span>
                  </div>
                </div>
              </div>

              {/* Harakatlar */}
              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  className="p-2 text-red-600 cursor-pointer rounded-full hover:bg-red-100"
                  title="Sevimlilardan o‘chirish"
                >
                  <FaTrashCan className="w-5 h-5" />
                </button>
                <button className="py-[7px] px-[39px] bg-[#009966B2] text-white rounded-xl flex items-center gap-2 hover:bg-[#009966]">
                  <FaEye />
                  Ko‘rish
                </button>
              </div>
            </div>
          </div>

          {/* Agar sevimli ustalar bo‘lmasa — bo‘sh holat */}
          <div className="text-center py-10">
            <HeartOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {t("favorites.noFavorites") ||
                "Sizda hozircha sevimli ustalar yo‘q"}
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              {t("favorites.goToList") || "Bosh sahifaga qaytish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
