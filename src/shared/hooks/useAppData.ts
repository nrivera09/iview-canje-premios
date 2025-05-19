import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { usePrizesStore } from "../store/prizesStore";

export const useAppData = (tarjeta: string) => {
  const [ready, setReady] = useState(false);
  const fetchPromociones = useUserStore((state) => state.fetchPromociones);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchPromociones(tarjeta), fetchPremios(tarjeta)]);
      setReady(true);
    };
    loadData();
  }, [tarjeta]);

  return ready;
};
