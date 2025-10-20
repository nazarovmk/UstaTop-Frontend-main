import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GiWorld } from "react-icons/gi";
import { HiChevronDown } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Header() {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(i18n.language || "uz");
  const { currentUser } = useAuth();

  const languages = [
    { label: "uz", value: "uz" },
    { label: "ru", value: "ru" },
    { label: "en", value: "en" },
  ];

  const handleSelect = (lang: { label: string; value: string }) => {
    setSelected(lang.label);
    i18n.changeLanguage(lang.value);
    setIsOpen(false);
  };

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-[1290px] mx-auto px-4 md:px-5 py-3 flex items-center justify-between">
        {/* Logo + Hudud tanlash */}
        <div className="flex items-center gap-5 sm:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px]"
              src="./LogoUstaTop.png"
              alt="Logo"
            />
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#00A445]">
              Ustatop.uz
            </p>
          </Link>

          <button
            className="cursor-pointer hidden sm:flex"
            onClick={() => modalRef.current?.showModal()}
          >
            <p className="font-semibold flex items-center gap-1 sm:gap-2 text-[14px] sm:text-[16px]">
              {t("header.region")} <HiChevronDown size={18} />
            </p>
          </button>

          {/* Modal */}
          <dialog ref={modalRef} className="modal">
            <div className="modal-box rounded-2xl max-w-[600px] w-[95%]">
              <h3 className="font-bold text-[18px] sm:text-[20px] text-center mb-6">
                {t("header.selectRegion")}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                {[
                  t("regions.andijan"),
                  t("regions.bukhara"),
                  t("regions.fergana"),
                  t("regions.jizzakh"),
                  t("regions.namangan"),
                  t("regions.navoiy"),
                  t("regions.kashkadarya"),
                  t("regions.samarkand"),
                  t("regions.sirdarya"),
                  t("regions.surxondarya"),
                  t("regions.tashkentRegion"),
                  t("regions.khorezm"),
                  t("regions.karakalpakstan"),
                ].map((region) => (
                  <Link
                    key={region}
                    to="#"
                    className="text-left text-[15px] sm:text-[16px] text-[#0F172B] hover:text-[#009966] hover:font-bold"
                  >
                    {region}
                  </Link>
                ))}
              </ul>
              <div className="modal-action mt-6">
                <form method="dialog">
                  <button className="btn w-full sm:w-auto">
                    {t("header.select")}
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* Til tanlash + Profil */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Til */}
          <span className="flex items-center gap-2">
            <GiWorld className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D5EA6]" />
            <div className="relative inline-block w-16 sm:w-20">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border border-gray-300 rounded-lg px-2 sm:px-3 py-1 text-gray-700 flex justify-between items-center text-[14px] sm:text-[15px]"
              >
                <span>{selected}</span>
                <HiChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => handleSelect(lang)}
                      className="w-full text-left px-3 py-2 hover:bg-green-50 text-gray-700 text-[14px]"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </span>

          {/* Profil yoki Kirish */}
          {currentUser ? (
            <>
              <Link
                to="/elonjoylash"
                className="hidden sm:flex items-center gap-2 border-2 border-[#009966] rounded-lg px-3 sm:px-4 py-1 text-[#009966] text-[13px] sm:text-[14px]"
              >
                {t("header.postAd")} <IoMdAdd className="text-[18px]" />
              </Link>
              <Link
                to="/personalInformation"
                className="hidden sm:flex flex-col items-center"
              >
                <CgProfile className="w-6 h-6 text-[#0F172B]" />
                <p className="text-[13px]">{t("header.profile")}</p>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hidden sm:flex items-center gap-2 border-2 border-[#009966] rounded-lg px-3 py-1 text-[#009966] text-[13px] sm:text-[14px]"
              >
                {t("header.postAd")} <IoMdAdd className="text-[18px]" />
              </Link>
              <Link
                to="/signup"
                className="hidden sm:flex flex-col items-center"
              >
                <CgProfile className="w-6 h-6 text-[#0F172B]" />
                <p className="text-[13px]">{t("header.profile")}</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
