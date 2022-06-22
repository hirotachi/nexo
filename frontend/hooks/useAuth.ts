import { useContext } from "react";
import { AuthContext } from "@components/AuthProvider";

type TAuthData = {
  user: TUserPreview;
  token: string;
  role: TUser["role"];
};

type TAuthState = {
  isLoggedIn: boolean;
} & TAuthData;

type TAuthContext = {
  login: () => Promise<any>;
  setAuthState: (state: TAuthState) => void;
} & TAuthState;

// export const AuthContext = createContext<TAuthContext>(
//   null as unknown as TAuthContext
// );

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
