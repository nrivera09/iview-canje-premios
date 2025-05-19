import React, { useEffect, useState } from "react";
import SlideTypeA from "../components/SlideTypeA/SlideTypeA";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { usePrizeStore } from "@/features/prizes/store/usePrizeStore";
import { PrizeGroup } from "@/features/prizes/store/usePrizeStore";
import SlideRenderer from "../components/SlideRenderer";

const Prizes: React.FC = () => {
  const { playSound } = useSoundEffect();
  const { prizes, initPrizes } = usePrizeStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    initPrizes();
  }, []);

  const currentSlide: PrizeGroup | undefined = prizes[currentIndex];

  const handleNext = () => {
    if (currentIndex < prizes.length - 1) {
      playSound("button");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound("button");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleHover = () => {
    playSound("pin");
  };

  if (!currentSlide) return null;

  return (
    <section className="w-full h-[100dvh] bg-no-repeat bg-cover mx-auto flex flex-col overflow-hidden">
      <SlideRenderer key={currentSlide.type} slide={currentSlide} />

      <nav className="nav flex min-h-[70px] items-center justify-center gap-2">
        <button
          onMouseEnter={handleHover}
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className="bg-blue-950 w-[70px] h-[50px] sm:h-[55px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RiArrowDropLeftLine className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => playSound("button")}
          className="bg-blue-950 h-[50px] sm:h-[55px] px-5 flex items-center justify-center border border-white rounded-md"
        >
          <span className="text-[25px] sm:text-[30px] font-bold text-white">
            VOLVER
          </span>
        </button>

        <button
          onMouseEnter={handleHover}
          disabled={currentIndex === prizes.length - 1}
          onClick={handleNext}
          className="bg-blue-950 w-[70px] h-[50px] sm:h-[55px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RiArrowDropRightLine className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>
      </nav>
    </section>
  );
};

export default Prizes;
