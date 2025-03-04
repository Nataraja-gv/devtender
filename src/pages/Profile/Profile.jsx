import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../../components/feedCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { enqueueSnackbar } from "notistack";
import { addUser } from "../../utils/feature/usereducer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store?.user?.data);
  const dispatch = useDispatch();
 const navigate=useNavigate()
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    PhotoUrl: "",
    gendor: "",
    skills: "",
    age: "",
  });

  // Update userData when Redux user data is available
  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        PhotoUrl: user.PhotoUrl || "",
        gendor: user.gendor || "",
        skills: user.skills || "",
        age: user.age || "",
      });
    }
  }, [user]); // Runs whenever `user` changes

  const updateProfileData = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      const { firstName, lastName, PhotoUrl, gendor, skills, age } = userData;

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gendor, skills, age,PhotoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      enqueueSnackbar("Profile update successful!", { variant: "success" });
      navigate("/")
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <div>
      {user && (
        <div className=" flex justify-center gap-5">
          {" "}
          <div className="shadow-xl p-4 rounded-lg flex justify-center">
            <div className="card card-side bg-red-400 shadow-xl w-[500px] flex flex-col justify-center p-[10px]">
              <h1 className="text-base-700 font-extrabold text-[24px] text-center mb-4">
                Profile Page
              </h1>

              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-extrabold">
                    First Name
                  </legend>
                  <input
                    type="text"
                    value={userData.firstName}
                    className="input input-success w-full"
                    placeholder="First Name"
                    onChange={(e) =>
                      updateProfileData("firstName", e.target.value)
                    }
                  />
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend font-extrabold">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    value={userData.lastName}
                    className="input input-success w-full"
                    placeholder="Last Name"
                    onChange={(e) =>
                      updateProfileData("lastName", e.target.value)
                    }
                  />
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend font-extrabold">
                    Photo URL
                  </legend>
                  <input
                    type="text"
                    value={userData.PhotoUrl}
                    className="input input-success w-full"
                    placeholder="Photo URL"
                    onChange={(e) =>
                      updateProfileData("PhotoUrl", e.target.value)
                    }
                  />
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend font-extrabold">
                    Age
                  </legend>
                  <input
                    type="number"
                    value={userData.age}
                    className="input input-success w-full"
                    placeholder="Age"
                    onChange={(e) => updateProfileData("age", e.target.value)}
                  />
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend font-extrabold">
                    Gender
                  </legend>
                  <select
                    className="select select-success w-full"
                    value={userData.gendor || ""}
                    onChange={(e) =>
                      updateProfileData("gendor", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </fieldset>
              </div>

              <div>
                <fieldset className="fieldset mt-3">
                  <legend className="fieldset-legend font-extrabold">
                    Skills
                  </legend>
                  <input
                    type="text"
                    value={userData.skills}
                    className="input input-success w-full"
                    placeholder="Skills"
                    onChange={(e) =>
                      updateProfileData("skills", e.target.value)
                    }
                  />
                </fieldset>
              </div>

              <div className="flex justify-center my-4">
                <button
                  className="btn btn-success w-[150px]"
                  onClick={updateProfileSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div>
            <FeedCard feedData={userData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
