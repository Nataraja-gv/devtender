import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { enqueueSnackbar } from "notistack";
import { removeUser } from "../utils/feature/usereducer";

const NavBar = () => {
  const user = useSelector((store) => store?.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
      enqueueSnackbar("logout successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-extrabold">
          DevTinderUI
        </Link>
      </div>
      <div className="flex-none">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center">
              <h2 className=" font-bold capitalize">
                Welcome ,{user?.firstName}
              </h2>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.PhotoUrl}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
