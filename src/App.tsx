import React from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";

const App: React.FC = () => {
  const tarjeta = "100007777"; // En el futuro, obtén esto desde login o contexto
  const ready = useAppData(tarjeta);

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
