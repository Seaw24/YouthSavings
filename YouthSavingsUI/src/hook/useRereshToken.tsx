import useAuth from "./useAuth";
import axios from "axios";
import { ControllerResponse, SuccessResponse } from "../types/Controller";

const useRereshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await axios.post("/refresh");
    const accessToken = response?.data.accessToken;
    console.log(accessToken);
    setAuth((pre) => {
      return { ...pre, accessToken: accessToken };
    });

    return accessToken;
  };
  return refreshToken;
};

export default useRereshToken;
