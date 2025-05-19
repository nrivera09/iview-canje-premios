import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

// Tipos
export type PrizeGroupType = "A" | "B" | "C";

export interface PrizeProduct {
  id: string;
  nameProduct: string;
  imgProduct: string;
  stock: number;
}

export interface PrizeGroup {
  type: PrizeGroupType;
  products: PrizeProduct[];
}

interface PrizeStoreState {
  prizes: PrizeGroup[];
  initPrizes: () => void;
  getById: (id: string) => PrizeProduct | undefined;
}

// Helper para simular datos
const generateFakePrizeData = (): PrizeGroup[] => {
  const productNames = [
    "Smart Speaker",
    "Wireless Headphones",
    "Bluetooth Keyboard",
    "Smartwatch",
    "Portable Charger",
    "USB-C Hub",
    "VR Headset",
    "Gaming Mouse",
    "4K Monitor",
    "Mini Projector",
  ];

  return ["A", "A", "B", "C"].map((type) => ({
    type: type as PrizeGroupType,
    products: Array.from({ length: Math.floor(Math.random() * 3) + 4 }).map(
      () => ({
        id: uuidv4(),
        nameProduct:
          productNames[Math.floor(Math.random() * productNames.length)],
        imgProduct: "https://dummyjson.com/image/150",
        stock: Math.floor(Math.random() * 11),
      })
    ),
  }));
};

// Store con persistencia
export const usePrizeStore = create<PrizeStoreState>()(
  persist(
    (set, get) => ({
      prizes: generateFakePrizeData(), // Siempre reinicia con datos nuevos
      initPrizes: () => set({ prizes: generateFakePrizeData() }),
      getById: (id: string) =>
        get()
          .prizes.flatMap((group) => group.products)
          .find((p) => p.id === id),
    }),
    {
      name: "prize-store",
    }
  )
);
