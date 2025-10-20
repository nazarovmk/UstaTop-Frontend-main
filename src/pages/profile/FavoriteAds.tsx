import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HeartOff } from "lucide-react";
import { CiStar } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import ProfileSidebar from "./ProfileSidebar";
import { auth, db } from "../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

export default function FavoriteAds() {
  const { t } = useTranslation();
  const [favoriteMasters, setFavoriteMasters] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<Record<string, any>>({}); // Foydalanuvchi ma'lumotlari
  const navigate = useNavigate();

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini yuklash
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

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const favoriteIds = userData.favorites || [];

          const favoritesData: any[] = [];
          favoriteIds.forEach((id: string) => {
            const masterData = localStorage.getItem(`master_${id}`);
            if (masterData) {
              favoritesData.push(JSON.parse(masterData));
            }
          });

          setFavoriteMasters(favoritesData);
        }
      } catch (error) {
        console.error(t("favorites.errors.fetchError"), error);
      }
    };

    fetchFavorites();
  }, [t]);

  // To'g'ri avatar URL ni olish funksiyasi
  const getAvatarUrl = (master: any) => {
    // Agar masterda uid maydoni bo'lsa va ushbu foydalanuvchining yangi avatari bo'lsa
    if (master.uid && usersData[master.uid] && usersData[master.uid].avatar) {
      return usersData[master.uid].avatar;
    }
    // Aks holda masterdagi avatarUrl dan foydalanish
    return master.avatarUrl || "/default-avatar.png";
  };

  const removeFavorite = async (masterId: string) => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favorites: arrayRemove(masterId),
      });

      setFavoriteMasters((prev) => prev.filter((m) => m.id !== masterId));
    } catch (error) {
      console.error(t("favorites.errors.removeError"), error);
    }
  };

  const viewMaster = (masterId: string) => {
    navigate(`/ElonKorish/${masterId}`);
  };

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
            {t("favorites.title")}
          </h2>

          {/* Tab contents */}
          <div className="mt-5">
            {favoriteMasters.length > 0 ? (
              favoriteMasters.map((master) => {
                const avatarUrl = getAvatarUrl(master);

                return (
                  <div
                    key={master.id}
                    className="p-5 border border-[#90A4BB] rounded-lg mb-4"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Left Block */}
                      <div className="flex md:flex-col items-center md:items-start gap-2 shrink-0">
                        <img
                          src={avatarUrl}
                          alt={t("favorites.userAlt")}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            // Agar rasm yuklanmasa, default rasmni ko'rsatish
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                        <p className="text-sm font-medium text-[#0F172BB2]">
                          {master.kategoriya || t("favorites.defaultCategory")}
                        </p>
                        <p className="text-sm font-medium text-[#90A4BB]">
                          {master.narx || t("favorites.defaultPrice")}
                        </p>
                      </div>

                      {/* Center Block */}
                      <div className="flex flex-col md:w-[200px]">
                        <p className="text-[#0F172B] text-base font-semibold">
                          {master.ism}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <CiStar
                                key={i}
                                className="w-4 h-4 text-yellow-500"
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#0F172BB2]">
                            {t("favorites.reviews", { count: 5 })}
                          </p>
                        </div>
                      </div>

                      {/* Right Block */}
                      <div className="flex flex-col flex-1">
                        <h3 className="text-[#0F172B] text-sm md:text-base font-medium mb-2">
                          {master.mutaxasislik &&
                          Array.isArray(master.mutaxasislik)
                            ? master.mutaxasislik.join(", ")
                            : master.mutaxasislik ||
                              t("favorites.defaultServices")}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-[#90A4BB] text-xs md:text-sm">
                          <div className="flex items-center gap-1">
                            <IoLocation />
                            <span>
                              {master.manzil || t("favorites.noAddress")}
                            </span>
                          </div>
                          <span className="ml-auto md:ml-0">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 mt-4">
                      <button
                        onClick={() => removeFavorite(master.id)}
                        className="p-2 text-red-600 cursor-pointer rounded-full hover:bg-red-100"
                        title={t("favorites.actions.remove")}
                      >
                        <FaTrashCan className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => viewMaster(master.id)}
                        className="py-[7px] px-[39px] bg-[#009966B2] text-white rounded-xl flex items-center gap-2 hover:bg-[#009966]"
                      >
                        <FaEye />
                        {t("favorites.actions.view")}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <HeartOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">{t("favorites.noFavorites")}</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {t("favorites.goToList")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
