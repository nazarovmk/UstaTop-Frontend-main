import { useTranslation } from "react-i18next";

function HamkorlikUchun() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {t("partnership.title")}
      </h1>
      <p className="text-gray-700 mb-4 leading-relaxed">
        <strong>Ustatop.uz</strong> {t("partnership.desc1")}
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed">
        {t("partnership.intro")}
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>{t("partnership.point1")}</li>
        <li>{t("partnership.point2")}</li>
        <li>{t("partnership.point3")}</li>
        <li>{t("partnership.point4")}</li>
      </ul>
      <p className="text-gray-700 mb-6">{t("partnership.desc2")}</p>

      <a
        href="https://t.me/nazarov_mk"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#00A945] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#00913B] transition-colors"
      >
        📩 {t("partnership.contactBtn")}
      </a>
    </div>
  );
}

export default HamkorlikUchun;
