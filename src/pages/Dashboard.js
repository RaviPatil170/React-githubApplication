import React  from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);
  console.log(isLoading);
  if (isLoading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search></Search>
        <img src={loadingImage} alt="loading data" className="loading-img"></img>
      </main>
    );
  }
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
