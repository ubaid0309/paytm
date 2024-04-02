import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2">
      <div className="flex justify-center items-center gap-1">
        <p className="bg-slate-400 text-white text-lg rounded-full px-2">
          {user.username[0].toUpperCase()}
        </p>
        <p>{user.firsName + user.lastName}</p>
      </div>

      <Link
        to={`/send/${user._id}?name=${user.firsName}`}
        className="bg-gray-900 cursor-pointer w-fit text-center text-white font-medium text-xl rounded-md py-1 p-2 mt-4"
      >
        Send Money
      </Link>
    </div>
  );
};

export default UserCard;
