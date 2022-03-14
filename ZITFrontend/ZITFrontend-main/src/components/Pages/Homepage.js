import React from "react";
import Slider from "../Element/Slider";
import PromotedErrands from "../Element/PromotedErrands";
import TokenBanner from "../Element/TokenBanner";
import PopularCategories from "../Element/PopularCategories";
function Homepage() {
  return (
    <>
      <Slider />
      <PopularCategories />
      <PromotedErrands />
      <TokenBanner />
    </>
  );
}

export default Homepage;
