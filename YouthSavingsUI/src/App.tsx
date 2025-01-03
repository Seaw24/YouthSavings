import { Route } from "react-router-dom";
import {
  MainLayout,
  PrivateLayout,
  PersistentLogin,
} from "./barrel/indexLayout";
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
  UserSetting,
} from "./barrel/IndexPages";
import { signal, computed } from "@preact/signals";
//user
export const newUser = signal(false);
//plan
export const plannedMonth = signal(6);
export const income = signal(0);
export const fundamental = signal(0);
export const niceToHave = signal(0);
export const totalCost = computed(() => fundamental.value + niceToHave.value);
export const plannedSaving = computed(
  () => fundamental.value * plannedMonth.value
);

//saving
export const totalSaving = signal(0);

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="/magicLinkHandling"
        element={<MagicLinkHandling newUser={newUser} />}
      />
      <Route path="/login" element={<Login />} />
      //private
      <Route element={<PersistentLogin />}>
        <Route element={<PrivateLayout />}>
          <Route path="/savings" element={<Savings newUser={newUser} />} />
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
                niceToHave={niceToHave}
                fundamental={fundamental}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <UserSetting
                income={income}
                niceToHave={niceToHave}
                fundamental={fundamental}
              />
            }
          />
        </Route>
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
