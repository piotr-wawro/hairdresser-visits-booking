import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks.js";
import { login } from "../redux/authSlice.js";
import { hvbApi } from "../api/index.js";

const LogInToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("t");

    if (token) {
      dispatch(login(token));
      dispatch(hvbApi.util.resetApiState());
      navigate("/");
    }
  }, []);

  return <></>;
};

export default LogInToken;
