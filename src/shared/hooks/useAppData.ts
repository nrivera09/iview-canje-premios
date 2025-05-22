import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { usePrizesStore } from "../store/prizesStore";

export const useAppData = (tarjeta: string) => {
  const [ready, setReady] = useState(false);
  const fetchPromociones = useUserStore((state) => state.fetchPromociones);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );
  const setOpenPrizeRedeem = usePrizesStore(
    (state) => state.setOpenPrizeRedeem
  );

  useEffect(() => {
    const loadData = async () => {
      // Reiniciar flags al inicio
      setOpenPrizeDetail(false);
      setOpenPrizeRedeem(false);

      await Promise.all([fetchPremios(tarjeta)]);
      setReady(true);
    };
    loadData();
  }, [tarjeta]);

  return ready;
};
