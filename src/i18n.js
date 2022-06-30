import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          email: "Email",
          signup: "Sign up",
          password: "Password",
          forgotPassword: "Forgot password? Fret not!",
          errLoggingIn: "There seems to be an error loggin in",
          changeLanguage: "Change language",
          login: "Login",
          errSigningUp: "There seems to be an error signing up",
        },
      },
      hin: {
        translation: {
          email: "ईमेल",
          signup: "साइन अप करें",
          password: "पासवर्ड",
          forgotPassword: "पासवर्ड भूल गए",
          errLoggingIn: "ऐसा लगता है कि लॉग इन करने में त्रुटि हुई है",
          changeLanguage: "भाषा बदलो",
          login: "लॉग इन करें",
          errSigningUp: "ऐसा लगता है कि साइन अप करने में त्रुटि हुई है",
        },
      },
    },
  });

export default i18n;
