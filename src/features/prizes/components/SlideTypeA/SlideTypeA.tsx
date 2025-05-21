import React from "react";
import SlideTypeAHeader from "./SlideTypeAHeader";
import SlideTypeAFooter from "./SlideTypeAFooter";
import SlideTypeAGrid from "./SlideTypeAGrid";
import bgmain from "@/shared/assets/img/Fondo-regalo-solo.jpg";
import { PrizeGroup } from "@/features/prizes/store/usePrizeStore";

interface SlideTypeAProps {
  slide: PrizeGroup;
}

const SlideTypeA: React.FC<SlideTypeAProps> = ({ slide }) => {
  return (
    <div
      className="main flex flex-1 flex-col bg-cover bg-no-repeat bg-center"
      data-slide={slide.type}
      style={{ backgroundImage: `url(${bgmain})` }}
    >
      <SlideTypeAHeader />
      <SlideTypeAGrid products={slide.products} details={slide.detailSlide!} />
      <SlideTypeAFooter />
    </div>
  );
};

export default SlideTypeA;
