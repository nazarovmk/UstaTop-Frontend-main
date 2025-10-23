import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { RiLogoutCircleRLine, RiMedalLine } from "react-icons/ri";
import { TfiClipboard, TfiCreditCard, TfiUser } from "react-icons/tfi";
import { useAuth } from "../../context/AuthContext";

const ProfileSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // 🔹 AuthContext-dan logout funksiyani olish

  // Demo ma'lumotlar
  const demoUser = {
    firstName: "Ali",
    lastName: "Usta",
    phone: "+99890 123 45 67",
    avatar: "/default-avatar.png",
  };

  const menuItems = [
    {
      label: t("profileSidebar.menu.personalInfo") || "Shaxsiy maʼlumotlar",
      icon: <TfiUser />,
      to: "/personalInformation",
    },
    {
      label: t("profileSidebar.menu.myAds") || "Mening eʼlonlarim",
      icon: <TfiClipboard />,
      to: "/elons",
    },
    {
      label: t("profileSidebar.menu.favoriteAds") || "Sevimlilar",
      icon: <FiHeart />,
      to: "/favorites",
    },
    {
      label: t("profileSidebar.menu.tariffs") || "Tariflar",
      icon: <TfiCreditCard />,
      to: "/tariffs",
    },
    {
      label: t("profileSidebar.menu.rating") || "Reyting",
      icon: <RiMedalLine />,
      to: "/reyting",
    },
  ];

  const getIsActive = (itemTo?: string) => location.pathname === itemTo;

  // 🔹 Logout funksiyasi
  const handleLogout = () => {
    logout(); // AuthContext’dagi foydalanuvchini o‘chiradi
    navigate("/login"); // Login sahifasiga yo‘naltiradi
  };

  return (
    <div className="w-full lg:w-[320px] lg:rounded-2xl overflow-hidden border border-[#AAB2BD] shadow">
      {/* Yuqori qism */}
      <div className="bg-gradient-to-r from-[#009966] to-[#66cc99] h-28 relative flex justify-center items-center rounded-b-[20px]">
        <div className="absolute bottom-[-40px] flex flex-col items-center">
          <div className="relative">
            <img
              src={demoUser.avatar}
              alt={t("profileSidebar.avatarAlt") || "Avatar"}
              className="w-20 h-20 rounded-full border-4 border-white object-cover cursor-pointer hover:opacity-80 transition"
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* Foydalanuvchi ma'lumotlari */}
      <div className="mt-12 pb-6">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-center text-lg font-semibold text-[#0F172B]">
            {demoUser.firstName} {demoUser.lastName}
          </h2>
          <p className="text-[18px] text-gray-600 mt-1 font-semibold">
            {demoUser.phone}
          </p>
        </div>

        {/* Menyu */}
        <div className="flex flex-col divide-y divide-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-medium transition-colors ${
                getIsActive(item.to)
                  ? "bg-[#E6F4F1] text-[#009966]"
                  : "text-[#0F172B] hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* 🔹 Logout tugmasi */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <RiLogoutCircleRLine className="text-lg" />
            <span>{t("profileSidebar.menu.logout") || "Chiqish"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
