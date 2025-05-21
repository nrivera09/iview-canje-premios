import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildUrl } from "@/shared/lib/config";
import { API_PATHS } from "@/shared/lib/apiPaths";

interface UserPromotion {
  promocion: string;
  puntos: number;
  puntos_Falta: number;
  puntos_Min: number;
  canjeado: boolean;
  promocion_Tipo_Id: number;
}

interface UserStore {
  promociones: UserPromotion[];
  isLoading: boolean;
  fetchPromociones: (tarjeta: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      promociones: [],
      isLoading: false,
      fetchPromociones: async (tarjeta: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.PROMOCIONES)}?tarjeta=${tarjeta}`
          );
          if (!response.ok)
            throw new Error("Error de red al obtener datos: PROMOCIONES");
          const data = await response.json();
          set({ promociones: data });
        } catch (error) {
          console.error("Error fetching promociones:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
