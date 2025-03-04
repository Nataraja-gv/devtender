import React from "react";

const FeedCard = ({ feedData = {}, requestingConnections }) => {
  const { _id,firstName, lastName, phoneNumber, skills, PhotoUrl, gendor, age } =
    feedData;

  if (!feedData || Object.keys(feedData).length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center my-8">
      <div className="bg-white w-96 shadow-xl rounded-2xl overflow-hidden border">
        <figure className="w-full h-[300px] overflow-hidden">
          <img
            src={PhotoUrl}
            alt="User"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="p-5">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-600">
            {gendor}, {age} years old
          </p>
          <p className="text-gray-700 font-medium mt-2">Skills: {skills}</p>
          {requestingConnections && (
            <div className="flex   mt-4 space-x-3 justify-center">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={()=>{requestingConnections("ignored",_id)}}>
                Ignore
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={()=>{requestingConnections("interested",_id)}}>
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
