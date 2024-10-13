import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface BmvContextType {
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  darkMode:boolean;
  setDarkMode:React.Dispatch<React.SetStateAction<boolean>>;

}

const BmvContext = createContext<BmvContextType>({
  isLoggedin: false,
  setIsLoggedin: () => {},
  token: "",
  setToken: () => {},
  role: "customer",
  setRole: () => {},
  darkMode: false,
  setDarkMode:()=>{}
});

export const useBmv = (): BmvContextType => {
  const context = useContext(BmvContext);
  return context;
};

interface BmvProviderProps {
  children: ReactNode;
}

export const BmvContextProvider: React.FC<BmvProviderProps> = ({
  children,
}) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState<string>("customer");
  const [token, setToken] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>( localStorage.getItem("darkMode") == 'true' || false);

  return (
    <BmvContext.Provider
      value={{ role, setRole, setToken, token, isLoggedin, setIsLoggedin, darkMode,setDarkMode }}
    >
      {children}
    </BmvContext.Provider>
  );
};
