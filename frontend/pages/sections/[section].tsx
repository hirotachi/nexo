import React from "react";
import { useRouter } from "next/router";

const Section = () => {
  const router = useRouter();
  console.log(router.query.section);
  return <div>section</div>;
};

export default Section;
