import { Route } from "react-router-dom";
import { MainLayout, PrivateLayout } from "./barrel/indexLayout";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import {
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import {
  HomePage,
  Login,
  Savings,
  History,
  Emergency,
  MagicLinkHandling,
} from "./barrel/IndexPages";
import { signal, computed } from "@preact/signals";

//plan
export const planMonth = signal(12);
export const income = signal(1200);
export const fundamental = signal(income.value / 2);
export const niceToHave = signal(income.value / 5);
export const totalCost = computed(() => fundamental.value + niceToHave.value);
export const plannedSaving = computed(
  () => fundamental.value * planMonth.value
);

//spending
export const wasteSpending = signal(0);
export const fundamentalSpending = signal(200);
export const niceToHaveSpending = signal(100);
export const totalSpending = computed(
  () =>
    fundamentalSpending.value + niceToHaveSpending.value + wasteSpending.value
);

//saving
export const totalSaving = signal(1000);

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/magicLinkHandling" element={<MagicLinkHandling />} />
      <Route path="/login" element={<Login />} />
      //private
      <Route element={<PrivateLayout />}>
        <Route path="/savings" element={<Savings />} />
        <Route
          path="/savings/emergency"
          element={
            <Emergency
              fundamental={fundamental}
              niceToHave={niceToHave}
              income={income}
              totalSaving={totalSaving}
            />
          }
        />
        <Route
          path="/history"
          element={
            <History
              totalCost={totalCost}
              niceToHaveSpending={niceToHaveSpending}
              fundamentalSpending={fundamentalSpending}
              wasteSpending={wasteSpending}
              niceToHave={niceToHave}
              fundamental={fundamental}
              totalSpending={totalSpending}
            />
          }
        />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
