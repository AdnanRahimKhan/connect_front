import "./home.css";
import Header from "../../components/navbar/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
export default function Home() {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}
