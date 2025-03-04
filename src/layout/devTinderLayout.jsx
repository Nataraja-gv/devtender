import React, { useEffect } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/feature/usereducer";

const DevTinderLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.data)
  
  const fetchUser = async () => {
    if(user){
      return
    }
    try {

      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res));
    } catch (error) {
      if(error.status===401){
        navigate("/login")
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
    <NavBar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
  );
};

export default DevTinderLayout;
