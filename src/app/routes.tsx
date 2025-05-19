import Prizes from "@/features/prizes/pages/Prizes";
import PrizeDetail from "@/features/prizes/pages/PrizeDetail";

export type RouteKey = "prize" | "prizeDetail";

export interface RouteConfig {
  key: RouteKey;
  component: React.FC;
}

export const ROUTES: Record<RouteKey, RouteConfig> = {
  prize: {
    key: "prize",
    component: Prizes,
  },
  prizeDetail: {
    key: "prizeDetail",
    component: PrizeDetail,
  },
};
