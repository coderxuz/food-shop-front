import React from "react";
import { useTranslation } from "react-i18next";

interface LangSelectProps {
  className?: string;
}

const LangSelect: React.FC<LangSelectProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const currentLang = localStorage.getItem("i18nextLng");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <select
      value={currentLang ?? "ru"}
      onChange={handleLanguageChange}
      className={className}
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
      <option value="uz">O'zbek</option>
      <option value="kr">Qaraqalpaq</option>
    </select>
  );
};

export default LangSelect;
