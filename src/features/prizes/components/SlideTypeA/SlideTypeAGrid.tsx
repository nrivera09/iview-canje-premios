import React, { useState } from "react";
import SlideTypeABox from "./SlideTypeABox";
import { PrizeProduct } from "@/features/prizes/store/usePrizeStore";
import SlideTypeADetail from "./SlideTypeADetail";

interface SlideTypeAGridProps {
  products: PrizeProduct[];
}

const SlideTypeAGrid: React.FC<SlideTypeAGridProps> = ({ products }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleProducts = products.slice(0, 4);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  return (
    <>
      <div className="contenido flex flex-1 items-center justify-center w-full">
        <div className="container max-w-[440px] h-auto grid grid-cols-2 gap-x-0 gap-y-1 xs:gap-x-1 xs:gap-y-1 sm:gap-x-4 sm:gap-y-1 place-items-center">
          {visibleProducts.map((product, index) => (
            <SlideTypeABox
              key={product.id}
              product={product}
              handleOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
      </div>
      {openModal && selectedIndex !== null && (
        <SlideTypeADetail
          products={visibleProducts}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          handleOpenModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default SlideTypeAGrid;
