import { createContext, ReactNode, useContext, useState } from "react";

interface LocaleContextProps {
  activeLocale: {
    label: string;
    value: string;
  };
  handleActiveLocale: (language: LocaleContextProps["activeLocale"]) => void;
  languageOptions: {
    label: string;
    value: string;
  }[];
}

const LocaleContext = createContext({} as LocaleContextProps);

const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const languageOptions: LocaleContextProps["activeLocale"][] = [
    { label: "🇺🇸 English", value: "en" },
    { label: "🇧🇷 Português", value: "pt" },
  ];

  const [activeLocale, setActiveLocal] = useState<
    LocaleContextProps["activeLocale"]
  >(languageOptions[0]);

  const handleActiveLocale = (language: LocaleContextProps["activeLocale"]) => {
    setActiveLocal(language);
  };

  return (
    <LocaleContext.Provider
      value={{ activeLocale, handleActiveLocale, languageOptions }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

const useLocale = () => {
  const context = useContext(LocaleContext);

  return context;
};

export { LocaleProvider, useLocale };
