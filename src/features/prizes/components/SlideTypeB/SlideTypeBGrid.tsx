import React, { useState } from "react";
import SlideTypeBBox from "./SlideTypeBBox";
import { usePrizesStore } from "@/shared/store/prizesStore";
import SlideTypeBDetail from "./SlideTypeBDetail";
import { SlideTypeBGridProps } from "../../types/prize.types";

const SlideTypeBGrid: React.FC<SlideTypeBGridProps> = ({
  products,
  details,
}) => {
  const openPrizeDetail = usePrizesStore((state) => state.openPrizeDetail);
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleProducts = products.slice(0, 4);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenPrizeDetail(true);
    //setOpenModal(true);
  };

  return (
    <>
      <div
        data-slide={details.id}
        className="contenido flex flex-1 items-center justify-center w-full"
      >
        <div className="container max-w-[440px] h-auto grid grid-cols-2 gap-x-0 gap-y-1 xs:gap-x-1 xs:gap-y-1 sm:gap-x-4 sm:gap-y-1 place-items-center">
          {visibleProducts.map((product, index) => (
            <SlideTypeBBox
              key={product.id}
              product={product}
              handleOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
      </div>
      {openPrizeDetail && selectedIndex !== null && (
        <SlideTypeBDetail
          products={visibleProducts}
          details={details}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          handleOpenModal={() => setOpenPrizeDetail(false)}
        />
      )}
    </>
  );
};

export default SlideTypeBGrid;
