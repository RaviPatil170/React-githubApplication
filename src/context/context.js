import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

//provider and consumer

const GithubProvider = function ({ children }) {
  const [githubUser, setGithubUser] = useState("");
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });

  //const [searchUser, setGithubSearchUser] = useState("");

  //checkrate
  const checkRequest = function () {
    try {
      const req = fetch("https://api.github.com/rate_limit")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data.rate.remaining);
          const rate = data.rate.remaining;
          // setRate(data.rate.remaining);
          setRate(rate);
          if (rate === 0) {
            toggleError(true, "you have exceeded no of request for this hour");
          }
          return data;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const SearchUserApi = async function (user) {
    toggleError();
    setIsLoading(true);
    const res = await axios(`${rootUrl}/users/${user}`).catch(function (e) {
      console.log(e);
    });
    console.log(`https://api.github.com/users/${user}`);
    console.log(res);

    if (res) {
      //setGithubSearchUser(user);
      setGithubUser(res.data);
      console.log(res.data);

      // reops
      //https://api.github.com/users/john-smilga/repos?per_page=100
      const { login, followers_url, repos_url } = res.data;
      await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(
        function (res) {
          console.log(res);
          setRepos(res.data);
        }
      );

      //followers
      //https://api.github.com/users/john-smilga/followers
      await axios(`${followers_url}?per_page=100`).then(function (res) {
        console.log(res);
        setFollowers(res.data);
      });
    } else {
      console.log("toggle error is triggereed");

      toggleError(true, "user does not exist on the git hub");
    }
    setIsLoading(false);
    checkRequest();
  };

  //error

  function toggleError(show = false, message = "") {
    setError({
      show,
      message,
    });
  }

  useEffect(function () {
    checkRequest();
    console.log("app loaded");
  }, []);

  //console.log(rate);
  return (
    <GithubContext.Provider
      value={{
        githubUser: githubUser,
        repos: repos,
        followers: followers,
        rate: rate,
        error: error,
        SearchUserApi,
        isLoading: isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext };
export { GithubProvider };
