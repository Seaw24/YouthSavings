import useAuth from "../../hook/useAuth";
import HomePageGreeting from "./componentsHP/HomePageGreeting";
import HomePageLogin from "./componentsHP/HomePageLogin";

const HomePage = () => {
  const { auth } = useAuth();

  return auth?.name ? <HomePageLogin /> : <HomePageGreeting />;
};

export default HomePage;
