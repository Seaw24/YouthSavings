import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { SuccessResponse } from "../../types/Controller";
import { Signal } from "@preact/signals-react";
import useAxiosPrivate from "../../hook/usePrivateAxious";
import { income, fundamental, niceToHave } from "../../App";
const MagicLinkHandling = ({ newUser }: { newUser: Signal<boolean> }) => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const magicToken = queryParams.get("magicToken");
  console.log("rerender");
  useEffect(() => {
    const login = async () => {
      try {
        const res = await axios.post("/auth/login", { magicToken: magicToken });
        if (res.status === 201) {
          newUser.value = true;
        }
        const data = res.data as SuccessResponse["data"];
        const accessToken = data.accessToken;
        const name = data.name;
        const email = data.email;
        setAuth({ name, email, accessToken: accessToken });
        if (!newUser.value) {
          await fetchingFixedData();
        }
        navigate("/savings");
      } catch (e: any) {
        console.error(e);
        navigate("/login");
      }
    };
    const fetchingFixedData = async () => {
      await axiosPrivate
        .get("/fixeddata")
        .then((res) => {
          const data = res.data as any;
          income.value = data.income;
          fundamental.value = data.fundamental;
          niceToHave.value = data.niceToHave;
          console.log("Fixed data fetched");
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    };
    login();
  }, []);

  return <div></div>;
};

export default MagicLinkHandling;
