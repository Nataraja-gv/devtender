import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { addRequest, removeRequest } from "../../utils/feature/requestReducer";

const RequestsPage = () => {
  const requestuser = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        error ||
        "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const accectRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id))
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

   

  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-full max-w-md flex flex-col gap-6">
        {requestuser?.length > 0 ? (
          requestuser.map((connection) => (
            <div
              key={connection?.fromUserId?._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 flex flex-col items-center text-center mx-auto"
            >
              <img
                src={connection?.fromUserId?.PhotoUrl}
                alt="connection"
                className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-gray-200"
              />
              <h1 className="text-lg font-semibold">
                {connection?.fromUserId?.firstName}{" "}
                {connection?.fromUserId?.lastName}
              </h1>
              <p className="text-gray-500 text-sm">
                {connection?.fromUserId?.gender} |{" "}
                {connection?.fromUserId?.phoneNumber}
              </p>
              <p className="text-gray-600 text-sm">
                {connection?.fromUserId?.skills?.join(", ") ||
                  "No skills listed"}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => accectRequest("rejected", connection._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => accectRequest("accepted", connection._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No requests found</div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
