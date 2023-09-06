/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold hover:underline">
        {props.heading}
      </Link>
    </div>
  );
};

export default Header;
