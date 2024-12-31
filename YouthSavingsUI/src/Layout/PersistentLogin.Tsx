import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefresToken from "../hook/useRereshToken";
import useAuth from "../hook/useAuth";
const PersistentLogin = () => {
  const refreshToken = useRefresToken();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <h1 className="text-2xl text-white">Loading...</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
