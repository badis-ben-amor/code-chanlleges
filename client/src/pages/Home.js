import React, { useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import FeaturedChallenges from "../components/Home/FeaturedChallenges";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <HeroSection />
      <br />
      <FeaturedChallenges />
    </>
  );
};

export default Home;
