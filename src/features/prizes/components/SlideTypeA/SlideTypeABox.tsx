import React from "react";
import { PrizeProduct } from "@/features/prizes/store/usePrizeStore";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import marco from "@/shared/assets/img/marco_producto.png";
import agotado from "@/shared/assets/img/23.png";

interface SlideTypeABoxProps {
  product: PrizeProduct;
  handleOpenModal?: () => void;
}

const SlideTypeABox: React.FC<SlideTypeABoxProps> = ({
  product,
  handleOpenModal,
}) => {
  const { playSound } = useSoundEffect();

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");
  const handleError = () => playSound("error");

  const isOutOfStock = product.stock === 0;

  return (
    <div
      onMouseEnter={handleHover}
      onClick={() => {
        isOutOfStock ? handleError() : handleClick();
        !isOutOfStock && handleOpenModal?.();
      }}
      className={`relative cursor-pointer w-[180px] h-[180px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] rounded-sm p-[10px] bg-no-repeat bg-contain bg-center  flex items-center justify-center transition-all ${
        isOutOfStock ? "opacity-40 " : ""
      }`}
      style={{ backgroundImage: `url(${marco})` }}
    >
      <div className="container w-full h-full rounded-sm overflow-hidden flex items-center justify-center">
        <div className="infoProduct uppercase flex-col flex items-center justify-center gap-2">
          <p className="text-center font-bold text-[14px] xs:text-[11px] leading-4 min-h-[32px] flex items-center justify-center ">
            {product.nameProduct}
          </p>
          <img
            src={product.imgProduct}
            alt={product.nameProduct}
            className="w-[100px] xs:w-[70px] h-auto object-contain rounded-md"
          />
        </div>
      </div>

      {isOutOfStock && (
        <img
          src={agotado}
          alt="Agotado"
          className="absolute min-w-[230px] xs:min-w-[180px] sm:min-w-[260px] xs:ml-[-5px] sm:ml-0"
        />
      )}
    </div>
  );
};

export default SlideTypeABox;
