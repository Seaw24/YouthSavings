import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";

function MainLayout() {
  const location = useLocation();
  const isHistory = location.pathname === "/history";

  return (
    <div className="min-h-screen flex flex-col bg-[#001219] relative">
      <StarsBackground className="absolute inset-0 pointer-events-none" />
      <ShootingStars className="absolute inset-0 pointer-events-none" />

      <div className="flex flex-col min-h-screen">
        <Navbar history={isHistory} />
        <main className="flex flex-col flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
