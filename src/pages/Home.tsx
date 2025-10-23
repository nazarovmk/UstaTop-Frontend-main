import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, Star, Phone, MapPin, Heart } from "lucide-react";

/* --- INTERFACES --- */
interface AdData {
  id: number;
  experience: string;
  additionalInformation: string;
  appealTime: string;
  price: number;
  images?: string[];
}

/* --- BUTTON --- */
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-3 rounded-xl font-medium focus:outline-none transition-all duration-200 flex items-center justify-center";
  const variants =
    "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-md hover:shadow-lg";
  return (
    <button className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* --- INPUT --- */
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => (
  <div className="relative">
    <input
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 w-full ${className}`}
    />
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
);

/* --- CATEGORY --- */
const categories = [
  { name: "Qurilish va ta'mirlash", icon: "/profil.png" },
  { name: "Elekterik va santexnika", icon: "/Elektrik-Santexnika.svg" },
  {
    name: "Sovutish va isitish texnikasi",
    icon: "/Sovutish-va-isitish-texnikasi.svg",
  },
  { name: "Kamera", icon: "/kamera.svg" },
  { name: "Mebel va interyer", icon: "/mebel.svg" },
  { name: "Avto xizmatlar", icon: "/Avto-xizmatlar.svg" },
  { name: "Bog' xizmatlari", icon: "/bogbon.png" },
  { name: "Texnika va gadjetlar", icon: "/texnika-va-gatjetla.svg" },
];

const Category: React.FC<{
  name: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}> = ({ name, icon, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 ${
      active ? "scale-105" : ""
    }`}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full p-1 bg-gradient-to-br from-white to-green-600 hover:scale-110 transition-transform duration-300 ease-in-out overflow-clip">
      <div className="w-full h-full rounded-full p-1 bg-white flex items-center justify-center">
        <img src={icon} alt={name} className="object-contain w-24 h-24" />
      </div>
    </div>
    <span
      className={`text-xs sm:text-sm text-center font-medium ${
        active ? "text-green-600" : "text-gray-800"
      }`}
    >
      {name}
    </span>
  </div>
);

/* --- MASTER CARD --- */
const MasterCard: React.FC<{ ad: AdData; onClick: () => void }> = ({
  ad,
  onClick,
}) => {
  const imageUrl =
    ad.images && ad.images.length > 0 ? ad.images[0] : "/default-avatar.png";

  return (
    <div
      onClick={onClick}
      className="border border-gray-300 rounded-xl p-4 sm:p-6 relative bg-white w-full max-w-md mx-auto sm:max-w-full cursor-pointer"
    >
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-3 space-x-2">
        <button className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 cursor-pointer">
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500 transition" />
        </button>
      </div>

      {/* Content */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
        <img
          src={imageUrl}
          alt="avatar"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            {ad.experience || "Tajriba ko‘rsatilmagan"}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-2">
              ({Math.floor(Math.random() * 5)} yil)
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
        {ad.additionalInformation}
      </p>

      <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span>{ad.appealTime}</span>
      </div>

      <p className="text-sm sm:text-base font-semibold text-gray-900">
        Narxi: {ad.price} so‘m
      </p>
    </div>
  );
};

/* --- HOME PAGE --- */
const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Demo ma’lumotlar (fake data)
  const demoAds: AdData[] = [
    {
      id: 1,
      experience: "3 yil tajriba",
      additionalInformation: "Elektrik ishlarini sifatli bajaramiz.",
      appealTime: "09:00 - 18:00",
      price: 200000,
      images: ["/usta.png"],
    },
    {
      id: 2,
      experience: "5 yil tajriba",
      additionalInformation: "Kamera o‘rnatish xizmati.",
      appealTime: "10:00 - 17:00",
      price: 150000,
      images: ["/kamera.svg"],
    },
    {
      id: 3,
      experience: "2 yil tajriba",
      additionalInformation: "Santexnik ishlar, suv ta’minoti, isitish tizimi.",
      appealTime: "08:00 - 20:00",
      price: 100000,
      images: ["/Elektrik-Santexnika.svg"],
    },
  ];

  const filteredAds = demoAds.filter(
    (ad) =>
      ad.experience.toLowerCase().includes(search.toLowerCase()) ||
      ad.additionalInformation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-900">
      {/* HERO */}
      <section>
        <div className="py-6 lg:py-12 px-4 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mx-auto max-w-7xl">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                {t("hero.title") || "Ustalarni topish osonroq bo‘ldi!"}
              </span>
            </h1>
            <p className="mb-6 text-lg sm:text-xl text-gray-600 max-w-[600px]">
              {t("hero.desc") ||
                "Yaxshi usta, ishonchli xizmat va arzon narxlarni toping."}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center max-w-2xl gap-3">
              <div className="flex-1 w-full">
                <Input
                  placeholder="E’lon qidiring..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button className="whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0">
                <Search className="w-4 h-4 mr-2" />
                {t("home.search") || "Qidirish"}
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full opacity-20"></div>
              <img
                src="/usta.png"
                alt="Hero"
                className="w-full max-w-md lg:max-w-full h-auto rounded-2xl shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="bg-gray-50 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              {t("home.categoriesTitle") || "Kategoriyalar"}
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <Category
                key={i}
                name={cat.name}
                icon={cat.icon}
                active={selectedCategory === cat.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? null : cat.name
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ADS */}
      <section className="bg-gray-50 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t("home.topMasters") || "Eng so‘nggi e’lonlar"}
          </h2>

          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredAds.map((ad) => (
                <MasterCard
                  key={ad.id}
                  ad={ad}
                  onClick={() => navigate(`/ElonKorish/${ad.id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Hozircha e’lonlar mavjud emas.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
