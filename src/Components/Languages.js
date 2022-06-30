import { useTranslation } from "react-i18next";

const lngs = {
  en: { nativeName: "English" },
  hin: { nativeName: "हिन्दी" },
};

export const Languages = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </>
  );
};
