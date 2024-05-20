import React from "react";
import classNames from "classnames";

interface HeaderProps {
  className?: string;
}
export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={classNames("p-10 flex", "header", className)}>
      <h1 className="text-3xl font-bold underline text-red-600">
        This is my header
      </h1>
    </div>
  );
};

export default Header;
