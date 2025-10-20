import { useState } from "react";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

function QollabQuvvatlash() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {t("support.title")}
      </h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{t("support.desc1")}</p>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t("support.howTitle")}
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>{t("support.how1")}</li>
        <li>{t("support.how2")}</li>
        <li>{t("support.how3")}</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t("support.paymentTitle")}
      </h2>
      <div className="flex flex-col gap-4">
        {/* Payme */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#00A945] text-white px-6 py-3 rounded-xl shadow hover:bg-[#00913B] transition-colors">
          <p className="text-center sm:text-left w-full mb-3 sm:mb-0">
            {t("support.payme")}
          </p>
          <button
            onClick={() => handleCopy("9860246602123183")}
            className="flex items-center justify-center gap-1 bg-white text-[#00A945] px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            <Copy size={16} />
            {copied === "9860246602123183" ? "✅" : "Copy"}
          </button>
        </div>

        {/* Visa */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#2C82C9] text-white px-6 py-3 rounded-xl shadow hover:bg-[#1E6AAE] transition-colors">
          <p className="text-center sm:text-left w-full mb-3 sm:mb-0">
            {t("support.visa")}
          </p>
          <button
            onClick={() => handleCopy("4231200010864410")}
            className="flex items-center justify-center gap-1 bg-white text-[#2C82C9] px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition-colors text-sm"
          >
            <Copy size={16} />
            {copied === "4231200010864410" ? "✅" : "Copy"}
          </button>
        </div>
      </div>

      <p className="text-gray-500 mt-8 text-sm text-center">
        {t("support.footer")}
      </p>
    </div>
  );
}

export default QollabQuvvatlash;
