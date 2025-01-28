import React, { useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import FeaturedChallenges from "../components/Home/FeaturedChallenges";
import { useSelector } from "react-redux";
import Footer from "../components/layouts/Footer";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <HeroSection />
      <br />
      <FeaturedChallenges />
      <br />
      <Footer />
    </>
  );
};

export default Home;
