import { create } from "zustand";
import { persist } from "zustand/middleware";

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
            `https://dev-api-canje-regalo.acity.com.pe/api/Promociones?tarjeta=${tarjeta}`
          );
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
