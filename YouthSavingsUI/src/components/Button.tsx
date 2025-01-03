import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

type ButtonProps = {
  action?: string | ((e: any) => void);
  children: React.ReactNode;
  className?: string;
  size?: string;
};

const Button = ({
  action,
  children,
  className,
  size = "aspect-[15/7] ~w-12/28",
}: ButtonProps) => {
  // Combine classes
  const combinedClasses = `button ${size} ${className || ""}`.trim();

  if (typeof action === "string") {
    return (
      <li className={combinedClasses}>
        <NavLink
          to={action}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </NavLink>
      </li>
    );
  }

  return (
    <li className={combinedClasses}>
      <button
        onClick={action}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </button>
    </li>
  );
};

export default Button;
