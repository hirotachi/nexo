import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function useAuthGuard(wantedRole?: TUser["role"][]) {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (wantedRole && !wantedRole?.includes(role)) {
      router.push("/");
      return;
    }
  }, [isLoggedIn, role]);
}
export default useAuthGuard;
