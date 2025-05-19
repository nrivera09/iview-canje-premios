export const calcProgressbar = (puntos: number, puntosMin: number): number => {
  if (puntosMin === 0) return 0;
  return Math.min((puntos / puntosMin) * 100, 100);
};
