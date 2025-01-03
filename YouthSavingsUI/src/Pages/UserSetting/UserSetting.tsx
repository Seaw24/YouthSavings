"use client";

import { Edit2, Check } from "lucide-react";
import useAuth from "../../hook/useAuth";
import favicon from "../../image/favicon.jpg";
import ProcessBar from "../../components/ProcessBar";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import useAxiosPrivate from "../../hook/usePrivateAxious";
import { useNavigate } from "react-router-dom";
import { plannedSaving } from "../../App";
import { totalSaving } from "../../App";
import { signal, Signal } from "@preact/signals-react";
import { FixedDataType } from "../../types/FixedDataType";

const editingField = signal("");

const UserSetting = ({ income, niceToHave, fundamental }: FixedDataType) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.get("/logout");
      navigate("/");
      setAuth({ name: null, email: null, accessToken: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFixedData = async () => {
    try {
      editingField.value = "";
      await axiosPrivate.patch("/fixeddata", {
        income: income.value,
        fundamental: fundamental.value,
        niceToHave: niceToHave.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editableField = (
    label: string,
    field: string,
    signal: Signal<number>
  ) => {
    const isEditing = field === editingField.value;
    return (
      <div className="mb-4 flex w-full text-gray-300 gap-2 items-center transition-all duration-300 ease-in-out hover:bg-white/10 rounded-lg text-xl font-bold  p-2">
        <div className="flex w-11/12 justify-between items-center mx-auto">
          <div className="flex items-center gap-2">
            <Label>{label}:</Label>
          </div>
          {isEditing ? (
            <div className="flex items-center justify-end gap-2">
              <Input
                name={field}
                value={signal.value}
                onInput={(e) =>
                  (signal.value = Number((e.target as HTMLInputElement).value))
                }
                className="bg-white/20 border-0 rounded-md text-white"
                type="number"
              />
              <Button
                className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300"
                size={"size-7"}
                action={updateFixedData}
              >
                <Check size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-white rounded-xl overflow-hidden overflow-ellipsis">
                ${signal.value.toFixed(2)}
              </p>
              <Button
                className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300 ml-2"
                size={"size-7"}
                action={() => (editingField.value = field)}
              >
                <Edit2 size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/3 mx-auto my-auto  aspect-video">
      <div className="flex flex-col h-full justify-evenly">
        <div className="flex items-center relative justify-between pr-4">
          <div className="flex items-center gap-6">
            <img
              src={favicon}
              alt="logo"
              className="~w-16/28 rounded-full drop-shadow-lg"
            />
            <h1 className=" h-32 grid items-center ~text-2xl/5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
              {auth.name}
            </h1>
          </div>
          <Button action={logout}>Logout</Button>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-[0.05rem] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
        </div>
        <div className="w-1/2 mx-auto mt-5 mb-12">
          <div className="text-gray-300 font-bold text-shadow-lg text-center ~m-1/3 flex items-center justify-center  ~text-lg/2xl">
            {totalSaving.value}
            <span className="font-bold text-highlight">
              /{plannedSaving.value}
            </span>
          </div>
          <ProcessBar className="aspect-18/1" />
        </div>
        <div className=" flex gap-4 flex-col w-full ">
          {editableField("Income", "income", income)}
          {editableField("Fundamental Budget", "fundamental", fundamental)}
          {editableField("Nice to Have Budget", "niceToHave", niceToHave)}
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
