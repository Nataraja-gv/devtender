/* eslint-disable no-unused-vars */
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../../utils/feature/feedreducer";
import FeedCard from "../../components/feedCard";

const FeedPage = () => {
  const feedData = useSelector((store) => store.feed);
  const [page, setPage] = useState(1); // Initial page set to 0
  const [limit, setLimit] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${page}&limit=${limit}`, {
        withCredentials: true,
      });

      if (res.data.length > 0) {
        dispatch(addFeed(res.data));
        setPage((prev) => prev + 1); // Increment page after successful fetch
      } else {
        setHasMore(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    setLoading(false);
  };

  const requestingConnections = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));

      // If feed length becomes 0, fetch next page
      if (feedData.length === 1) {
        fetchFeed();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div>
      {feedData?.length > 0 ? (
        <FeedCard
          feedData={feedData[0]}
          requestingConnections={requestingConnections}
        />
      ) : (
        hasMore && <p>Loading more feeds...</p>
      )}
    </div>
  );
};

export default FeedPage;
