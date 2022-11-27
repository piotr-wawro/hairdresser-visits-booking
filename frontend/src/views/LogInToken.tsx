import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks.js";
import { login } from "../redux/authSlice.js";

const LogInToken = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(login(token));
      navigate("/");
    }
  }, [token]);

  return <></>;
};

export default LogInToken;
