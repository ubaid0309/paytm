/* eslint-disable react/prop-types */
const Button = ({ label }) => {
  return (
    <button className="bg-gray-900 w-full text-center text-white font-medium text-xl rounded-md py-1 mt-4">
      {label}
    </button>
  );
};

export default Button;
