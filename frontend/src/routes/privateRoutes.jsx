import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  // Nếu là admin
  if (user.admin === true) {
    return children;
  }

  // Không phải admin thì chặn
  return <Navigate to="/" />;
}

export default PrivateRoute;
