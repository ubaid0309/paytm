/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <p>{label}</p>

      <Link className="cursor-pointer underline" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
