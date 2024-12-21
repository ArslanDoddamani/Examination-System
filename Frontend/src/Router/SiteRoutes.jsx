import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";
import Login from "../components/Login/Login";
import SemesterDetails from "../components/SemesterDetails/SemesterDetails";
import Result from "../components/Result/Result";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import Registration from "../components/SubjectRegistration/Registration";
import ProtectedRoute from "./ProtectedRoute";
import { isLoggedIn } from "../auth/loggedIn";
import StudentLayout from "../layouts/StudentLayout";

const SiteRoutes = () => {
  const userType = window.localStorage.getItem("userType");
  return (
    <>
      <Routes>
        {/* unauthorized route */}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </>
        )}

        {/* ProtectedRoutes  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Navigate to="/" />} />
          {userType === "student" ? (
            <>
              <Route path="/student" element={<StudentLayout/>}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/semester-details" element={<SemesterDetails />} />
                <Route path="/result" element={<Result />} />
                <Route path="/payment-history" element={<PaymentHistory />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration/:type" element={<Registration />} />
              </Route>
            </>
          ) : userType === "admin" ? (
              <>
                <Route path="/admin">
                  <Route path="" element={<NotFound />} />
                  <Route path="/subject" element={<NotFound />} />
                </Route>
              </>
          ) : (
            <>
              <Route path="/faculty">
                <Route path="" element={<NotFound />} />
              </Route>
            </>
          )}
        </Route>

        <Route path="/logout" element={<Navigate to='/' />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default SiteRoutes;
