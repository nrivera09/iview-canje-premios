import React, { useEffect, useState } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import slotMachine from "@/shared/assets/img/slotmachine.png";
import { useIsDevEnv } from "./shared/hooks/useIsDevEnv";
import HackIview from "./shared/components/HackIview";
import { useSoundEffect } from "./shared/hooks/useSoundEffect";
import { useStockSignalR } from "./shared/hooks/useStockSignalR";
import { usePrizesStore } from "./shared/store/prizesStore";
import { useURLParams } from "./shared/hooks/useURLParams";
import { ConsoleOverlay } from "./shared/components/ConsoleOverlay";
import { handleCloseClick } from "./libs/altenarBridge";

const App: React.FC = () => {
  useURLParams();

  const isDevEnv = useIsDevEnv();
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const tarjetaId = usePrizesStore((state) => state.tarjetaId);
  const { playSound } = useSoundEffect();

  const [showInput, setShowInput] = useState(false);
  const [showBug, setShowBug] = useState(false);
  const ready = useAppData(tarjetaId);

  useStockSignalR((data) => {
    console.log("📦 Actualización de stock:", data);
    fetchPremios(tarjetaId);
  });

  const hideIviewHack = () => {
    setShowInput(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      console.log("Click en:", target.tagName, target.className);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando datos...
      </div>
    );
  }

  return (
    <>
      <Router />
      <button
        onClick={() => {
          playSound("button");
          handleCloseClick();
        }}
        className="z-50 font-bold text-xl bg-red-600 hover:bg-red-900 p-1 rounded-md overflow-hidden   mx-auto transition-all cursor-pointer hover:shadow-xl h-[30px] sm:h-[30px] w-[30px] sm:w-[30px] items-center justify-center absolute top-0 right-0 mt-[50px] mr-1"
      >
        CERRAR APP
      </button>
      <div className="absolute top-1/2 right-0 mr-1 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            playSound("button");
            setShowBug(!showBug);
          }}
          className="btn  p-1 border-none hover:inset-0"
        >
          BUG
        </button>
      </div>
      {isDevEnv && (
        <div className="!hidden absolute top-1/2 right-0 mr-1 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              playSound("button");
              setShowInput(!showInput);
            }}
            className="  p-1 border-none hover:inset-0"
          >
            <img src={slotMachine} alt="" className="w-[30px]" />
          </button>
        </div>
      )}

      {showInput && <HackIview hideIviewHack={hideIviewHack}></HackIview>}
      {showBug && <ConsoleOverlay></ConsoleOverlay>}
    </>
  );
};

export default App;
