import React, { useEffect, useState } from "react";
import useAuthGuard from "@hooks/useAuthGuard";
import withNoSSR from "@lib/withNoSSR";
import Contributor from "@components/Contributor";
import useAuth from "@hooks/useAuth";
import { api } from "@pages/_app";

const Profile = () => {
  useAuthGuard();
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    api.get(`/users/${user.id}/articles`).then(({ data }) => {
      setArticles(data);
    });
  }, [user]);

  return <Contributor user={user} articles={articles} />;
};

export default withNoSSR(Profile);
