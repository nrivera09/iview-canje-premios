import React, { FC, useState } from "react";
import { useUserStore } from "../store/userStore";
import { usePrizesStore } from "../store/prizesStore";
import { HackIviewProps } from "@/features/shared/app/types";



const HackIview: FC<HackIviewProps> = ({ hideIviewHack }) => {
  const setTarjetaStore = useUserStore((state) => state.setTarjeta);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);

  const [tarjeta, setTarjeta] = useState("100007777");
  const [asset, setAsset] = useState("12345");
  const [puntos, setPuntos] = useState("200");

  const handleUpdate = async () => {
    setTarjetaStore(tarjeta);
    await Promise.all([fetchPremios(tarjeta)]);
    hideIviewHack();
  };

  return (
    <div className="bg-white p-2 rounded shadow flex flex-col items-end">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Nro de tarjeta:</label>
          <input
            type="text"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Nro de asset:</label>
          <input
            type="text"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Puntaje:</label>
          <input
            type="text"
            value={puntos}
            onChange={(e) => setPuntos(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="mt-2 text-[12px] px-2 py-1 bg-blue-950 w-full text-white rounded"
      >
        Actualizar Iview
      </button>
    </div>
  );
};

export default HackIview;
