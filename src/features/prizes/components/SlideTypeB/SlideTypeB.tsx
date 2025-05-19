import React from "react";
import bgmain from "@/shared/assets/img/Fondo-regalo-solo.jpg";

const SlideTypeB = () => {
  return (
    <div
      className="main main flex flex-1 flex-col bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgmain})` }}
    >
      <div className="contenido flex flex-1 items-center justify-center w-full">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="flex flex-row gap-2 max-w-[440px] mx-auto justif-center align-items-center">
            <div className="min-w-[200px]">
              <img src="https://dummyjson.com/image/100" alt="" className="w-full object-cover h-[100px]" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex  bg-no-repeat bg-center bg-cover flex-col items-center justify-items-center w-[80%] h-[100px]"  style={{
              backgroundImage: 'url("https://dummyjson.com/image/100")'
            }}>
              <p>200</p>
              <p>PUNTOS</p>
            </div>
              <p className="text-center text-white">
                Acumula y canjea tu regalo de 8 AM a 4 AM (del Lunes).
              </p>
            </div>
          </div>
          <div className="max-w-[440px] h-auto grid grid-cols-2 gap-x-0 gap-y-1 xs:gap-x-1 xs:gap-y-1 sm:gap-x-4 sm:gap-y-1 place-items-center mx-auto">
          dsd
        </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTypeB;
