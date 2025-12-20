import Overview from "../../components/Overview/Overview";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Overview />
    </div>
  );
}
