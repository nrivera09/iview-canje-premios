import React, { useEffect, useState } from "react";

import { useSoundEffect } from "@/shared/hooks/useSoundEffect";

import slotLoading from "@/shared/assets/lotties/loading_slot3.json";
import { SlideTypeBBoxProps } from "../../types/prize.types";
import { usePrizesStore } from "@/shared/store/prizesStore";

const SlideTypeBBox: React.FC<SlideTypeBBoxProps> = ({
  product,
  handleOpenModal,
}) => {
  const { playSound } = useSoundEffect();
  const fetchImagen = usePrizesStore((state) => state.fetchImagen);
  const [imagen, setImagen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");
  const handleError = () => playSound("error");

  const isOutOfStock = product.stock === 0;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: slotLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let mounted = true;
    const nombre = product.imgProduct?.split(".")[0] ?? "";

    fetchImagen(nombre).then((base64) => {
      if (mounted) {
        setImagen(base64);
        setTimeout(() => {
          setLoading(false);
        }, 3500);
      }
    });

    return () => {
      mounted = false;
    };
  }, [product.imgProduct, fetchImagen]);

  return (
    <div className="relative p-[2px] rounded-[12px] bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-100">
      <div className="bg-transparent rounded-[10px] p-4 text-center backdrop-blur-sm">
        <span className="text-black">sdffsfd</span>
      </div>
    </div>
  );
};

export default SlideTypeBBox;
