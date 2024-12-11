import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { SuccessResponse } from "../../types/Controller";

const MagicLinkHandling = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const magicToken = queryParams.get("magicToken");

  useEffect(() => {
    axios
      .post("/auth/login", { magicToken: magicToken })
      .then((res) => {
        const data = res.data as SuccessResponse["data"];
        const accessToken = data.accessToken;
        const name = data.name;
        const email = data.email;
        setAuth({ name, email, accessToken: accessToken });
        navigate("/savings");
      })
      .catch((e) => {
        console.error(e);
        navigate("/login");
      });
  });

  return <div></div>;
};

export default MagicLinkHandling;
