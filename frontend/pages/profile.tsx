import React from "react";
import Contributor from "@pages/contributors/[contributor]";
import useAuthGuard from "@hooks/useAuthGuard";

const Profile = () => {
  useAuthGuard();
  return <Contributor />;
};

export default Profile;
