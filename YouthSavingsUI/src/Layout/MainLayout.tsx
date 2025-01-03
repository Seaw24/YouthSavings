import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#001219] relative ">
      <StarsBackground className="absolute inset-0 pointer-events-none" />
      <ShootingStars className="absolute inset-0 pointer-events-none" />

      <div className="flex flex-col relative min-h-screen">
        <NavBar />
        <main className="flex flex-col flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
