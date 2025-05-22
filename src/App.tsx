import React, { useEffect, useState } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import { useUserStore } from "./shared/store/userStore";
import slotMachine from "@/shared/assets/img/slotmachine.png";
import { useIsDevEnv } from "./shared/hooks/useIsDevEnv";

const App: React.FC = () => {
  const { setTarjeta } = useUserStore();
  const isDevEnv = useIsDevEnv();

  const [tarjeta, setTarjetaLocal] = useState("100007777");
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("100007777");

  const ready = useAppData(tarjeta);

  useEffect(() => {
    setTarjeta(tarjeta);
  }, [tarjeta]);

  const handleUpdateTarjeta = () => {
    setTarjetaLocal(inputValue);
  };

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

      {isDevEnv && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 mr-2 flex flex-col items-end gap-2">
          <button
            onClick={() => setShowInput(!showInput)}
            className="  p-1 rounded-full"
          >
            <img src={slotMachine} alt="" className="w-[30px]" />
          </button>

          {showInput && (
            <div className="bg-white p-2 rounded shadow flex flex-col items-end">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-1 rounded text-sm w-[160px]"
              />
              <button
                onClick={() => {
                  handleUpdateTarjeta();
                  setShowInput(false);
                }}
                className="mt-1 text-sm px-2 py-1 bg-blue-500 text-white rounded"
              >
                Actualizar tarjeta
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
