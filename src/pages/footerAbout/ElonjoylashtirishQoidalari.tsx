import { useTranslation } from "react-i18next";

function ElonjoylashtirishQoidalari() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-[#0F172B]">
      <h1 className="text-3xl font-bold text-center mb-6">
        {t("rules.title")}
      </h1>
      <p className="text-lg mb-4">{t("rules.intro")}</p>
      <ol className="list-decimal space-y-2 pl-6 mb-4">
        <li>{t("rules.rule1")}</li>
        <li>{t("rules.rule2")}</li>
        <li>{t("rules.rule3")}</li>
        <li>{t("rules.rule4")}</li>
        <li>{t("rules.rule5")}</li>
      </ol>
      <p className="text-lg font-semibold text-[#009966]">{t("rules.note")}</p>
    </div>
  );
}

export default ElonjoylashtirishQoidalari;
