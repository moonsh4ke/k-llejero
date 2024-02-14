import { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomLoading from "../shared/components/CustomLoading";

export default function AuthMiddleware({ children }) {
  const [unauthorized, setUnauthorized] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext)!;
  useEffect(() => {
    axiosClient
      .get("https://kllejero.dev/api/auth/currentUser")
      .then((res) => {
        const { currentUser } = res.data;
        if (currentUser === null) {
          setUnauthorized(true);
          navigate("/login")
          return
        }
        setUnauthorized(false);
      })
      // if iat is expired, then a 401 res status should be expected
      .catch((err) => {
        setUnauthorized(true);
        logout();
        navigate("/login")
      });
  }, []);

  return !unauthorized && <div>{children}</div>
}
