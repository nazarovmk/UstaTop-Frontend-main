import { useTranslation } from "react-i18next";
import ProfileSidebar from "./ProfileSidebar";
import { FaCheck } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

// Define the Tariff interface
interface Tariff {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  vip?: boolean;
}

function Tariffs() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tariffs: Tariff[] = [
    {
      id: "starter",
      name: t("tariffs.starter.name"),
      description: t("tariffs.starter.description"),
      price: t("tariffs.starter.price"),
      period: t("tariffs.period"),
      features: [
        t("tariffs.starter.features.0"),
        t("tariffs.starter.features.1"),
        t("tariffs.starter.features.2"),
        t("tariffs.starter.features.3"),
      ],
      buttonText: t("tariffs.starter.buttonText"),
      popular: false,
    },
    {
      id: "pro",
      name: t("tariffs.pro.name"),
      description: t("tariffs.pro.description"),
      price: t("tariffs.pro.price"),
      period: t("tariffs.period"),
      features: [
        t("tariffs.pro.features.0"),
        t("tariffs.pro.features.1"),
        t("tariffs.pro.features.2"),
        t("tariffs.pro.features.3"),
      ],
      buttonText: t("tariffs.pro.buttonText"),
      popular: true,
    },
    {
      id: "premium",
      name: t("tariffs.premium.name"),
      description: t("tariffs.premium.description"),
      price: t("tariffs.premium.price"),
      period: t("tariffs.period"),
      features: [
        t("tariffs.premium.features.0"),
        t("tariffs.premium.features.1"),
        t("tariffs.premium.features.2"),
        t("tariffs.premium.features.3"),
        t("tariffs.premium.features.4"),
      ],
      buttonText: t("tariffs.premium.buttonText"),
      popular: false,
      vip: true,
    },
  ];

  // ✅ Tarif sotib olishga o'tish funksiyasi
  const handlePurchase = (tariff: Tariff) => {
    // Sotib olish sahifasiga yo'naltiramiz
    navigate("/tariffspurchase", { state: { tariff } });
  };

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
            {t("tariffs.title")}
          </h2>

          {/* Tarif Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
            {tariffs.map((tariff) => (
              <div
                key={tariff.id}
                className={`relative bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                  tariff.popular
                    ? "shadow-2xl border-2 border-emerald-500 transform scale-105 z-10"
                    : "shadow-lg border-gray-200"
                }`}
              >
                {/* Most Popular */}
                {tariff.popular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {t("tariffs.mostPopular")}
                  </div>
                )}

                {/* VIP Badge */}
                {tariff.vip && (
                  <div className="absolute top-0 right-0 flex items-center gap-1 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    <HiBadgeCheck className="text-[#0095f6] h-4 w-4" />
                    VIP
                  </div>
                )}

                <div className="px-6 py-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {tariff.name}
                    </h3>
                    <p className="text-gray-500">{tariff.description}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-emerald-600">
                      {tariff.price}
                    </span>
                    <span className="text-gray-500">{tariff.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tariff.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(tariff)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    {tariff.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tariffs;
