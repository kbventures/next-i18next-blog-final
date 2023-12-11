import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import React from "react";

const LanguageSelector = () => {
  const { pathname, push, route, asPath, locale } = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);

    useEffect(() => {
    const storedLocale = localStorage.getItem("selectedLocale");
    if (storedLocale) {
      setSelectedLocale(storedLocale);
      push(route, asPath, { locale: storedLocale });
    }
  }, []);

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocale(value);
    localStorage.setItem("selectedLocale", value);
    push(route, asPath, {
      locale: value,
    });
  };

  const { t } = useTranslation("navigation/language-selector");
  return (
        <div>
            <h2>{t("languageselector")}</h2>
            <select value={locale} onChange={handleLocaleChange}>
               <option value="en">{t("english")}</option>
               <option value="fr">{t("french")}</option>
            </select>
        </div>
  );
};

export default LanguageSelector;