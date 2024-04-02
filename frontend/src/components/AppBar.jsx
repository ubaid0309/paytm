const AppBar = () => {
  return (
    <div className="flex justify-between items-center p-2">
      <p className="text-xl">PayTM App</p>

      <div className="flex justify-center items-center gap-2">
        <p className="text-xl">Hello</p>
        <div className="bg-slate-400 text-white text-xl rounded-full px-2">
          U
        </div>
      </div>
    </div>
  );
};

export default AppBar;
