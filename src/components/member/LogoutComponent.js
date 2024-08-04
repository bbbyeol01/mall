import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";

const LogoutComponent = () => {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl  m-4 p-4 font-extrabold">Logout Component</div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              onClick={handleClickLogout}
              className="rounded w-36 bg-red-500 p-4 text-xl  text-white"
            >
              LOG-OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;
