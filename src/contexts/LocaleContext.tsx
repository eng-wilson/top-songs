import { createContext, ReactNode, useContext, useState } from "react";

interface LocaleContextProps {
  activeLocale: string;
  handleActiveLocale: (value: string) => void;
}

const LocaleContext = createContext({} as LocaleContextProps);

const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [activeLocale, setActiveLocal] = useState("en");

  const handleActiveLocale = (value: string) => {
    setActiveLocal(value);
  };

  return (
    <LocaleContext.Provider value={{ activeLocale, handleActiveLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

const useLocale = () => {
  const context = useContext(LocaleContext);

  return context;
};

export { LocaleProvider, useLocale };
