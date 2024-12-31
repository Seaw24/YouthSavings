import SavingCard from "./componentsSV/SavingCard";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { Signal, signal } from "@preact/signals-react";
import NewUserFixeddata from "./componentsSV/NewUserFixeddata";
const savingsCategories = [
  { title: "Emergency", icon: Wallet },
  { title: "Investing", icon: TrendingUp },
  { title: "Retirement", icon: PiggyBank },
];
const current = signal(0);
const total = signal(0);
const Savings = ({ newUser }: { newUser: Signal<boolean> }) => {
  return (
    <>
      <div className="flex absolute top-1/2 -translate-y-1/4 w-full justify-evenly">
        {savingsCategories.map((category, index) => (
          <SavingCard
            key={index}
            title={category.title}
            icon={category.icon}
            current={current}
            total={total}
          />
        ))}
      </div>
      {newUser.value && (
        <NewUserFixeddata handleClose={() => (newUser.value = false)} />
      )}
    </>
  );
};

export default Savings;
