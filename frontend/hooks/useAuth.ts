import { createContext, useContext } from "react";

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

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
