import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Outlet />
    </div>
  );
}
