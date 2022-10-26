import React, { useState, useEffect } from "react";

// stylesheet
import { useQuery } from "@apollo/client";

// components
import Login from "../../components/Login/Login.js";
import CreateAccount from "../../components/CreateAccount/CreateAccount.js";

// user context
import auth from "../../utils/auth";
import { GET_GAME_CARDS } from "../../utils/queries";

function HomePage() {
  

  const { data } = useQuery(GET_GAME_CARDS,{
    nextFetchPolicy:"network-only",
  }); //async not functioning
  const [scores, setScore] = useState([]);
  const [gameTitle, setGameTitle] = useState("");
  useEffect(() => {
    if (data && data.gameCards) {
      const gameCards = data.gameCards;
      // console.log(data.gameCards);

      // Pick a game at random from the list
      // let randomGameIndex = Math.floor(Math.random() * gameCards.length);
      // let featuredGame = gameCards[randomGameIndex];
      let featuredGame = gameCards[0]; //until the system has more than one game
      if(featuredGame){
        setGameTitle(featuredGame.title);
        let out = [...featuredGame.scores]
          .sort((a, b) => a.score * -1 - b.score * -1)
          .slice(0, 5);
          setScore([...out]);
      }
    }
  }, [data]);

  return (
    <div className="homeViewContainer">
      {/* scoreboard component - currently just placeholder */}
      {/* conditionally renders <Login /> versus <CreateUser /> based on global context variable */}
      {auth.loggedIn() ? <Login /> : <CreateAccount />}
    </div>
  );
}
export default HomePage;
