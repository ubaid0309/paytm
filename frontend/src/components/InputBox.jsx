/* eslint-disable react/prop-types */
const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 outline-none border rounded-md"
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
