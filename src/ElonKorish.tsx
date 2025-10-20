// src/components/ElonKorish.tsx
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import { useParams } from "react-router-dom";
import {
  BsFillTelephoneFill,
  BsClock,
  BsGeoAlt,
  BsCashCoin,
  BsPerson,
  BsBriefcase,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { MdWork, MdAttachFile, MdCalendarToday } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Yangi Elon interfeysi
interface Elon {
  id: string;
  ism: string;
  tel: string;
  kategoriya: string;
  narx: string;
  vaqt: string;
  joylashuv: string;
  bio?: string;
  mutaxasislik?: string;
  tajriba?: string;
  yosh?: string;
  telegram?: string;
  createdAt?: any;
  fayl_soni?: number;
  rasmlar?: string[];
  uid?: string; // Foydalanuvchi ID si
  // Eski maydonlar ham qo'shildi
  manzil?: string;
  murojaatVaqti?: string;
  phone?: string;
  avatarUrl?: string; // Eski avatar maydoni
}

export default function ElonKorish() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [elon, setElon] = useState<Elon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usersData, setUsersData] = useState<Record<string, any>>({}); // Foydalanuvchi ma'lumotlari

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
    if (!id) {
      setError(t("errors.idNotFound") || "ID topilmadi");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(db, "ustalar", id);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          setError(t("errors.notFound") || "E'lon topilmadi");
        } else {
          // Yangi Elon interfeysiga moslashtirish
          const data = snap.data();
          setElon({
            id: snap.id,
            ...data,
            // Eski maydonlarni yangi maydonlarga moslashtirish
            tel: data.phone || "",
            vaqt: data.murojaatVaqti || "",
            joylashuv: data.manzil || "",
          } as Elon);
        }
      } catch (e) {
        console.error("Fetch error:", e);
        setError(t("errors.fetchFailed") || "Ma'lumotni yuklashda xato");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  // To'g'ri avatar URL ni olish funksiyasi
  const getAvatarUrl = (master: Elon | null) => {
    if (!master) return "/default-avatar.png";

    // Agar masterda uid maydoni bo'lsa va ushbu foydalanuvchining yangi avatari bo'lsa
    if (master.uid && usersData[master.uid] && usersData[master.uid].avatar) {
      return usersData[master.uid].avatar;
    }
    // Aks holda masterdagi avatarUrl dan foydalanish
    return master.avatarUrl || "/default-avatar.png";
  };

  // Rasmlar doim massiv bo'ladi (yangi koddan olingan)
  const rasmlar = elon?.rasmlar ?? [];

  // Slayder funksiyalari
  const nextSlide = () => {
    if (rasmlar.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % rasmlar.length);
  };

  const prevSlide = () => {
    if (rasmlar.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? rasmlar.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    if (rasmlar.length === 0) return;
    setCurrentIndex(index);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  if (error)
    return (
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  if (!elon) return null;

  const avatarUrl = getAvatarUrl(elon);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar qismi - yangilandi */}
            <div className="relative">
              <img
                src={avatarUrl}
                alt={elon.ism}
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
                onError={(e) => {
                  // Agar rasm yuklanmasa, default rasmni ko'rsatish
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{elon.ism}</h1>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <BsBriefcase className="text-blue-500" />{" "}
                <span>{elon.mutaxasislik || elon.kategoriya}</span>
              </div>
              {elon.tajriba && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                    <span className="font-semibold">{elon.tajriba}</span>{" "}
                    {t("general.yearsOfExperience") || "yil"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${elon.tel || elon.phone}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <BsFillTelephoneFill /> {t("buttons.call") || "Qo'ng'iroq"}
            </a>

            {elon.telegram && (
              <a
                href={`https://t.me/${elon.telegram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <FaTelegram /> Telegram
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Rasmlar galereyasi - Slayder bilan */}
      {rasmlar.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t("sections.photos") || "Rasmlar"} ({rasmlar.length})
          </h2>

          {/* Slayder */}
          <div className="relative w-full h-80 bg-gray-700 rounded-lg overflow-hidden mb-4">
            <img
              src={rasmlar[currentIndex]}
              alt={`${elon.ism} - ${currentIndex + 1}`}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setSelectedImage(rasmlar[currentIndex])}
            />

            {/* Navigatsiya tugmalari */}
            {rasmlar.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <BsChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <BsChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Slayd raqami ko'rsatgichi */}
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {rasmlar.length}
            </div>
          </div>

          {/* Pastdagi nuqtalar */}
          {rasmlar.length > 1 && (
            <div className="flex justify-center gap-2">
              {rasmlar.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Asosiy ma'lumotlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
            {t("sections.generalInfo") || "Asosiy ma'lumotlar"}
          </h2>
          <div className="space-y-4">
            {elon.yosh && (
              <div className="flex items-start gap-3">
                <div className="mt-1 text-blue-500">
                  <BsPerson />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {t("labels.age") || "Yosh"}
                  </p>
                  <p className="font-medium">
                    {elon.yosh} {t("general.ageUnit") || "yil"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <MdWork />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.category") || "Kategoriya"}
                </p>
                <p className="font-medium">{elon.kategoriya}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <BsGeoAlt />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.address") || "Manzil"}
                </p>
                <p className="font-medium">{elon.joylashuv || elon.manzil}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <BsClock />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.contactTime") || "Murojaat vaqti"}
                </p>
                <p className="font-medium">{elon.vaqt || elon.murojaatVaqti}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
            {t("sections.pricing") || "Narx"}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <BsCashCoin />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.salary") || "Narx"}
                </p>
                <p className="font-medium">{elon.narx} so'm</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <MdAttachFile />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.files") || "Fayllar"}
                </p>
                <p className="font-medium">
                  {rasmlar.length} {t("general.filesUnit") || "ta"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-blue-500">
                <MdCalendarToday />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {t("labels.postDate") || "Qo'yilgan sana"}
                </p>
                <p className="font-medium">
                  {elon.createdAt?.toDate
                    ? elon.createdAt.toDate().toLocaleDateString("uz-UZ")
                    : elon.createdAt
                    ? new Date(elon.createdAt).toLocaleDateString("uz-UZ")
                    : t("general.noData")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {elon.bio && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t("sections.about") || "Haqida"}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {elon.bio}
          </p>
        </div>
      )}

      {/* Kontakt tugmalari */}
      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {t("sections.contact") || "Kontakt"}
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`tel:${elon.tel || elon.phone}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <BsFillTelephoneFill />
            {elon.tel || elon.phone}
          </a>
          {elon.telegram && (
            <a
              href={`https://t.me/${elon.telegram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <FaTelegram />
              {elon.telegram}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
