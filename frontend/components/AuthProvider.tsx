import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import axios from "axios";
import cookie from "cookiejs";
import withNoSSR from "@lib/withNoSSR";

type TAuthData = {
  user: TUserPreview;
  token: string;
  role: TUser["role"];
};

type TAuthState = {
  isLoggedIn: boolean;
} & TAuthData;

type TAuthContext = {
  login: (data: TAuthResponse) => void;
  logout: () => void;
  setAuthState: (state: TAuthState) => void;
} & TAuthState;

export const AuthContext = createContext<TAuthContext>(
  null as unknown as TAuthContext
);

const initialState: TAuthState = { isLoggedIn: false } as TAuthState;

const AuthProvider = (props: PropsWithChildren<any>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { children } = props;

  const [authData, setAuthData, clearAuthData] =
    useLocalStorage<TAuthData>("auth");

  const [authState, setAuthState] = useState<TAuthState>(() => {
    if (typeof window === "undefined" || !authData) {
      return initialState;
    }
    return {
      ...authData,
      isLoggedIn: !!authData.token,
    };
  });

  const login = async () => {
    try {
      const res = await axios.get(`${apiUrl}/me`, { withCredentials: true });
      const newData = {
        user: res.data,
        token: cookie.get("access_token"),
        role: res.data.role,
      } as TAuthData;
      setAuthState({ ...newData, isLoggedIn: true });
      setAuthData(newData);
    } catch (e) {}
  };

  // @ts-ignore
  const logout = () => {
    setAuthState(initialState);
    cookie.remove("access_token");
    clearAuthData();
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default withNoSSR(AuthProvider);
