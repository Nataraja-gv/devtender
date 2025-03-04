import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../utils/feature/connectionreducer";

const ConnectionsPage = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0) {
    return (
      <h1 className="text-[14px] font-extrabold text-center">
        No Connection Data
      </h1>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {connections?.map((connection) => (
        <div
          key={connection._id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 flex flex-col items-center text-center"
        >
          <img
            src={connection?.PhotoUrl}
            alt="connection"
            className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200"
          />
          <h1 className="text-lg font-semibold">
            {connection.firstName} {connection.lastName}
          </h1>
          <p className="text-gray-500 text-sm">
            {connection.gendor} | {connection?.phoneNumber}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            {connection.skills?.join(", ") || "No skills listed"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsPage;
