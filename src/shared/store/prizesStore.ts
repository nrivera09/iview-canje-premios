import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildUrl } from "@/shared/lib/config";
import { API_PATHS } from "@/shared/lib/apiPaths";

export interface PrizeProduct {
  id: string;
  nameProduct: string;
  imgProduct: string;
  stock: number;
  imagenBase64?: string;
}

export interface DetailsPrize {
  puntosFalta: number;
  puntosMin: number;
  canjeado: boolean;
}

export interface PrizeGroup {
  type: "A" | "B";
  products: PrizeProduct[];
  detailSlide: DetailsPrize;
}

interface PrizesStore {
  premios: PrizeGroup[];
  isLoading: boolean;
  fetchPremios: (tarjeta: string) => Promise<void>;
  fetchImagen: (nombreImagen: string) => Promise<string | null>;
}

export const usePrizesStore = create<PrizesStore>()(
  persist(
    (set, get) => ({
      premios: [],
      isLoading: false,
      fetchPremios: async (tarjeta: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.REGALOS)}?tarjeta=${tarjeta}`
          );
          if (!response.ok)
            throw new Error("Error de red al obtener datos: REGALOS");
          const data = await response.json();

          const groups: PrizeGroup[] = await Promise.all(
            data.map(async (promo: any) => {
              const products = await Promise.all(
                (promo.lista_Regalos || []).map(async (regalo: any) => {
                  const nombre = regalo.nombreImagen?.split(".")[0] || "";
                  const img = nombre ? await get().fetchImagen(nombre) : null;

                  return {
                    id: regalo.id.toString(),
                    nameProduct: regalo.nombre,
                    imgProduct: regalo.nombreImagen,
                    stock: regalo.stock,
                    imagenBase64: img,
                  };
                })
              );

              const detailSlide: DetailsPrize = {
                puntosFalta: promo.puntos_Falta,
                puntosMin: promo.puntos_Min,
                canjeado: promo.canjeado,
              };

              return {
                type: promo.tipo === "Canje" ? "A" : "B",
                products,
                detailSlide,
              };
            })
          );

          set({ premios: groups });
        } catch (error) {
          console.error("Error fetching premios:", error);
        } finally {
          set({ isLoading: false });
        }
      },
      fetchImagen: async (nombre: string) => {
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.REGALOS_IMAGEN)}?nombre=${nombre}`
          );

          const blob = await response.blob();

          return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Error fetching imagen:", error);
          return null;
        }
      },
    }),
    {
      name: "prizes-storage",
    }
  )
);
