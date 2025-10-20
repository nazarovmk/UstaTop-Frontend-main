import { useTranslation } from "react-i18next";

function ElonBeruvchilargaBagishlangan() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-[#0F172B]">
      <h1 className="text-3xl font-bold text-center mb-6">
        {t("advertisers.title")}
      </h1>
      <p
        className="text-lg mb-4"
        dangerouslySetInnerHTML={{ __html: t("advertisers.desc1") }}
      />

      <ul className="space-y-2 mb-4 list-disc pl-6">
        <li>{t("advertisers.list1")}</li>
        <li>{t("advertisers.list2")}</li>
        <li>{t("advertisers.list3")}</li>
        <li>{t("advertisers.list4")}</li>
      </ul>

      <p
        className="text-lg"
        dangerouslySetInnerHTML={{ __html: t("advertisers.desc2") }}
      />
    </div>
  );
}

export default ElonBeruvchilargaBagishlangan;
