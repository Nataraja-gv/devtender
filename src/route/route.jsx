import { BrowserRouter, Routes, Route } from "react-router";
import DevTinderLayout from "../layout/devTinderLayout";
import LoginPage from "../pages/login/login";
import Profile from "../pages/Profile/Profile";
import FeedPage from "../pages/home/home";
import ConnectionsPage from "../pages/connections/Connections";
import RequestsPage from "../pages/requests/requests";

export default function RoutePage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevTinderLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/requests" element={<RequestsPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
