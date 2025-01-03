import "../../index.css";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import axios from "axios";
import { signal } from "@preact/signals";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconBrandTiktok,
} from "@tabler/icons-react";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";

let email = signal("");

const Login = () => {
  function requestMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post("/magicLink", { email: email.value }).then((res) => {});
  }
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[40%] ">
      <BackgroundGradient>
        <form
          className=" flex flex-col  card ~w-64/96 aspect-[8/11] bg-opacity-95  
 justify-around px-6 pt-6 items-center"
          onSubmit={requestMagicLink}
        >
          <h1 className="text-3xl font-bold brightness-110 text-shadow-lg  ">
            LOGIN
          </h1>
          <div className="h-2/3 flex flex-col justify-around">
            <div className=" w-full flex flex-col gap-2 ">
              <Label
                htmlFor="email"
                className="block  font-bold opacity-90 brightness-95 "
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                onInput={(e) => (email.value = e.currentTarget.value)}
                placeholder="Yuamikami@vx.com"
                required
                className=" round-md p-2 w-full bg-primary  aspect-[7/1] text-black ~text-xs/base"
              />

              <button
                type="submit"
                className="w-full bg-highlight text-black font-bold aspect-[9/1] rounded-md 
              transition-all duration-150 ease-in-out
              hover:bg-opacity-90
              active:bg-opacity-100 active:scale-95 active:shadow-inner"
              >
                send
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Label className="font-bold mb-2 ">Or with account:</Label>
              <div className="flex flex-row flex-wrap gap-3  w-full ">
                <IconAndLabel icon={IconBrandFacebook} label=" Facebook" />
                <IconAndLabel icon={IconBrandGoogle} label=" Google" />
                <IconAndLabel icon={IconBrandOnlyfans} label=" OnlyFans" />
                <IconAndLabel icon={IconBrandTiktok} label="TikTok" />
              </div>
            </div>
          </div>
        </form>
      </BackgroundGradient>
    </div>
  );
};

const IconAndLabel = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <button
      className=" flex items-center
     bg-stone-100 aspect-[4/1] rounded-md ~w-24/40 text-gray-700 ~text-sm/base"
    >
      <div className="flex ">
        <Icon className="~mx-1/3 ~size-5/6" />{" "}
        {/* Add margin to the right for spacing */}
        {label}
      </div>
    </button>
  );
};

export default Login;
