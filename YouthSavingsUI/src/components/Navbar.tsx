import favicon from "../image/favicon.jpg";
import { NavLink } from "react-router-dom";
import { Settings, User } from "lucide-react"; // Example icon package
import Button from "./Button";
import useAuth from "../hook/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <div className="  flex items-center justify-between ~h-16/24 border-b  border-gray-700 border-transparent ~pr-2/10 pl-2 bg-[hsl(197,100%,4.5%)]">
      {/* Left Section: Logo and Title */}
      <div className="flex items-center ">
        <NavLink
          to="/"
          title="Home"
          className="flex items-center hover:brightness-125 ~gap-0/2"
        >
          <img
            src={favicon}
            alt="logo"
            className="~w-10/28 rounded-full drop-shadow-lg "
          />
          <h1 className="text-gray-200 font-extrabold ~text-sm/2xl">
            YouthSavings
          </h1>
        </NavLink>
      </div>
      <div className="flex items-center justify-around ~gap-3/11 ">
        <NavLink
          to="/savings"
          className={
            "text-gray-400 font-bold ~text-xs/lg  hover:brightness-125"
          }
        >
          Market
        </NavLink>
        <NavLink
          to="/history"
          className={"text-gray-400 font-bold ~text-xs/lg hover:brightness-125"}
        >
          History
        </NavLink>
        <NavLink
          to="/savings"
          className={
            "text-gray-400 font-bold ~text-xs/lg  hover:brightness-125"
          }
        >
          Savings
        </NavLink>
        {!auth.name && (
          <Button
            action={"/login"}
            className={
              "bg-golden-gradient text-black rounded-lg hover:brightness-125"
            }
          >
            Login
          </Button>
        )}
        {auth.name && (
          <>
            <NavLink to="/profile">
              <User size={32} className="text-gray-200 hover:text-gray-400" />
            </NavLink>
            <NavLink to="/settings">
              <Settings
                size={32}
                className="text-gray-200 hover:text-gray-400"
              />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
