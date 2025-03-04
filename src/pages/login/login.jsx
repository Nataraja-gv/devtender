import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/feature/usereducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    const data = {
      email: userData.email,
      password: userData.password,
    };
    try {
      const res = await axios.post(BASE_URL + "/login", data, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
      navigate("/");
      enqueueSnackbar("Login successful!", { variant: "success" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleSignUp = async () => {
    if (
      !userData.email ||
      !userData.password ||
      !userData?.firstName ||
      !userData?.lastName
    ) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }
    try {
      const res = await axios.post(BASE_URL + "/signup", userData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
      navigate("/profile")
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="card card-side bg-base-800 shadow-xl w-[500px] flex flex-col justify-center p-5">
        <h1 className="text-base-700 font-extrabold text-2xl text-center mb-4">
          {isLoginMode ? "Login" : "Sign Up"}
        </h1>

        {!isLoginMode && (
          <>
            <div>
              <fieldset className="fieldset">
                <legend className="font-extrabold">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName|| ""}
                  className="input input-success w-full"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset mt-3 mb-4">
                <legend className="font-extrabold">Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName||""}
                  className="input input-success w-full"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </fieldset>
            </div>
          </>
        )}

        <div>
          <legend className="font-extrabold">Email</legend>
          <input
            type="email"
            name="email"
            className="input input-success w-full"
            placeholder="Email"
            value={userData.email||""}
            onChange={handleChange}
          />
        </div>

        <div>
          <legend className="font-extrabold mt-3">Password</legend>
          <input
            type="password"
            name="password"
            className="input input-success w-full"
            placeholder="Password"
            value={userData.password||""}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          {isLoginMode ? "New user?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-500 cursor-pointer"
          >
            {isLoginMode ? "Sign up" : "Login"}
          </span>
        </div>

        <button
          className="btn btn-success mt-4"
          onClick={isLoginMode ? handleSubmit : handleSignUp}
          disabled={loading}
        >
          {loading ? "Processing..." : isLoginMode ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
