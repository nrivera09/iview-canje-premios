import React from "react";
import SlideTypeA from "./SlideTypeA/SlideTypeA";
import SlideTypeB from "./SlideTypeB/SlideTypeB";
import SlideTypeC from "./SlideTypeC/SlideTypeC";
import { PrizeGroup } from "@/features/prizes/store/usePrizeStore";

interface SlideRendererProps {
  slide: PrizeGroup;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case "A":
      return <SlideTypeA slide={slide} />;
    case "B":
      return <SlideTypeB />;
    case "C":
      return <SlideTypeC />;
    default:
      return <div>No se reconoce el tipo de slide</div>;
  }
};

export default SlideRenderer;
