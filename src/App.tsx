import React, { useEffect } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import { useUserStore } from "./shared/store/userStore";

const App: React.FC = () => {
  const { setTarjeta } = useUserStore();
  const tarjeta = "100007777"; // En el futuro, obtén esto desde login o contexto 1070026151 / 100007777
  const ready = useAppData(tarjeta);

  useEffect(() => {
    setTarjeta(tarjeta);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando datos...
      </div>
    );
  }

  return <Router />;
};

export default App;
