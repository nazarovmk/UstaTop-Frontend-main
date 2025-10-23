import { useTranslation } from "react-i18next";
import ProfileSidebar from "./ProfileSidebar";
import { CiStar } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";

function Elons() {
  const { t } = useTranslation();

  return (
    <div className="lg:px-4 lg:py-8">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[320px]">
          <ProfileSidebar />
        </div>

        {/* Content */}
        <div className="w-full flex-1 px-5 pb-5">
          <h2 className="text-[#0F172B] text-xl font-semibold mb-5">
            {t("elons.title") || "Mening e’lonlarim"}
          </h2>

          {/* E'lon kartalari (demo ma'lumot bilan) */}
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

                {/* Markaziy blok */}
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

              {/* Harakatlar (edit va delete) */}
              <div className="flex justify-end gap-3 mt-4">
                <MdModeEditOutline
                  className="text-[#009966] cursor-pointer w-5 h-5"
                  title="Tahrirlash"
                />
                <FaTrashCan
                  className="text-red-600 cursor-pointer w-5 h-5"
                  title="O‘chirish"
                />
              </div>
            </div>
          </div>

          {/* Tahrirlash formasi (statik ko‘rinish) */}
          <div className="mt-5 p-5 border border-[#90A4BB] rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {t("elons.editForm.title") || "E’lonni tahrirlash"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Ism</legend>
                <input
                  type="text"
                  className="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Ismingizni kiriting"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Manzil</legend>
                <input
                  type="text"
                  className="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Manzil kiriting"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Mutaxassislik</legend>
                <input
                  type="text"
                  className="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Masalan: Elektrik"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Narx</legend>
                <input
                  type="text"
                  className="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Masalan: 150000"
                />
              </fieldset>

              <fieldset className="fieldset md:col-span-2">
                <legend className="fieldset-legend">Bio</legend>
                <textarea
                  className="textarea w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="O‘zingiz haqingizda yozing..."
                ></textarea>
              </fieldset>
            </div>

            <div className="flex justify-end gap-3 mt-4">
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
    </div>
  );
}

export default Elons;
