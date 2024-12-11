import { createContext, useState, ReactNode } from "react";

type AuthProps = {
  name: string | null;
  email: string | null;
  accessToken: string;
};

type AuthContextProps = {
  auth: AuthProps;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps>>;
};

const AuthContext = createContext<AuthContextProps>({
  auth: { name: null, email: null, accessToken: "" },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthProps>({
    name: null,
    email: null,
    accessToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
