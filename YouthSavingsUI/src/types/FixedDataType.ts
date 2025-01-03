import { Signal } from "@preact/signals-react";
export type FixedDataType = {
  fundamental: Signal<number>;
  niceToHave: Signal<number>;
  income: Signal<number>;
  totalSaving?: Signal<number>;
};
