import { useRef, useEffect, useState } from "react";
import ProcessBar from "../../components/ProcessBar";
import Toolbar from "./components/Toolbar";
import Button from "../../components/Button";
import Transaction from "./components/Transaction";
import { FcNext, FcPrevious } from "react-icons/fc";
import { signal } from "@preact/signals-react";
import useAxiosPrivate from "../../hook/usePrivateAxious";
import { UpdattingDataType } from "../../types/UpdattingDataType";
import { format } from "date-fns";

type historyProps = {
  totalCost: { value: number };
  fundamental: { value: number };
  niceToHave: { value: number };
};

// Signals
const currentMonth = new Date().getMonth() + 1;
const payments = signal<UpdattingDataType[]>([]);
const activeMode = signal("All");
const fundamentalSpending = signal(0);
const niceToHaveSpending = signal(0);
const wasteSpending = signal(0);
const totalSpending = signal(0);
const total = signal(0);
const current = signal(0);
const selectedMonth = signal(currentMonth); // default to current month

const History = ({ totalCost, fundamental, niceToHave }: historyProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  // Axios instance
  const axiosPrivate = useAxiosPrivate();
  //query data
  const query = new URLSearchParams(window.location.search);
  query.set("month", selectedMonth.value.toString());

  // Fetch and process data
  useEffect(() => {
    axiosPrivate
      .get(`/updatingdata?${query.toString()}`)
      .then((res) => {
        payments.value = res.data;
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [axiosPrivate, selectedMonth.value]);

  // manipulate datas ( take out from useEffect to refresh when details are updated)
  const { fundamentalTotal, niceToHaveTotal, wasteTotal } =
    payments.value.reduce(
      (totals, payment) => {
        payment.date = format(new Date(payment.date), "MM/dd/yyyy");
        if (payment.type === "fundamental") {
          payment.color = "text-golden-gradient";

          totals.fundamentalTotal += payment.amount;
        } else if (payment.type === "nice-to-have") {
          // Add an additional value to the payment directly
          payment.color = "text-[hsl(244,52%,50%)]";
          totals.niceToHaveTotal += payment.amount;
        } else if (payment.type === "waste") {
          payment.color = "text-red-600";
          totals.wasteTotal += payment.amount;
        } else {
          payment.color = "text-green-500";
        }
        return totals;
      },
      { fundamentalTotal: 0, niceToHaveTotal: 0, wasteTotal: 0 }
    );

  // Update signals
  fundamentalSpending.value = fundamentalTotal;
  niceToHaveSpending.value = niceToHaveTotal;
  wasteSpending.value = wasteTotal;
  totalSpending.value = fundamentalTotal + niceToHaveTotal + wasteTotal;

  // Sticky button logic
  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0 && rect.bottom > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine totals based on active mode

  if (activeMode.value === "All") {
    total.value = totalCost.value;
    current.value = totalSpending.value;
  } else if (activeMode.value === "Fundamental") {
    total.value = fundamental.value;
    current.value = fundamentalSpending.value;
  } else if (activeMode.value === "Nice to have") {
    total.value = niceToHave.value;
    current.value = niceToHaveSpending.value;
  } else {
    total.value = wasteSpending.value;
    current.value = wasteSpending.value;
  }

  return (
    <div className="flex flex-col items-center mt-[4.25rem] flex-grow justify-around">
      <Toolbar activeMode={activeMode} />

      <div className="flex-col w-2/3 ~my-8/12 border-golden-light">
        <div className="text-gray-300 font-bold text-shadow-lg text-center ~m-2/5 flex items-center justify-center  ~text-xl/3xl">
          {current.value}
          <span className="font-bold text-highlight"> /{total.value} </span>
        </div>

        <ProcessBar
          className="aspect-28/1"
          funda={fundamentalSpending}
          nice={niceToHaveSpending}
          waste={wasteSpending}
          total={total}
          activeMode={activeMode.value}
          history={true}
        />
      </div>

      <div className="relative w-full grid place-items-center">
        <Button
          action={() => {
            if (selectedMonth.value > 1) {
              selectedMonth.value--;
            } else {
              selectedMonth.value = currentMonth;
            }
          }}
          size="~size-6/12"
          className={`${
            isSticky
              ? "fixed right-[4%] top-1/2 transform -translate-y-1/2"
              : "absolute right-[4%] ~top-6/24"
          } transition-all duration-1000 ease-in-out`}
        >
          <FcNext />
        </Button>

        <Button
          action={() => {
            if (selectedMonth.value < currentMonth) {
              selectedMonth.value++;
            } else {
              selectedMonth.value = 1;
            }
          }}
          size="~size-6/12"
          className={`${
            isSticky
              ? "fixed left-[4%] top-1/2 transform -translate-y-1/2"
              : "absolute left-[4%] ~top-6/24"
          } transition-all duration-1000 ease-in-out`}
        >
          <FcPrevious />
        </Button>

        <div className="relative w-5/6 ~my-0/16" ref={gridRef}>
          <Transaction payments={payments} month={selectedMonth.value} />
        </div>
      </div>
    </div>
  );
};

export default History;
