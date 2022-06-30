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
          homePage: {
            heading: "Add New Post",
            navigate: "Navigate To Search Page",
            ID: "ID",
            name: "name",
            date: "date",
            latitude: "latitude",
            longitude: "longitude",
            submit: "submit",
            submitting: "Submitting",
            err: "Error submitting post, check values please",
            success: "POST SUBMITTED SUCCESSFULLY",
          },
          query: {
            heading: "Query data",
            link: "back to post creation",
            button1: "Change Preference",
            button2: "Search",
            placeholder1: "input longitude",
            placeholder2: "input latitude",
            action: "action",
          },
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
          homePage: {
            heading: "नई पोस्ट जोड़ें",
            navigate: "खोज पृष्ठ पर नेविगेट करें",
            ID: "पहचान",
            name: "नाम",
            date: "दिनांक",
            latitude: "अक्षांश",
            longitude: "देशान्तर",
            submit: "प्रस्तुत",
            submitting: "भेजने से",
            err: "पोस्ट सबमिट करने में त्रुटि, कृपया मान जांचें",
            success: "पोस्ट सफलतापूर्वक सबमिट किया गया",
          },
          query: {
            heading: "क्वेरी डेटा",
            link: "पोस्ट निर्माण पर वापस",
            button1: "वरीयता बदलें",
            button2: "तलाशी",
            placeholder1: "इनपुट देशांतर",
            placeholder2: "इनपुट अक्षांश",
            action: "गतिविधि",
          },
        },
      },
    },
  });

export default i18n;
