/** @format */

import React from "react";

const Header = (props) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{props.heading}</h2>
    </div>
  );
};

export default Header;
