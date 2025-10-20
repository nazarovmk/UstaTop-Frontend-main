import React, {
  useRef,
  useState,
  useEffect,
  FC,
  InputHTMLAttributes,
} from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { RiLogoutCircleRLine, RiMedalLine } from "react-icons/ri";
import { TfiClipboard, TfiCreditCard, TfiUser } from "react-icons/tfi";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import axios from "axios";
import { Star, Search, Heart, Phone, MapPin } from "lucide-react";
import { auth } from "../firebase/config";

const IMGBB_API_KEY = "949369692e037ce08b224819cc59c30d";

// ProfileSidebar Komponenti
export const ProfileSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userData, logout, refreshUserData } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    userData?.avatar || "/default-avatar.png"
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(t("profileSidebar.logoutError"), error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ImgBB ga rasm yuklash funksiyasi
  const uploadFileToImgbb = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data && res.data.data && res.data.data.url) {
        return res.data.data.url;
      } else {
        throw new Error("ImgBB: response missing url");
      }
    } catch (error: any) {
      console.error("Rasm yuklashda xato:", error);
      throw new Error(
        `ImgBB upload failed: ${error.response?.status || error.message}`
      );
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData?.uid || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    try {
      // 1) Rasmni ImgBB ga yuklash
      const downloadURL = await uploadFileToImgbb(file);

      // 2) Firestore ga yangi avatar URL ni saqlash
      await updateDoc(doc(db, "users", userData.uid), {
        avatar: downloadURL,
      });

      // 3) Local state ni yangilash
      setAvatarUrl(downloadURL);

      // 4) User ma'lumotlarini yangilash
      if (refreshUserData) {
        refreshUserData();
      }
    } catch (error) {
      console.error(t("profileSidebar.uploadError"), error);
      alert(t("profileSidebar.uploadError") || "Rasm yuklashda xatolik");
    } finally {
      setUploading(false);
    }
  };

  const menuItems = [
    {
      label: t("profileSidebar.menu.personalInfo"),
      icon: <TfiUser />,
      to: "/personalInformation",
    },
    {
      label: t("profileSidebar.menu.myAds"),
      icon: <TfiClipboard />,
      to: "/elons",
    },
    {
      label: t("profileSidebar.menu.favoriteAds"),
      icon: <FiHeart />,
      to: "/favorites",
    },
    {
      label: t("profileSidebar.menu.tariffs"),
      icon: <TfiCreditCard />,
      to: "/tariffs",
    },
    {
      label: t("profileSidebar.menu.rating"),
      icon: <RiMedalLine />,
      to: "/reyting",
    },
    {
      label: t("profileSidebar.menu.logout"),
      icon: <RiLogoutCircleRLine />,
      onClick: handleLogout,
    },
  ];

  const getIsActive = (itemTo?: string) => location.pathname === itemTo;

  return (
    <div className="w-full lg:w-[320px] lg:rounded-2xl overflow-hidden border border-[#AAB2BD] shadow">
      {/* Yuqori qism */}
      <div className="bg-gradient-to-r from-[#009966] to-[#66cc99] h-28 relative flex justify-center items-center rounded-b-[20px]">
        <div className="absolute bottom-[-40px] flex flex-col items-center">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={t("profileSidebar.avatarAlt")}
              onClick={handleAvatarClick}
              className="w-20 h-20 rounded-full border-4 border-white object-cover cursor-pointer hover:opacity-80 transition"
              onError={(e) => {
                // Agar rasm yuklanmasa, default rasmni ko'rsatish
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Kontent */}
      <div className="mt-12 pb-6">
        {/* Ism va telefon raqam */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-center text-lg font-semibold text-[#0F172B]">
            {userData?.firstName || ""} {userData?.lastName || ""}
          </h2>
          {userData?.phone && (
            <p className="text-[18px] text-gray-600 mt-1 font-semibold">
              {userData.phone}
            </p>
          )}
        </div>

        {/* Menyu */}
        <div className="flex flex-col divide-y divide-gray-200">
          {menuItems.map((item) => {
            const Wrapper: React.ElementType = item.to ? Link : "button";
            return (
              <Wrapper
                key={item.label}
                {...(item.to ? { to: item.to } : { onClick: item.onClick })}
                className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-medium transition-colors ${
                  getIsActive(item.to)
                    ? "bg-[#E6F4F1] text-[#009966]"
                    : "text-[#0F172B] hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* TUGMA */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "secondary";
}

export const Button: FC<ButtonProps> = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl font-medium focus:outline-none transition-all duration-200 flex items-center justify-center";
  const variants = {
    default:
      "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 shadow-md hover:shadow-lg",
    ghost:
      "bg-transparent text-green-600 hover:bg-green-50 border border-green-600",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* INPUT */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  withIcon?: boolean;
}

export const Input: FC<InputProps> = ({
  className = "",
  withIcon,
  ...props
}) => (
  <div className="relative">
    <input
      className={`border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 w-full ${className}`}
      {...props}
    />
    {withIcon && (
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    )}
  </div>
);

/* KATEGORIYA */
interface CategoryProps {
  name: string;
  icon: string;
  onClick: () => void;
  active: boolean;
}

export const Category: FC<CategoryProps> = ({
  name,
  icon,
  onClick,
  active,
}) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 ${
      active ? "scale-105" : ""
    }`}
  >
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-[114px] xl:h-[114px] rounded-full p-1 bg-gradient-to-br from-white to-green-600 hover:scale-110 transition-transform duration-300 ease-in-out overflow-clip">
      <div className="w-full h-full rounded-full p-1 bg-white flex items-center justify-center">
        <img
          src={icon}
          alt={name}
          className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[100px] xl:h-[100px]"
        />
      </div>
    </div>
    <span
      className={`text-xs sm:text-sm text-center font-medium px-1 ${
        active ? "text-green-600" : "text-gray-800"
      }`}
    >
      {name}
    </span>
  </div>
);

/* MASTER KARTASI */
interface MasterCardProps {
  avatarUrl: string;
  name: string | JSX.Element;
  rating: number;
  experience: number;
  badgeText?: string;
  location: string;
  phone: string;
  services: string[];
  priceRange: string;
  onOrder: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  masterId: string;
  uid?: string; // Yangi qo'shilgan: foydalanuvchi ID si
}

export const MasterCard: FC<MasterCardProps> = ({
  avatarUrl,
  name,
  rating,
  experience,
  badgeText,
  phone,
  location,
  services,
  priceRange,
  onOrder,
  isFavorite = false,
  onToggleFavorite,
  uid, // Yangi qo'shilgan: foydalanuvchi ID si
}) => {
  const { t } = useTranslation();
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  // Avatar yangilanishlarini qo'llab-quvvatlash uchun holat
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);
  const [usersData, setUsersData] = useState<Record<string, any>>({});

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersDataMap: Record<string, any> = {};
        usersSnapshot.forEach((doc) => {
          usersDataMap[doc.id] = doc.data();
        });
        setUsersData(usersDataMap);
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini yuklashda xato:", error);
      }
    };

    fetchUsersData();
  }, []);

  // Avatar URL ni yangilash
  useEffect(() => {
    // Agar uid mavjud bo'lsa va ushbu foydalanuvchining yangi avatari bo'lsa
    if (uid && usersData[uid] && usersData[uid].avatar) {
      setCurrentAvatar(usersData[uid].avatar);
    } else {
      setCurrentAvatar(avatarUrl);
    }
  }, [uid, usersData, avatarUrl]);

  // Rasm yuklanmagan taqdirda ishlovchi funksiya
  const handleImageError = () => {
    setCurrentAvatar("/default-avatar.png");
  };

  return (
    <div className="border border-gray-300 rounded-xl p-4 sm:p-6 relative bg-white w-full max-w-md mx-auto sm:max-w-full cursor-pointer">
      {/* Harakat tugmalari */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-3 space-x-2">
        <button className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 cursor-pointer">
          <a href={`tel:${phone}`}>
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </button>
        <button
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer ${
            isFavorite ? "bg-red-100" : "bg-white border border-gray-200"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite();
          }}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
      {/* Ma'lumotlar */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
        <img
          src={currentAvatar}
          alt={typeof name === "string" ? name : "avatar"}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover"
          onError={handleImageError}
        />
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg font-semibold text-gray-900 whitespace-pre-line">
            {name}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            ))}
            {hasHalf && (
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 opacity-50" />
            )}
            {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
              <Star
                key={i + fullStars + 1}
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-200"
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-2">
              ({experience} {t("home.yearsExperience")})
            </span>
          </div>
        </div>
      </div>
      {badgeText && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md mb-3 sm:mb-4">
          {badgeText}
        </span>
      )}
      <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span className="truncate">{location}</span>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
        {services.slice(0, 3).map((service, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full truncate max-w-[120px] sm:max-w-none"
          >
            {service}
          </span>
        ))}
        {services.length > 3 && (
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            +{services.length - 3}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
          {t("home.servicePrice")}: {priceRange} {t("home.currency")}
        </p>
        <button
          onClick={onOrder}
          className="bg-green-600 text-white text-xs sm:text-sm font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          {t("home.order")}
        </button>
      </div>
    </div>
  );
};

/* UY SAHIFASI */
const Home: React.FC = () => {
  const [elonlar, setElonlar] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Foydalanuvchi ma'lumotlarini yangi avatarlar uchun olish
  const [usersData, setUsersData] = useState<Record<string, any>>({});

  // Ismni formatlash
  const formatName = (name: string) => {
    if (name.length > 21) {
      return (
        <>
          {name.slice(0, 21)}
          <br />
          {name.slice(21)}
        </>
      );
    }
    return name;
  };

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ustalar"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setElonlar(data);

        // Foydalanuvchi ma'lumotlarini ham yuklash
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersDataMap: Record<string, any> = {};
        usersSnapshot.forEach((doc) => {
          usersDataMap[doc.id] = doc.data();
        });
        setUsersData(usersDataMap);

        // localStorage ga saqlash
        data.forEach((master) => {
          localStorage.setItem(`master_${master.id}`, JSON.stringify(master));
        });
      } catch (error) {
        console.error("Ustalar ma'lumotlarini yuklashda xato:", error);
      }
    };
    getDocuments();

    const fetchUserFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setFavorites(userData.favorites || []);
      }
    };
    fetchUserFavorites();
  }, []);

  const toggleFavorite = async (masterId: string) => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentFavorites = userData.favorites || [];

        if (currentFavorites.includes(masterId)) {
          await updateDoc(userRef, {
            favorites: arrayRemove(masterId),
          });
          setFavorites((prev) => prev.filter((id) => id !== masterId));
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(masterId),
          });
          setFavorites((prev) => [...prev, masterId]);
        }
      } else {
        await setDoc(userRef, {
          favorites: [masterId],
        });
        setFavorites([masterId]);
      }
    } catch (error) {
      console.error("Sevimlilarga qo'shishda xato:", error);
    }
  };

  // Kategoriya nomlarini tilga qarab olish
  const getCategoryName = (categoryKey: string) => {
    return t(`categories.${categoryKey}`);
  };

  // Asosiy kategoriya kalitlari
  const categoryKeys = [
    "construction",
    "electricPlumbing",
    "coolingHeating",
    "camera",
    "furniture",
    "autoServices",
    "gardenServices",
    "techGadgets",
  ];

  // Kategoriya rasmlari uchun yo'llar
  const getCategoryIconPath = (categoryKey: string) => {
    const iconMap: Record<string, string> = {
      construction: "/profil.png",
      electricPlumbing: "/Elektrik-Santexnika.svg",
      coolingHeating: "/Sovutish-va-isitish-texnikasi.svg",
      camera: "/kamera.svg",
      furniture: "/mebel.svg",
      autoServices: "/Avto-xizmatlar.svg",
      gardenServices: "/bogbon.png",
      techGadgets: "/texnika-va-gatjetla.svg",
    };

    return iconMap[categoryKey] || `/images/categories/${categoryKey}.svg`;
  };

  // Kategoriya filterini tilga moslab sozlash
  const getLocalizedCategoryFilter = (categoryName: string) => {
    const categoryMappings: Record<string, Record<string, string>> = {
      construction: {
        uz: "Qurilish va ta'mirlash",
        ru: "Строительство и ремонт",
        en: "Construction and repair",
      },
      electricPlumbing: {
        uz: "Elekterik va santexnika",
        ru: "Электрика и сантехника",
        en: "Electrical and plumbing",
      },
      coolingHeating: {
        uz: "Sovutish va isitish texnikasi",
        ru: "Охлаждение и отопление",
        en: "Cooling and heating",
      },
      camera: {
        uz: "Kamera",
        ru: "Камеры",
        en: "Cameras",
      },
      furniture: {
        uz: "Mebel va interyer",
        ru: "Мебель и интерьер",
        en: "Furniture and interior",
      },
      autoServices: {
        uz: "Avto xizmatlar",
        ru: "Автоуслуги",
        en: "Auto services",
      },
      gardenServices: {
        uz: "Bog' xizmatlari",
        ru: "Садовые услуги",
        en: "Garden services",
      },
      techGadgets: {
        uz: "Texnika va gadjetlar",
        ru: "Техника и гаджеты",
        en: "Technology and gadgets",
      },
    };

    // Mos keladigan kategoriya kalitini topish
    const matchedCategoryKey = Object.keys(categoryMappings).find((key) =>
      Object.values(categoryMappings[key]).includes(categoryName)
    );

    if (matchedCategoryKey) {
      return Object.values(categoryMappings[matchedCategoryKey]);
    }

    return [categoryName];
  };

  // To'g'ri avatar URL ni olish funksiyasi
  const getAvatarUrl = (master: any) => {
    // Agar masterda uid maydoni bo'lsa va ushbu foydalanuvchining yangi avatari bo'lsa
    if (master.uid && usersData[master.uid] && usersData[master.uid].avatar) {
      return usersData[master.uid].avatar;
    }
    // Aks holda masterdagi avatarUrl dan foydalanish
    return master.avatarUrl || "/default-avatar.png";
  };

  const filteredElonlar = elonlar.filter((e) => {
    const matchesSearch =
      search === "" ||
      e.ism.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(e.mutaxasislik)
        ? e.mutaxasislik.some((m: string) =>
            m.toLowerCase().includes(search.toLowerCase())
          )
        : e.mutaxasislik.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      (e.kategoriya &&
        getLocalizedCategoryFilter(selectedCategory).some(
          (category: string) => {
            const categoryLower = category.toLowerCase();
            const eCategoryLower = e.kategoriya.toLowerCase();
            return (
              eCategoryLower.includes(categoryLower) ||
              categoryLower.includes(eCategoryLower)
            );
          }
        ));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-b min-h-screen">
      <div className="text-gray-900">
        {/* HERO QISMI */}
        <section>
          <div className="py-6 lg:py-12 px-4 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mx-auto max-w-7xl">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  {t("hero.title")}
                </span>
              </h1>
              <p className="mb-6 text-lg sm:text-xl text-gray-600 max-w-[600px]">
                {t("hero.desc")}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center max-w-2xl gap-3">
                <div className="flex-1 w-full">
                  <Input
                    placeholder={t("home.searchPlaceholder")}
                    withIcon
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button className="whitespace-nowrap cursor-pointer w-full sm:w-auto mt-2 sm:mt-0">
                  <Search className="w-4 h-4 mr-2" />
                  {t("home.search")}
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

        {/* KATEGORIYALAR */}
        <section id="categories" className="bg-gray-50 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 sm:mb-8 md:mb-10">
                {t("home.categoriesTitle")}
              </h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 sm:gap-4">
              {categoryKeys.map((categoryKey, i) => {
                const categoryName = getCategoryName(categoryKey);
                return (
                  <Category
                    key={i}
                    name={categoryName}
                    icon={getCategoryIconPath(categoryKey)}
                    active={selectedCategory === categoryName}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === categoryName ? null : categoryName
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ELONLAR */}
        <section className="bg-gray-50 py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("home.topMasters")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {filteredElonlar.length > 0 ? (
                filteredElonlar.map((e) => {
                  return (
                    <MasterCard
                      key={e.id || Math.random()}
                      avatarUrl={getAvatarUrl(e)}
                      name={formatName(e.ism)}
                      rating={e.rating || 4.8}
                      experience={e.tajriba}
                      badgeText={e.murojaatVaqti}
                      location={e.manzil}
                      services={
                        Array.isArray(e.mutaxasislik)
                          ? e.mutaxasislik
                          : [e.mutaxasislik]
                      }
                      priceRange={e.narx}
                      phone={e.phone}
                      masterId={e.id}
                      uid={e.uid} // Yangi qo'shilgan: foydalanuvchi ID si
                      isFavorite={favorites.includes(e.id)}
                      onToggleFavorite={() => toggleFavorite(e.id)}
                      onOrder={() => navigate(`/ElonKorish/${e.id}`)}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500 col-span-full text-center py-8">
                  {t("home.notFound")}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
