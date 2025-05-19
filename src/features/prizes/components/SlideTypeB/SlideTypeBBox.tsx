import React from "react";
import { PrizeProduct } from "@/features/prizes/store/usePrizeStore";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import marco from "@/shared/assets/img/marco_producto.png";
import agotado from "@/shared/assets/img/23.png";
import bgPts from "@/shared/assets/img/47.png";
import bgFaltanPts from "@/shared/assets/img/53.png";

interface SlideTypeABoxProps {
  product: PrizeProduct;
  handleOpenModal?: () => void;
}

const SlideTypeBBox: React.FC<SlideTypeABoxProps> = ({
  product,
  handleOpenModal,
}) => {
  const { playSound } = useSoundEffect();

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");

  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={handleHover}
        onClick={() => {
          handleClick();
          handleOpenModal?.();
        }}
        className={`relative cursor-pointer w-[300px] h-[300px] xs:w-[200px] xs:h-[200px] sm:w-[400px] sm:h-[400px] rounded-sm p-[10px] bg-no-repeat bg-contain bg-center overflow-hidden flex items-center justify-center transition-all mx-auto ${
          isOutOfStock ? "opacity-40 pointer-events-none" : ""
        }`}
        style={{ backgroundImage: `url(${marco})` }}
      >
        <div className="container w-full h-full rounded-sm  flex items-center justify-center">
          <div className="infoProduct uppercase flex-col flex items-center justify-center gap-2 w-full">
            <p className="text-center font-bold text-[14px] xs:text-[11px] leading-4 min-h-[32px] flex items-center justify-center w-full text-black line-clamp-2 truncate-2-lines">
              {product.nameProduct}
            </p>
            <img
              src={product.imgProduct}
              alt={product.nameProduct}
              className="w-[150px] sm:w-[250px] xs:w-[100px] h-auto object-contain rounded-md"
            />
          </div>
        </div>
        {isOutOfStock && (
          <img
            src={agotado}
            alt="Agotado"
            className="absolute min-w-[100%] xs:w-[160px] sm:min-w-[400px] xs:ml-[-5px] sm:ml-0"
          />
        )}
        <div
          style={{ backgroundImage: `url(${bgPts})` }}
          className="flex items-center justify-center absolute bottom-[16px] xs:bottom-[8px] sm:bottom-[26px] bg-cover bg-no-repeat bg-center w-[150px] sm:w-[180px] h-[50px] "
        >
          <p className="font-bold relative top-[7px] font-mobile-12px">
            1000 PTS
          </p>
        </div>
      </div>
      {!isOutOfStock ? (
        <div
          style={{ backgroundImage: `url(${bgFaltanPts})` }}
          className="mx-auto flex items-center justify-center bg-no-repeat bg-cover bg-bottom w-[200px] h-[70px] xs:w-[200px] xs:h-[70px] sm:w-[260px] sm:h-[89px] relative  xs:top-[-8px] top-[-8px] sm:top-[-10px]"
        >
          <p className="font-bold text-black relative  leading-5 font-mobile-12px">
            LE FALTAN {product.stock} PTS <br />
            PARA CANJEAR
          </p>
        </div>
      ) : (
        <div className="font-bold text-xl bg-red-900 hover:bg-red-600 p-1 rounded-full overflow-hidden xs:min-w-[150px] min-w-[200px] sm:min-w-[300px] mx-auto transition-all cursor-pointer hover:shadow-xl">
          <p className="bg-red-600 text-white h-[45px]  flex items-center justify-center rounded-full text-[20px] sm:text-[25px] font-bold transition-all ">
            <div className="relative top-[2px] px-2">CANJEAR</div>
          </p>
        </div>
      )}
    </div>
  );
};

export default SlideTypeBBox;
