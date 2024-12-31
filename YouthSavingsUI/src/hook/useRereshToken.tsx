import useAuth from "./useAuth";
import axios from "axios";

const useRereshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await axios.post("/refresh");
    const accessToken = response?.data.accessToken;
    setAuth((pre) => {
      return { ...pre, accessToken: accessToken };
    });

    return accessToken;
  };
  return refreshToken;
};

export default useRereshToken;
