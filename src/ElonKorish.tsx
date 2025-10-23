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
import { useState } from "react";

/* 🔹 E'lon turi (aniq interface) */
interface Elon {
  firstName: string;
  lastName: string;
  specialty: string;
  experience: number;
  phoneNumber: string;
  tgNickName?: string;
  address: string;
  appealTime: string;
  price: number;
  subCategoryId: string;
  createdAt: string;
  images: string[];
  additionalInformation: string;
}

export default function ElonKorish() {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState<number>(0);

  // 🔹 Demo e’lonlar
  const elonlar: Elon[] = [
    {
      firstName: "Akmal",
      lastName: "Qodirov",
      specialty: "Elektrik",
      experience: 5,
      phoneNumber: "+998901234567",
      tgNickName: "@akmal_usta",
      address: "Toshkent, Chilonzor",
      appealTime: "09:00 - 18:00",
      price: 250000,
      subCategoryId: "Elekterik va santexnika",
      createdAt: "2025-05-12T10:00:00Z",
      images: ["/usta.png", "/Elektrik-Santexnika.svg", "/kamera.svg"],
      additionalInformation:
        "Men 5 yildan beri elektr va santexnika ishlari bilan shug‘ullanaman. Barcha turdagi elektr simlarini o‘rnatish, lampochkalarni almashtirish, suv tizimlarini sozlash xizmatlarini kafolat bilan bajaraman.",
    },
  ];

  if (elonlar.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Hozircha e’lonlar mavjud emas.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 space-y-10">
      {elonlar.map((elon: Elon, index: number) => (
        <div key={index} className="space-y-8">
          {/* --- Usta haqida asosiy qism --- */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={elon.images?.[0] || "/default-avatar.png"}
                  alt={elon.firstName}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {elon.firstName} {elon.lastName}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <BsBriefcase className="text-blue-500" />{" "}
                    <span>{elon.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                      {elon.experience}{" "}
                      {t("general.yearsOfExperience") || "yil tajriba"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${elon.phoneNumber}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <BsFillTelephoneFill /> Qo‘ng‘iroq qilish
                </a>
                {elon.tgNickName && (
                  <a
                    href={`https://t.me/${elon.tgNickName.replace("@", "")}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    target="_blank"
                  >
                    <FaTelegram /> Telegram
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* --- Rasmlar galereyasi --- */}
          {elon.images?.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Rasmlar ({elon.images.length})
              </h2>

              <div className="relative w-full h-80 bg-gray-700 rounded-lg overflow-hidden mb-4">
                <img
                  src={elon.images[currentImage]}
                  alt="Rasm"
                  className="w-full h-full object-cover"
                />

                {/* Navigatsiya tugmalari */}
                <button
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === 0 ? elon.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <BsChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === elon.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <BsChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {currentImage + 1} / {elon.images.length}
                </div>
              </div>

              {/* Pastdagi nuqtalar */}
              <div className="flex justify-center gap-2">
                {elon.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentImage ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* --- Asosiy maʼlumotlar --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Asosiy maʼlumotlar
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <BsPerson />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ism</p>
                    <p className="font-medium">
                      {elon.firstName} {elon.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <MdWork />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kategoriya</p>
                    <p className="font-medium">{elon.subCategoryId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <BsGeoAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Manzil</p>
                    <p className="font-medium">{elon.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <BsClock />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Murojaat vaqti</p>
                    <p className="font-medium">{elon.appealTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Narx ma'lumotlari --- */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                Narx
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <BsCashCoin />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Narx</p>
                    <p className="font-medium">{elon.price} so‘m</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <MdAttachFile />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fayllar</p>
                    <p className="font-medium">{elon.images.length} ta</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <MdCalendarToday />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Qo‘yilgan sana</p>
                    <p className="font-medium">
                      {new Date(elon.createdAt).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Bio bo‘limi --- */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Haqida</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {elon.additionalInformation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
