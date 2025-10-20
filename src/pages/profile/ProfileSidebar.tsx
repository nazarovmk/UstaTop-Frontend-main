import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { RiLogoutCircleRLine, RiMedalLine } from "react-icons/ri";
import { TfiClipboard, TfiCreditCard, TfiUser } from "react-icons/tfi";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";

const IMGBB_API_KEY = "949369692e037ce08b224819cc59c30d";

const ProfileSidebar: React.FC = () => {
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

      // 4) User ma'lumotlarini yangilash (agar contextda bunday funksiya mavjud bo'lsa)
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
      {/* Top section */}
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

      {/* Content */}
      <div className="mt-12 pb-6">
        {/* Name va phone har doim ko'rinadi */}
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

        {/* Menu */}
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

export default ProfileSidebar;
