import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Prize {
  id: number;
  nombre: string;
  nombreImagen: string;
  stock: number;
  imagenBase64?: string;
}

interface PrizesStore {
  premios: Prize[];
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
            `https://dev-api-canje-regalo.acity.com.pe/api/Regalos?tarjeta=${tarjeta}`
          );
          const data = await response.json();
          const premiosConImagen = await Promise.all(
            data.map(async (premio: Prize) => {
              const imagen = await get().fetchImagen(premio.nombreImagen.split('.')[0]);
              return { ...premio, imagenBase64: imagen };
            })
          );
          set({ premios: premiosConImagen });
        } catch (error) {
          console.error('Error fetching premios:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      fetchImagen: async (nombre: string) => {
        try {
          const response = await fetch(
            `https://dev-api-canje-regalo.acity.com.pe/api/Regalos/imagen?nombre=${nombre}`
          );
          return await response.text();
        } catch (error) {
          console.error('Error fetching imagen:', error);
          return null;
        }
      },
    }),
    {
      name: 'prizes-storage',
    }
  )
);