import favicon from "../image/favicon.jpg";
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

type NavbarProps = {
  history?: boolean;
};

const Navbar = ({ history }: NavbarProps) => {
  return (
    <div className="flex border-opacity-40 h-[clamp(5rem,11vw,10rem)] items-center ~mx-2/6 justify-between">
      <div className="flex items-center translate-y-[15%] ">
        <figure>
          <NavLink to="/" title="Home">
            <img
              src={favicon}
              alt="logo"
              width="500"
              height="500"
              className="w-[clamp(4.2rem,9vw,8rem)] drop-shadow-[0_0_10px_hsl(46,84%,70%)] hover:brightness-125 "
            />
          </NavLink>
        </figure>

        <figcaption className="~text-xs/3xl font-bold  text-shadow-lg text-gray-200 whitespace-nowrap  font-Arial">
          {history ? "Emergency" : "Youth Savings"}
        </figcaption>
      </div>
      <nav className="w-fit">
        <ul className="flex ~gap-4/12 h-full translate-y-1/2">
          <Button action="/history">History</Button>
          <Button action="/savings">Savings</Button>
          <Button action="/login">Login</Button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
