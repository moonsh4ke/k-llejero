import { TenderState } from "./types/types";

const tenderStates: Record<TenderState, string> = {
  5: "Publicada",
  6: "Cerrada",
  7: "Desierta",
  8: "Adjudicada",
  18: "Revocada",
  19: "Suspendida",
}

export { tenderStates };
